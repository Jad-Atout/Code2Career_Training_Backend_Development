// auth/auth.service.ts
import { userService } from "../users/user.service.js";
import type { LoginDTO, LoginResponseDTO, RegisterDTO, TokensPair } from "./types/auth.dto.js";
import { createArgonHash, verifyArgonHash } from "./util/argon.util.js";
import { removeFields } from "../util/Object.util.js";
import { signAccessToken, signRefreshToken } from "./util/jwt.util.js";
import { refreshStore } from "./util/token.store.js";

export class AuthService {
    private _userService = userService;

    public async register(payload: RegisterDTO) {
        const hashed = await createArgonHash(payload.password);
        const user = this._userService.createUser({
            name: payload.name,
            email: payload.email,
            password: hashed,
            role: "STUDENT",
        });
        return removeFields(user, ["password"]);
    }

    public async login(payload: LoginDTO): Promise<LoginResponseDTO | null> {
        const foundUser = this._userService.findByEmail(payload.email);
        if (!foundUser) return null;

        const isMatch = await verifyArgonHash(payload.password, foundUser.password);
        if (!isMatch) return null;

        return removeFields(foundUser, ["password"]);
    }

    public issueTokens(user: LoginResponseDTO): TokensPair {
        const accessToken = signAccessToken({ sub: user.id, name: user.name });
        const { token: refreshToken, jti } = signRefreshToken(user.id);

        // persist refresh
        refreshStore.add({ userId: user.id, jti, createdAt: Date.now() });

        return { accessToken, refreshToken };
    }

    public revokeAllUserRefresh(userId: string) {
        refreshStore.revokeAllForUser(userId);
    }
}
