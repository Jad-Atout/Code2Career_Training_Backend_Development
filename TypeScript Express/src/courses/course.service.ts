import { CourseRepository } from "./course.repository.js";
import { Course } from "./course.entity.js";

class CourseService {
    private repository = new CourseRepository();

    getCourses(page: number = 1, limit: number = 10): Course[] {
        const courses = this.repository.findAll();

        const start = (page - 1) * limit;
        const end = start + limit;

        return courses.slice(start, end);
    }

    getCourse(id: string): Course | undefined {
        return this.repository.findById(id);
    }

    createCourse(data: { title: string; description: string; image?: string }): Course {
        return this.repository.createCourse(data);
    }

    updateCourse(id: string, updates: Partial<Pick<Course, "title" | "description" | "image">>): Course | null {
        return this.repository.updateCourse(id, updates);
    }

    deleteCourse(id: string): boolean {
        return this.repository.delete(id);
    }

    isCourseIdExists(id: string): boolean {
        return !!this.repository.findById(id);
    }
}

export const courseService = new CourseService();
