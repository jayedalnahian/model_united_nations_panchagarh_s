import { Response } from "express";
import { cookieUtils } from "./cookie.js";


const setBetterAuthSessionCookie = (res: Response, token: string) => {
  cookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //1 day
    maxAge: 60 * 60 * 24 * 1000,
  });
};

export const tokenUtils = {
  setBetterAuthSessionCookie,
};
