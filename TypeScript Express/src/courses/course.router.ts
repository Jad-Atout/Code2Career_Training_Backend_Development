import {Router} from "express";
import {CoursesController} from "./course.controller";
import {isAuthenticated, isAuthorized} from "../middleware/auth.middleware";

const coursesController = new CoursesController()
const router =  Router()

router.get("/courses", coursesController.getCourses.bind(coursesController));
router.get("/courses/:id", coursesController.getCourse.bind(coursesController));

router.use(isAuthenticated,isAuthorized("COACH","ADMIN"))

router.post("/courses", coursesController.createCourse.bind(coursesController));
router.put("/courses/:id", coursesController.updateCourse);
router.delete("/courses/:id", isAuthorized("COACH", "ADMIN"), coursesController.deleteCourse);
export const courseRouter = router;
