declare module 'express-session' {
    interface SessionData{
        userId: string;
    }
}

export type MyEnvs = {
    PORT: string;
    NODE_ENV: "development" | "production";
    JWT_SECRET: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;

}
declare global {
    namespace NodeJS {
        interface ProcessEnv extends MyEnvs {}
    }
}