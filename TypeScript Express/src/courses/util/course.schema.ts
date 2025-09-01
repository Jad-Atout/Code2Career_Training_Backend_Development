import z, {ZodType} from "zod";
import {Course} from "../course.entity";

export const courseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date()
}) satisfies ZodType<Course>