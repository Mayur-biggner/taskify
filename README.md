# Task Management API

## 📌 Overview
This is a **Task Management API** built with **NestJS**. It allows users to create, retrieve, update, and delete tasks. It also supports filtering tasks by **title, due date, and date range**.

## 🚀 Features
- Create a new task ✅
- Retrieve all tasks with filtering options ✅
- Retrieve a specific task by ID ✅
- Update an existing task ✅
- Delete a task ✅
- Swagger API documentation ✅
- Unit tests with Jest ✅

---

## 🛠️ Installation

1. **Clone the repository**
```sh
git clone <your-repo-url>
cd <your-project-folder>
```

2. **Install dependencies**
```sh
npm install
```

3. **Run the application**
```sh
npm run start
```

4. **Run in watch mode (for development)**
```sh
npm run start:dev
```

5. **Swagger API Documentation** is available at:
```
http://localhost:3000/api
```

---

## 📌 API Endpoints

### **1️⃣ Get All Tasks**
```http
GET /todos
```
**Query Parameters:**
| Parameter   | Type   | Description                      |
|------------|--------|----------------------------------|
| title      | string | Filter tasks by title (optional) |
| dueDate    | string | Filter tasks by due date (optional) |
| startDate  | string | Filter by start date (optional) |
| endDate    | string | Filter by end date (optional) |

### **2️⃣ Get Task By ID**
```http
GET /todos/:id
```

### **3️⃣ Create a New Task**
```http
POST /todos
```
**Body:**
```json
{
  "title": "New Task",
  "description": "Task details",
  "dueDate": "2025-04-01",
  "completed": false
}
```

### **4️⃣ Update a Task**
```http
PUT /todos/:id
```
**Body:**
```json
{
  "title": "Updated Task",
  "completed": true
}
```

### **5️⃣ Delete a Task**
```http
DELETE /todos/:id
```

---

## 🧪 Running Tests

To run unit tests with **Jest**, use:
```sh
npm run test
```

To run tests in **watch mode**:
```sh
npm run test:watch
```

To generate a **test coverage report**:
```sh
npm run test:cov
```

---

## 📌 Folder Structure
```
 src
 ┣ tasks
 ┃ ┣ tasks.controller.ts   # Controller for handling API requests
 ┃ ┣ tasks.service.ts      # Service for business logic
 ┃ ┣ dtos                  # DTOs for data validation
 ┃ ┣ vms                   # View models for responses
 ┃ ┗ __tests__             # Jest test cases
 ┣ app.module.ts           # Main application module
 ┣ main.ts                 # Application entry point
```

---

## 🔗 References
- [NestJS Documentation](https://docs.nestjs.com/)
- [Swagger UI](https://swagger.io/)
- [Jest Testing](https://jestjs.io/)

**🎯 Happy Coding! 🚀**

