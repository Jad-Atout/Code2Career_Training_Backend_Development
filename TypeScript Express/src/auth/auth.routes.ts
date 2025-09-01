// auth/auth.router.ts
import { Router } from "express";
import { authController } from "./auth.controller.js";
import { handleRefresh, requireAccessToken } from "./middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/login", authController.login.bind(authController));             // session
authRouter.post("/jwt/login", authController.loginWithJWT.bind(authController));  // jwt cookies
authRouter.post("/jwt/refresh", handleRefresh);                                   // refresh using cookie
authRouter.post("/jwt/logout", authController.logoutJWT.bind(authController));    // clear cookies

// Example protected route using access cookie:
authRouter.get("/me", requireAccessToken, (req, res) => {
    res.json({ userId: req.user?.id, name: req.user?.name });
});

authRouter.post("/logout", authController.logout.bind(authController));           // session logout

export default authRouter;
