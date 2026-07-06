import z from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const verifyEmailSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z.string().min(6, "Code must be at least 6 characters long"),
});

export const resendOTPSchema = z.object({
  email: z.email("Invalid email address"),
});

export const forgetPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  email: z.email("Invalid email address"),
  otp: z.string().min(6, "Code must be at least 6 characters long"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});


