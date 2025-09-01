import z, { ZodType} from "zod"
import {User} from '../user.entity.js'

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    role:z.enum(["ADMIN", "STUDENT", "COACH"]),
    createdAt: z.date(),
    updatedAt: z.date(),
    password: z.string().min(8),
}) satisfies ZodType<User>