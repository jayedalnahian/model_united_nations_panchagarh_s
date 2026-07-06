import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { AuthController } from "./auth.controller.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { forgetPasswordSchema, loginUserSchema, registerUserSchema, resendOTPSchema, resetPasswordSchema, verifyEmailSchema } from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  // multerUpload.single("file"),
  validateRequest(registerUserSchema),
  AuthController.registerUser,
);
router.post(
  "/login",
  validateRequest(loginUserSchema),
  AuthController.loginUser,
);
router.post(
  "/logout",
  checkAuth(UserRole.USER, UserRole.ADMIN),
  AuthController.logoutUser,
);

router.post(
  "/refresh-token",
  AuthController.getNewToken
);

router.post(
  "/change-password",
  checkAuth(UserRole.USER, UserRole.ADMIN),
  AuthController.changePassword,
);

router.get(
  "/me",
  checkAuth(UserRole.USER, UserRole.ADMIN),
  AuthController.getMe,
);

router.post(
  "/verify-email",
  validateRequest(verifyEmailSchema),
  AuthController.verifyEmail,
);
router.post(
  "/resend-otp",
  validateRequest(resendOTPSchema),
  AuthController.resendVerificationOTP,
);
router.post(
  "/forget-password",
  validateRequest(forgetPasswordSchema),
  AuthController.forgetPassword,
);
router.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  AuthController.resetPassword,
);



export const AuthRouter = router;