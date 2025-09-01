import {Router} from "express";
import {UsersController} from "./user.controller";
import {isAuthenticated, isAuthorized} from "../middleware/auth.middleware";

const  userController = new UsersController()
const router = Router();
router.use(isAuthenticated)
router.get('/users/me',userController.getUser)
router.put('/users/me',userController.updateUser)
router.post('/users/coach',isAuthorized("ADMIN"),userController.createCoach)
export const userRouter = router;