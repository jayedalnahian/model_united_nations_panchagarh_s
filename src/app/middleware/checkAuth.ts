import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { UserStatus } from "../generated/prisma/client.js";
import type { UserRole } from "../generated/prisma/client.js";
import AppError from "../errorHalpers/AppError.js";
import { prisma } from "../lib/prisma.js";
import { cookieUtils } from "../utils/cookie.js";

export const checkAuth =
  (...allowedRoles: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionToken = cookieUtils.getCookie(
        req,
        "better-auth.session_token"
      );

      if (!sessionToken) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access! No session found."
        );
      }

      const session = await prisma.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: {
            gt: new Date(),
          },
        },
        include: {
          user: true,
        },
      });

      if (!session || !session.user) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Session is invalid or has expired."
        );
      }

      const user = session.user;

      // Warn frontend when session is close to expiring
      const now = Date.now();
      const createdAt = session.createdAt.getTime();
      const expiresAt = session.expiresAt.getTime();

      const lifetime = expiresAt - createdAt;
      const remaining = expiresAt - now;

      if ((remaining / lifetime) * 100 < 20) {
        res.setHeader("X-Session-Refresh", "true");
        res.setHeader(
          "X-Session-Expires-At",
          session.expiresAt.toISOString()
        );
      }

      if (user.status === UserStatus.BANNED) {
        throw new AppError(status.FORBIDDEN, "User is banned.");
      }

      if (user.isDeleted) {
        throw new AppError(status.NOT_FOUND, "User no longer exists.");
      }

      if (user.needPasswordChange) {
        throw new AppError(
          status.FORBIDDEN,
          "Please change your password before continuing."
        );
      }

      if (
        allowedRoles.length &&
        !allowedRoles.includes(user.role)
      ) {
        throw new AppError(
          status.FORBIDDEN,
          "You do not have permission to access this resource."
        );
      }

      req.user = {
        userId: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
        status: user.status,
      };

      next();
    } catch (error) {
      next(error);
    }
  };