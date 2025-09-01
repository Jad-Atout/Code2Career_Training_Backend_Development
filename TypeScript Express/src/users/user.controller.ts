import { userService } from "./user.service.js";
import { Request, Response } from "express";
import { HttpErrorStatus } from "../util/util.types.js";

export class UsersController {
    private service = userService;

    getUsers = (
        req: Request<{}, {}, {}, { page?: string; limit?: string }>,
        res: Response
    ) => {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);

        const users = this.service.getUsers(page, limit);
        res.json(users);
    };

    getUser = (req: Request, res: Response) => {
        const id = req.session.userId;
        if (!id) {
            return res
                .status(HttpErrorStatus.BadRequest)
                .json({ error: "User ID required" });
        }

        const user = this.service.getUser(id);
        if (!user) {
            return res
                .status(HttpErrorStatus.NotFound)
                .json({ error: "User not found" });
        }
        res.json(user);
    };

    createUser = (req: Request, res: Response) => {
        const { name, email, password, role } = req.body;

        const user = this.service.createUser({ name, email, password, role });
        res.status(HttpErrorStatus.created).json(user);
    };

    createCoach = (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        const coach = this.service.createUser({
            name,
            email,
            password,
            role: "COACH",
        });
        res.status(HttpErrorStatus.created).json(coach);
    };

    updateUser = (req: Request, res: Response) => {
        const id = req.session.userId;
        if (!id) {
            return res
                .status(HttpErrorStatus.BadRequest)
                .json({ error: "ID required" });
        }

        const { name, email, role } = req.body;
        const user = this.service.updateUser(id, { name, email, role });

        if (!user) {
            return res
                .status(HttpErrorStatus.NotFound)
                .json({ error: "User not found" });
        }
        res.json(user);
    };

    deleteUser = (req: Request, res: Response) => {
        const id = req.session.userId;
        if (!id) {
            return res
                .status(HttpErrorStatus.BadRequest)
                .json({ error: "ID required" });
        }

        const deleted = this.service.deleteUser(id);
        if (!deleted) {
            return res
                .status(HttpErrorStatus.NotFound)
                .json({ error: "User not found" });
        }
        res.status(HttpErrorStatus.deleted).send();
    };
}
