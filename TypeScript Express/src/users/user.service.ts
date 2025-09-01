import { UserRepository } from "./user.repository.js";
import {Role, User} from "./user.entity.js";

class UserService {
    private repository = new UserRepository();

    getUsers(page: number = 1, limit: number = 10): User[] {
        const users = this.repository.findAll();

        // calculate pagination offsets
        const start = (page - 1) * limit;
        const end = start + limit;

        return users.slice(start, end);
    }

    getUser(id: string): User | undefined {
        return this.repository.findById(id);
    }

    findByEmail(email: string): User | undefined {
        return this.repository.findByEmail(email);
    }

    createUser(data: { name: string; email: string; password: string; role?: Role }): User {
        return this.repository.createUser(data);
    }

    updateUser(id: string, updates: Partial<Pick<User, "name" | "email" | "role">>): User | null {
        return this.repository.updateUser(id, updates);
    }

    deleteUser(id: string): boolean {
        return this.repository.delete(id);
    }

    isUserIdExists(id: string): boolean {
        return !!this.repository.findById(id);
    }
}

export const userService = new UserService();
