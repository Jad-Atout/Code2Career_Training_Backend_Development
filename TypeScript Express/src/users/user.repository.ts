import { GenericRepository } from "../shared/generic.repository.js";
import { User, Role } from "./user.entity.js";

export class UserRepository extends GenericRepository<User> {
    constructor() {
        super();
        this.create({
            name: "Jad",
            email: "alice@example.com",
            password: "hashed-password",
            role: "ADMIN",
        });
    }

    findByEmail(email: string): User | undefined {
        return this.findAll().find(user => user.email === email);
    }

    createUser(data: { name: string; email: string; password: string; role?: Role }): User {
        return this.create({
            ...data,
            role: data.role ?? "STUDENT",
        });
    }

    updateUser(id: string, updates: Partial<Pick<User, "name" | "email" | "role">>): User | null {
        return this.update(id, updates);
    }
}
