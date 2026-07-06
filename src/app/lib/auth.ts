import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { UserRole, UserStatus } from "../generated/prisma/client.js";

import { bearer, emailOTP } from "better-auth/plugins";
import { googleLoginHelpers } from "../healpers/googleLoginHelpers.js";
import { envVars } from "../config/env.js";
import { sendEmail } from "../utils/email.js";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      mapProfileToUser: async (profile: any) => {
        return await googleLoginHelpers(profile);
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
  user: {
    additionalFields: {
      profilePhoto: {
        type: "string",
        required: false,
      },
      contactNumber: {
        type: "string",
        required: false,
      },
      address: {
        type: "string",
        required: false,
      },
      institution: {
        type: "string",
        required: true,
      },
      committeeId: {
        type: "string",
        required: false,
      },
      agendaTopic: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: true,
        defaultValue: UserRole.USER,
        input: false, // Prevent clients from setting their own role
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE,
        input: false,
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false,
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false,
      },
      deletedAt: {
        type: "date",
        required: false,
        input: false,
      },
    },
  },
  plugins: [
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }: {email: string, otp : string, type: string}) {
        console.log(`[auth.ts] Starting ${type} for email: ${email}`);

        // Retry logic to handle race conditions where the user might not be immediately visible
        let user = null;
        for (let i = 0; i < 3; i++) {
          user = await prisma.user.findUnique({
            where: { email },
          });
          if (user) break;
          console.log(
            `[auth.ts] User not found, retrying lookup (${i + 1}/3)...`,
          );
          await new Promise((resolve) => setTimeout(resolve, 500)); // wait 500ms
        }

        if (type === "email-verification") {
          if (!user) {
            console.error(
              `[auth.ts] User with email ${email} not found after retries. Cannot send verification OTP.`,
            );
            return;
          }

          if (user.role === UserRole.ADMIN) {
            console.log(
              `[auth.ts] User ${email} is a admin. Skipping sending verification OTP.`,
            );
            return;
          }

          if (!user.emailVerified) {
            console.log(`[auth.ts] Sending verification email to ${email}...`);
            try {
              console.log(
                `[auth.ts] Attempting to send email via nodemailer to: ${email}`,
              );
              await sendEmail({
                to: email,
                subject: "Verify your email",
                templateName: "otp",
                templateData: {
                  name: user.name,
                  otp,
                },
              });
              console.log(
                `[auth.ts] Verification email sent SUCCESFULLY to ${email}`,
              );
            } catch (error: any) {
              console.error(
                `[auth.ts] FAILED to send verification email to ${email}:`,
                error.message,
              );
            }
          } else {
            console.log(
              `[auth.ts] User ${email} already verified. Skipping email.`,
            );
          }
        } else if (type === "forget-password") {
          if (user) {
            console.log(
              `[auth.ts] Sending forget-password email to ${email}...`,
            );
            try {
              await sendEmail({
                to: email,
                subject: "Password Reset OTP",
                templateName: "otp",
                templateData: {
                  name: user.name,
                  otp,
                },
              });
              console.log(`[auth.ts] Forget-password email sent to ${email}`);
            } catch (error: any) {
              console.error(
                `[auth.ts] Failed to send forget-password email to ${email}:`,
                error.message,
              );
            }
          } else {
            console.error(
              `[auth.ts] User with email ${email} not found for forget-password.`,
            );
          }
        }
      },
      expiresIn: 2 * 60, // 2 minutes in seconds
      otpLength: 6,
    }),
  ],
  session: {
    expiresIn: Number(envVars.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN),
    updateAge: Number(envVars.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE),
    cookieCache: {
      enabled: true,
      maxAge: Number(envVars.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE),
    },
  },

  trustedOrigins: [
    envVars.BETTER_AUTH_URL || "http://localhost:5050",
    envVars.FRONTEND_URL || "http://localhost:3000",
  ],

  advanced: {
    useSecureCookies: true,
    cookies: {
      state: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/",
        },
      },
      sessionToken: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/",
        },
      },
    },
  },
});
