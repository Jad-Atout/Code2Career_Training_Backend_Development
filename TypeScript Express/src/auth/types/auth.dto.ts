import {User} from "../../users/user.entity";

export type LoginDTO = {
    email: string;
    password: string;
}
export type  LoginResponseDTO = Omit<User,'password'>
export type LoginResponseDTOWithJWT = {
    data: Omit<User,'password'>,
    token: string,
}
export type RegisterDTO = Pick<User,'email' | 'name' | 'password'>
export type RegisterResponseDTO = Omit<User, 'password'>

export const AUTH_COOKIE = {
    ACCESS: "access_token",
    REFRESH: "refresh_token",
} as const;

export type TokensPair = {
    accessToken: string;
    refreshToken: string;
};