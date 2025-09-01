import { Course } from "./course.entity.js";

export class CourseRepository {
    private courses: Course[] = [
        {
            id: "c1",
            title: "Intro to TypeScript",
            description: "Learn the basics of TypeScript, types, and OOP.",
            image: "https://example.com/course-image.png",
            createdAt: new Date("2025-01-01T10:00:00Z"),
            updatedAt: new Date("2025-01-01T10:00:00Z"),
        },
    ];

    private idCounter = 2;

    findAll(): Course[] {
        return this.courses;
    }

    findById(id: string): Course | undefined {
        return this.courses.find((course) => course.id === id);
    }

    createCourse(data: { title: string; description: string; image?: string }): Course {
        const course: Course = {
            id: this.idCounter.toString(),
            title: data.title,
            description: data.description,
            image: data.image,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.idCounter++;
        this.courses.push(course);
        return course;
    }

    updateCourse(id: string, updates: Partial<Pick<Course, "title" | "description" | "image">>): Course | null {
        const course = this.findById(id);
        if (!course) return null;

        if (updates.title) course.title = updates.title;
        if (updates.description) course.description = updates.description;
        if (updates.image) course.image = updates.image;
        course.updatedAt = new Date();

        return course;
    }

    delete(id: string): boolean {
        const index = this.courses.findIndex((course) => course.id === id);
        if (index === -1) return false;
        this.courses.splice(index, 1);
        return true;
    }
}
