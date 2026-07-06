import { UserStatus } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";

export const googleLoginHelpers = async (profile: any) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: profile.email,
    },
  });

  if (!existingUser) {
    throw new Error(
      "No account exists with this email. Please contact an administrator."
    );
  }

  if (existingUser.status !== UserStatus.ACTIVE) {
    throw new Error("Your account is not active.");
  }

  if (existingUser.isDeleted) {
    throw new Error("Your account has been deleted.");
  }

  return {
    id: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
    status: existingUser.status,
    emailVerified: true,
  };
};