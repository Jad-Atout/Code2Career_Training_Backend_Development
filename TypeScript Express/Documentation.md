Express TypeScript API Documentation

Project Overview
----------------
This project is a modular Express API built in TypeScript using an in-memory Generic Repository Pattern.
It includes three main modules: Auth, Users, and Courses, supporting JWT authentication, role-based access control, and DTO validation using Zod.

All data is stored in memory and resets on server restart.

Default Admin User
-----------------
On every server start, the following admin user is automatically available:

- Email: admin@no.com
- Password: admin123
- Role: ADMIN

Project Architecture
-------------------
src/
├── auth/            # Authentication module (register, login, JWT)
├── users/           # User module (profile read/update)
├── courses/         # Course module (CRUD)
├── shared/          # Common utils, middlewares, and error handling
├── server.ts        # App entry point

Entities
--------
User

interface User {
id: string;
name: string;
email: string;
password: string;
role: "ADMIN" | "COACH" | "STUDENT";
createdAt: Date;
updatedAt: Date;
}

Course

interface Course {
id: string;
title: string;
description: string;
image?: string;
createdAt: Date;
updatedAt: Date;
}

Features & Routes
-----------------

Authentication (/auth)
- POST /auth/register → Register a new user (default role: STUDENT)
- POST /auth/login → Authenticate user and issue JWT token
- POST /auth/login/jwt → Login and receive JWT token (alternative method)
- POST /auth/logout → Destroy session / logout
- POST /auth/refresh-token → Refresh access token (to be implemented)

Users (/users)
- GET /users/me → Get current user profile (protected)
- PUT /users/me → Update current user profile (protected)
- POST /users/coach → Create a COACH user (ADMIN only)

Courses (/courses)
- POST /courses → Create a course (COACH or ADMIN only)
- GET /courses → Get all courses (public)
- GET /courses/:id → Get course by ID (public)
- PUT /courses/:id → Update course (COACH or ADMIN only)
- DELETE /courses/:id → Delete course (COACH or ADMIN only)

Roles & Permissions
------------------
ADMIN:
- Can create COACH users
- Can update/delete any course

COACH:
- Can create/update/delete their own courses

STUDENT:
- Default role on registration
- Can only view courses

Generic Repository Pattern
--------------------------
- Implemented in shared/ using TypeScript Generics
- Provides reusable CRUD methods: findAll, findById, create, update, delete
- Used by Users and Courses modules for in-memory storage

DTO Validation (Zod)
--------------------
- RegisterDTO → Validates { name, email, password }
- LoginDTO → Validates { email, password }
- Validation is enforced in controllers before passing data to services

Middleware
----------
- Authentication (isAuthenticated)
    - Checks session or JWT token
    - Blocks unauthenticated access

- Authorization (isAuthorized(...roles))
    - Ensures user role matches required roles

- Error handling
    - 400 → Validation errors
    - 401 → Unauthorized (invalid/no token)
    - 403 → Forbidden (wrong role)
    - 404 → Resource not found

- Global error handler
    - Catches exceptions and sends JSON response

- Fallback 404 middleware
    - Handles unknown routes

Setup Instructions
------------------
1. Clone repository
   git clone <repo-url>
   cd <repo-folder>

2. Install dependencies
   npm install

3. Create .env file with:
   PORT=3000
   SESSION_SECRET=mysupersecret
   JWT_SECRET=your_jwt_secret

4. Run the server
   npm run dev
    - Server starts on http://localhost:3000
    - Default admin credentials available as noted above

Notes
-----
- All data is stored in-memory and resets on server restart
- Follow modular architecture strictly for maintainability
- Controllers use Zod validation, Generic Repository, and role-based access
- Clean TypeScript code with proper typing and DTOs enforced

Summary
-------
This project demonstrates:
- Modular Express + TypeScript design
- In-memory Generic Repository Pattern
- JWT-based authentication + role-based authorization
- DTO validation with Zod
- RESTful CRUD for users and courses
- Proper middleware and error handling
