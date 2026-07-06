import status from "http-status";
import AppError from "../../errorHalpers/AppError.js";
import { UserRole, UserStatus } from "../../generated/prisma/enums.js";
import { auth } from "../../lib/auth.js";
import { IAuth, IChangePasswordPayload } from "./auth.type.js";
import { prisma } from "../../lib/prisma.js";
import { IRequestUser } from "../../interface/requestUser.interface.js";

const registerUser = async (payload: IAuth, image?: string) => {
  const { name, email, password } = payload;

  const signUpBody: Record<string, string> = {
    name,
    email,
    password,
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    institution: "N/A",
  };
  if (image) signUpBody.image = image;

  const data = await auth.api.signUpEmail({
    body: signUpBody as any,
  });

  if (!data.user) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "User registration failed",
    );
  }
  return data;
};

const loginUser = async (payload: IAuth) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!data.user.emailVerified) {
    throw new AppError(status.UNAUTHORIZED, "Email not verified");
  }

  if (data.user.status === UserStatus.BANNED) {
    throw new AppError(status.FORBIDDEN, "User is blocked");
  }

  if (data.user.needPasswordChange) {
    throw new AppError(status.FORBIDDEN, "Please change your password");
  }

  if (data.user.isDeleted) {
    throw new AppError(status.NOT_FOUND, "User is softly deleted");
  }

  return data;
};

const logoutUser = async (sessionToken: string) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });

  return result;
};

const getMe = async (user: IRequestUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: user.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }
  return userData;
};

const verifyEmail = async (email: string, otp: string) => {
  const result = await auth.api.verifyEmailOTP({
    body: {
      email,
      otp,
    },
  });

  if (result.status && !result.user.emailVerified) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: true,
      },
    });
  }
};

const resendVerificationOTP = async (email: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (isUserExist.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email already verified");
  }

  await auth.api.sendVerificationEmail({
    body: {
      email,
    },
  });
};

const forgetPassword = async (email: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!isUserExist.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified");
  }

  if (isUserExist.isDeleted || isUserExist.status === UserStatus.BANNED) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  await auth.api.requestPasswordResetEmailOTP({
    body: {
      email,
    },
  });
};

const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string,
) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!isUserExist.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified");
  }

  if (isUserExist.isDeleted || isUserExist.status === UserStatus.BANNED) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  await auth.api.resetPasswordEmailOTP({
    body: {
      email,
      otp,
      password: newPassword,
    },
  });

  if (isUserExist.needPasswordChange) {
    await prisma.user.update({
      where: {
        id: isUserExist.id,
      },
      data: {
        needPasswordChange: false,
      },
    });
  }

  await prisma.session.deleteMany({
    where: {
      userId: isUserExist.id,
    },
  });
};

const changePassword = async (
  payload: IChangePasswordPayload,
  sessionToken: string,
) => {
  const session = await auth.api.getSession({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });

  if (!session) {
    throw new AppError(status.UNAUTHORIZED, "Invalid session token");
  }

  const { currentPassword, newPassword } = payload;

  const result = await auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    },
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });

  if (session.user.needPasswordChange) {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        needPasswordChange: false,
      },
    });
  }

  return result;
};

const refreshToken = async (sessionToken: string) => {
  if (!sessionToken) {
    throw new AppError(status.UNAUTHORIZED, "Invalid session token provided");
  }

  const isSessionTokenExists = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    include: {
      user: true,
    },
  });

  if (!isSessionTokenExists) {
    throw new AppError(status.UNAUTHORIZED, "Invalid session token");
  }

  const { token } = await prisma.session.update({
    where: {
      token: sessionToken,
    },
    data: {
      token: sessionToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1000), //15 days
      updatedAt: new Date(), //current time
    },
  });

  return {
    sessionToken: token,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  verifyEmail,
  resendVerificationOTP,
  forgetPassword,
  resetPassword,
  changePassword,
  refreshToken,
};
