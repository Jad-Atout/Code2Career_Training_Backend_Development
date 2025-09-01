// auth/auth.controller.ts
import { AuthService } from "./auth.service.js";
import type { Request, Response, NextFunction } from "express";
import { HttpErrorStatus, StringObject } from "../util/util.types.js";
import type { LoginDTO, RegisterDTO, LoginResponseDTO } from "./types/auth.dto.js";
import { zodValidation } from "../util/zod.util.js";
import { loginDTOSchema, registerDTOSchema } from "./util/auth.schema.js";
import { setAccessCookie, setRefreshCookie, clearAuthCookies } from "./util/cookie.util.js";

export class AuthController {
    private authService = new AuthService();

    public async register(
        req: Request<StringObject, StringObject, RegisterDTO>,
        res: Response,
    ) {
        try {
            const payload = zodValidation(registerDTOSchema, req.body, "AUTH");
            const user = await this.authService.register(payload);
            res.status(HttpErrorStatus.created).json(user);
        } catch {
            res.status(HttpErrorStatus.BadRequest).send("internal server error");
        }
    }

    public async login(req: Request<StringObject, StringObject, LoginDTO>, res: Response) {
        const payload = zodValidation(loginDTOSchema, req.body, "AUTH");
        const user = await this.authService.login(payload);
        if (!user) return res.status(HttpErrorStatus.BadRequest).send("wrong credentials");

        req.session.userId = user.id;
        return res.status(HttpErrorStatus.ok).send();
    }

    public async loginWithJWT(req: Request<StringObject, StringObject, LoginDTO>, res: Response) {
        const payload = zodValidation(loginDTOSchema, req.body, "AUTH");
        const user = await this.authService.login(payload);
        if (!user) return res.status(HttpErrorStatus.BadRequest).send("wrong credentials");

        const { accessToken, refreshToken } = this.authService.issueTokens(user);
        setAccessCookie(res, accessToken);
        setRefreshCookie(res, refreshToken);

        return res.status(HttpErrorStatus.ok).json({ data: user });
    }

    public async logoutJWT(req: Request, res: Response) {
        clearAuthCookies(res);
        return res.status(HttpErrorStatus.ok).send();
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        req.session.destroy(function (err) {
            if (err) return next(err);
            res.clearCookie("connect.sid");
            res.status(HttpErrorStatus.ok).send();
        });
    }
}

export const authController = new AuthController();
