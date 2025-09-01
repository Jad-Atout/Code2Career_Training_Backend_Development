import type { Response } from "express";
import { AUTH_COOKIE } from "../types/auth.dto.js";

const baseCookie = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
};

export const setAccessCookie = (res: Response, token: string) => {
    res.cookie(AUTH_COOKIE.ACCESS, token, { ...baseCookie /* no maxAge -> session cookie */ });
};

export const setRefreshCookie = (res: Response, token: string) => {
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    res.cookie(AUTH_COOKIE.REFRESH, token, { ...baseCookie, maxAge: sevenDaysMs });
};

export const clearAuthCookies = (res: Response) => {
    res.clearCookie(AUTH_COOKIE.ACCESS, { path: "/" });
    res.clearCookie(AUTH_COOKIE.REFRESH, { path: "/" });
};
