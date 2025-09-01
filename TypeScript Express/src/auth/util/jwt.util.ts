import jwt from 'jsonwebtoken'
import {getEnvOrThrow} from "../../util/util";

type JWT_PAYLOAD = {
    sub:string,
    name:string,
}
const JWT_SECRET = getEnvOrThrow('JWT_SECRET');
export const signJWT = (payload: JWT_PAYLOAD) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

export const verifyJWT = (token:string):JWT_PAYLOAD =>{
    return jwt.verify(token, JWT_SECRET) as JWT_PAYLOAD;
}
const ACCESS_SECRET = getEnvOrThrow("JWT_ACCESS_SECRET");
const REFRESH_SECRET = getEnvOrThrow("JWT_REFRESH_SECRET");

export const ACCESS_EXPIRES_IN = "15m";
export const REFRESH_EXPIRES_IN = "7d";

export type AccessPayload = {
    sub: string;
    name: string;
    type: "access";
};
export type RefreshPayload = {
    sub: string;
    jti: string;
    type: "refresh";
};

export const signAccessToken = (payload: Omit<AccessPayload, "type">) =>
    jwt.sign({ ...payload, type: "access" }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });

export const signRefreshToken = (userId: string, jti?: string) => {
    const refreshPayload: RefreshPayload = {
        sub: userId,
        jti: jti ?? crypto.randomUUID(),
        type: "refresh",
    };
    return {
        token: jwt.sign(refreshPayload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN }),
        jti: refreshPayload.jti,
    };
};

export const verifyAccessToken = (token: string): AccessPayload =>
    jwt.verify(token, ACCESS_SECRET) as AccessPayload;

export const verifyRefreshToken = (token: string): RefreshPayload =>
    jwt.verify(token, REFRESH_SECRET) as RefreshPayload;