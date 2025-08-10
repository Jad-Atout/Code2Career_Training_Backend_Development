# Basic HTTP Server with JSON Response

## 📌 Task Overview
This project is a simple HTTP server built using Node.js' native `http` module without any external frameworks such as Express.  
It handles multiple routes, returns responses in JSON format, and follows the specifications of **Task 6 – Create a Basic HTTP Server with JSON Response**.

---

## 📋 Requirements Fulfilled
- ✅ Native HTTP module (`http`)
- ✅ Listening on port 3000
- ✅ Two main routes:
    - GET / → { "message": "Welcome to the server" }
    - GET /about → { "message": "This is the about route" }
- ✅ JSON Content-Type header
- ✅ 404 handling → { "error": "Route not found" }
- ✅ TypeScript type safety (no `any` used)

---

## 📂 Project Structure
server.ts        # Main server file with route handling logic  
package.json     # Project metadata and scripts  
tsconfig.json    # TypeScript configuration  
README.md        # Task description and usage instructions

---

## 🚀 Getting Started

### 1️⃣ Install dependencies
(Only TypeScript + types for Node.js, no extra frameworks)
npm install typescript @types/node --save-dev


### 2️⃣ Run the server
Using the script from `package.json`:


This starts the server with live-reload using `tsx watch`.

For a one-time run without watching:



---

## 🧪 Testing the Routes

### GET /
curl http://localhost:3000/
# {"message":"Welcome to the server"}

### GET /about
curl http://localhost:3000/about
# {"message":"This is the about route"}

### Unknown route
curl http://localhost:3000/unknown
# {"error":"Route not found"}

---

## 🎯 Goal
The purpose of this project is to:
- Learn how to use Node.js' native HTTP server
- Understand basic request handling
- Return structured JSON responses
- Practice TypeScript type safety without using external frameworks
