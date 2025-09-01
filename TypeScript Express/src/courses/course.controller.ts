import { courseService } from "./course.service.js";
import { Request, Response } from "express";
import { HttpErrorStatus } from "../util/util.types.js";

// TODO: add image upload
// TODO: add validation

export class CoursesController {
    private service = courseService;

    getCourses = (
        req: Request<{}, {}, {}, { page?: string; limit?: string }>,
        res: Response
    ) => {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);

        const courses = this.service.getCourses(page, limit);
        res.json(courses);
    };

    getCourse = (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const course = this.service.getCourse(id);
        if (!course) {
            return res
                .status(HttpErrorStatus.NotFound)
                .json({ error: "Course not found" });
        }
        res.json(course);
    };

    createCourse = (req: Request, res: Response) => {
        const { title, description, image } = req.body;
        const course = this.service.createCourse({ title, description, image });
        res.status(HttpErrorStatus.created).json(course);
    };

    updateCourse = (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res
                .status(HttpErrorStatus.BadRequest)
                .json({ error: "ID required" });

        const { title, description, image } = req.body;
        const course = this.service.updateCourse(id, { title, description, image });
        if (!course)
            return res
                .status(HttpErrorStatus.NotFound)
                .json({ error: "Course not found" });
        res.json(course);
    };

    deleteCourse = (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res
                .status(HttpErrorStatus.BadRequest)
                .json({ error: "ID required" });

        const deleted = this.service.deleteCourse(id);
        if (!deleted)
            return res
                .status(HttpErrorStatus.NotFound)
                .json({ error: "Course not found" });
        res.status(HttpErrorStatus.deleted).send();
    };
}
