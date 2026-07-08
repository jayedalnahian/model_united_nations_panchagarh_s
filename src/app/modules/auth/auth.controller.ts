import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { tokenUtils } from "../../utils/token.js";
import { AuthService } from "./auth.service.js";
import { Request, Response } from "express";
import { IRequestUser } from "../../interface/requestUser.interface.js";
import AppError from "../../errorHalpers/AppError.js";
import { cookieUtils } from "../../utils/cookie.js";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body)
  const result = await AuthService.registerUser(
    req.body,
  );
  const { token, ...rest } = result;

  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User registered successfully",
    data: {
      token,
      ...rest,
    },
    error: null,
  });
});


const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  const {token, ...rest } = result;


  tokenUtils.setBetterAuthSessionCookie(res, token);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      ...rest,
    },
    error: null,
  });
});



const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.logoutUser(betterAuthSessionToken);

  cookieUtils.clearCookie(res, "better-auth.session_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged out successfully",
    data: result,
    error: null,
  });
});



const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await AuthService.getMe(user as IRequestUser);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
    error: null,
  });
});



const getNewToken = catchAsync(async (req: Request, res: Response) => {

  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  if (!betterAuthSessionToken) {
    throw new AppError(status.UNAUTHORIZED, "Session token is missing");
  }
  const result = await AuthService.refreshToken(
    betterAuthSessionToken,
  );

  const { sessionToken } = result;


  tokenUtils.setBetterAuthSessionCookie(res, sessionToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      sessionToken,
    },
    error: null,
  });
});


const changePassword = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];

  const result = await AuthService.changePassword(
    payload,
    betterAuthSessionToken,
  );

  const {token } = result;

  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
    error: null,
  });
});


const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  await AuthService.verifyEmail(email, otp);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Email verified successfully",
    data: null,
    error: null,
  });
});


const resendVerificationOTP = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    await AuthService.resendVerificationOTP(email);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Verification OTP resent to email successfully",
      data: null,
      error: null,
    });
  },
);



const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  await AuthService.forgetPassword(email);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password reset OTP sent to email successfully",
    data: null,
    error: null,
  });
});



const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  await AuthService.resetPassword(email, otp, newPassword);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password reset successfully",
    data: null,
    error: null,
  });
});




export const AuthController = {
  registerUser,
  loginUser,
  getMe,
  getNewToken,
  changePassword,
  logoutUser,
  verifyEmail,
  forgetPassword,
  resetPassword,
  resendVerificationOTP,
};