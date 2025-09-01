// auth/middleware/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, verifyRefreshToken, signAccessToken, signRefreshToken } from "../util/jwt.util.js";
import { AUTH_COOKIE } from "../types/auth.dto.js";
import { refreshStore } from "../util/token.store.js";
import { setAccessCookie, setRefreshCookie, clearAuthCookies } from "../util/cookie.util.js";
import { HttpErrorStatus } from "../../util/util.types.js";

declare module "express-serve-static-core" {
    interface Request {
        user?: { id: string; name?: string };
    }
}

// Protect routes using the access token from HTTP-only cookie
export const requireAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.[AUTH_COOKIE.ACCESS];
    if (!token) return res.status(HttpErrorStatus.Unauthorized).json({ error: "Missing access token" });

    try {
        const payload = verifyAccessToken(token);
        req.user = { id: payload.sub, name: payload.name };
        next();
    } catch {
        return res.status(HttpErrorStatus.Unauthorized).json({ error: "Invalid or expired access token" });
    }
};

// Refresh route handler (middleware/controller hybrid)
// 1) Read refresh cookie
// 2) Verify JWT, check jti in memory store
// 3) Rotate: delete old jti, issue new refresh + access
export const handleRefresh = (req: Request, res: Response) => {
    const token = req.cookies?.[AUTH_COOKIE.REFRESH];
    if (!token) return res.status(HttpErrorStatus.Unauthorized).json({ error: "Missing refresh token" });

    try {
        const payload = verifyRefreshToken(token);
        const record = refreshStore.get(payload.jti);
        if (!record || record.userId !== payload.sub) {
            clearAuthCookies(res);
            return res.status(HttpErrorStatus.Unauthorized).json({ error: "Refresh token not recognized" });
        }

        // rotate
        refreshStore.delete(payload.jti);

        const { token: newRefresh, jti } = signRefreshToken(payload.sub);
        refreshStore.add({ userId: payload.sub, jti, createdAt: Date.now() });

        const newAccess = signAccessToken({ sub: payload.sub, name: req.user?.name ?? "" });

        setAccessCookie(res, newAccess);
        setRefreshCookie(res, newRefresh);

        return res.status(HttpErrorStatus.ok).json({ ok: true });
    } catch {
        clearAuthCookies(res);
        return res.status(HttpErrorStatus.Unauthorized).json({ error: "Invalid or expired refresh token" });
    }
};
