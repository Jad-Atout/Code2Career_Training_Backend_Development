import {NextFunction,Response,Request } from "express";
import {userService} from "../users/user.service";
import {verifyJWT} from "../auth/util/jwt.util";
import {CustomError} from "../util/exception";
import {HttpErrorStatus} from "../util/util.types";
import {Role} from "../users/user.entity";

export const isAuthenticated= (
    req:Request,
    res:Response,
    next:NextFunction
)=> {
    if (req.session.userId) {
        const isUserStillExist = userService.isUserIdExists(req.session.userId);
        if (isUserStillExist) {
            next()
            return
        }
    }

    const authHeader = req.headers.authorization;
    if (authHeader) {
        const jwt = authHeader.replace("Bearer ", "");
        console.log('jwt', jwt)
        try {
            const payload = verifyJWT(jwt)
            next()
            return;
        } catch (err) {
            console.log('jwt is wrong');
        }
    }
    next(new CustomError('user is not Authenticated','AUTH',HttpErrorStatus.Unauthorized))
}
export const isAuthorized =(...allowedRoles:Role[])=>
    (req:Request, res:Response, next:NextFunction) => {
        try {
            const user =  userService.getUser(req.session.userId); // assuming async

            if (!user) {
                return next(
                    new CustomError(
                        "User not found",
                        "AUTH",
                        HttpErrorStatus.Unauthorized
                    )
                );
            }

            if (allowedRoles.includes(user.role)) {
                return next();
            }

            return next(
                new CustomError(
                    "User is not Authorized",
                    "AUTH",
                    HttpErrorStatus.Forbidden
                )
            );
        } catch (err) {
            next(err);
        }
    }