# Advanced Web Development Frameworks (ITUE301) - Practical Submission

**Charotar University of Science and Technology (CHARUSAT)**  
**Faculty of Technology and Engineering**  
**Department of Computer Engineering / Information Technology**  

---

### 👤 **Student Information**
- **Student Name:** Meet Ghori
- **ID / Roll No:** 24CE034
- **Subject:** Advanced Web Development Frameworks (ITUE301)
- **Semester:** 5th Semester
- **Repository Link:** [24CE034_AWDF_prac-s](https://github.com/MeetGhori02/24CE034_AWDF_prac-s.git)

---

## 📊 **Practical Progress Dashboard**

| Practical # | Title / Topic | Status | Technologies Used |
| :---: | :--- | :---: | :--- |
| **01** | [Introduction to React and Component Architecture](#practical-1-introduction-to-react-and-component-architecture) | ✅ **Completed** | React 19, Vite, JSX, Props |
| **02** | [State Management and Routing in React](#practical-2-state-management-and-routing-in-react) | ✅ **Completed** | React Router v7, `useState`, Controlled Inputs |
| **03** | [API Integration and Data Rendering in React](#practical-3-api-integration-and-data-rendering-in-react) | ✅ **Completed** | `useEffect`, Fetch API, Async UI (Loading/Error) |
| **04** | [Building a RESTful API with Node.js and Express](#practical-4-building-a-restful-api-with-nodejs-and-express) | ✅ **Completed** | Node.js, Express.js, Custom Middleware |
| **05** | [MongoDB Integration and Schema Design with Mongoose](#practical-5-mongodb-integration-and-schema-design-with-mongoose) | ✅ **Completed** | MongoDB, Mongoose ODM, Schema Validation |
| **06** | [Full Stack Integration React + Node + MongoDB](#practical-6-full-stack-integration-react--node--mongodb) | ✅ **Completed** | Full-Stack CRUD, CORS, React Services |
| **07** | [Authentication and Middleware Pipeline](#practical-7-authentication-and-middleware-pipeline) | ✅ **Completed** | JWT, `bcryptjs` Hashing, Auth Middleware, Input Sanitization |
| **08** | Performance Optimization and Lazy Loading in React | ⏳ *Pending* | `React.lazy()`, `Suspense`, Code Splitting |
| **09** | In-Memory Caching and Query Optimization | ⏳ *Pending* | `node-cache`, TTL, Cache Invalidation |
| **10** | Asynchronous Processing with Event-Driven Architecture | ⏳ *Pending* | Node.js `EventEmitter`, Async Listeners |
| **11** | Containerization with Docker and Docker Compose | ⏳ *Pending* | Docker, `docker-compose`, Multi-container |
| **12** | CI/CD Pipeline with GitHub Actions | ⏳ *Pending* | GitHub Actions, Automated Testing |
| **13** | AI API Integration into a Web Application | ⏳ *Pending* | OpenAI / Gemini API, Backend Proxy |

---

## 📂 **Repository Directory Structure**

```
24CE034_AWDF_prac-s/
├── 2026-27-ODD-ITUE301-AWF-PracticalList.pdf    # Syllabus & Practical Specification
├── README.md                                    # Master Documentation File
└── Portfolio/
    ├── student-portfolio/                       # FRONTEND (React + Vite)
    │   ├── src/
    │   │   ├── component/
    │   │   │   ├── Header.jsx                   # Reusable Header Component
    │   │   │   ├── About.jsx                    # About Me Component
    │   │   │   ├── Skills.jsx                   # Dynamic Skills Component
    │   │   │   ├── footer.jsx                   # Footer Component
    │   │   │   ├── Home.jsx                     # Home Page Route
    │   │   │   ├── Project.jsx                  # Full Stack Task UI & API Integration
    │   │   │   └── Contact.jsx                  # Controlled Form & UI Toggle State
    │   │   ├── services/
    │   │   │   └── api.js                       # Centralized Fetch API Service (Auth & Tasks)
    │   │   ├── App.jsx                          # Main Router & Component Composition
    │   │   └── main.jsx                         # React Entry Point
    │   └── package.json
    │
    └── task-manager-api/                        # BACKEND (Node.js + Express + MongoDB)
        ├── middleware/
        │   ├── auth.js                          # JWT Authentication Middleware
        │   └── validateInput.js                 # Server-side Input Validation
        ├── models/
        │   ├── Task.js                          # Mongoose Task Schema & Model
        │   └── User.js                          # Mongoose User Schema & Model
        ├── .env.example                         # Environment Variables Template
        ├── server.js                            # Express Server & REST API Endpoints
        └── package.json
```

---

## 📑 **Detailed Completed Practical Summaries**

### **Practical 1: Introduction to React and Component Architecture**
- **Objective:** Scaffold a React application using Vite and compose a single-page student portfolio using modular functional components.
- **Key Deliverables & Implementation:**
  - Created 4 reusable components: `Header.jsx`, `About.jsx`, `Skills.jsx`, and `footer.jsx`.
  - Passed `name` and `skillList` array props dynamically from `App.jsx`.
  - Maintained zero code duplication across UI sections.
- **Key Code File:** [student-portfolio/src/App.jsx](file:///m:/FOR%20ME/M/COLLEGE%20WORK/5th%20SEMESTER/WDF-ADVANCED/Portfolio/student-portfolio/src/App.jsx)

---

### **Practical 2: State Management and Routing in React**
- **Objective:** Add client-side multi-page routing with `react-router-dom` and manage reactive UI state using the `useState` hook.
- **Key Deliverables & Implementation:**
  - Configured `<BrowserRouter>`, `<Routes>`, and `<Route>` for `/`, `/project`, and `/contact`.
  - Implemented controlled input state in `Contact.jsx` for real-time text binding.
  - Implemented UI state toggle (`isVisible`) to show/hide help text dynamically.
- **Key Code File:** [Contact.jsx](file:///m:/FOR%20ME/M/COLLEGE%20WORK/5th%20SEMESTER/WDF-ADVANCED/Portfolio/student-portfolio/src/component/Contact.jsx)

---

### **Practical 3: API Integration and Data Rendering in React**
- **Objective:** Fetch asynchronous data from a REST endpoint using `useEffect` and handle lifecycle states.
- **Key Deliverables & Implementation:**
  - Used `useEffect` to fetch dynamic task/repository data upon component mounting.
  - Handled loading indicator state (`loading`) and user-friendly error messages (`error`).
  - Rendered data lists dynamically using array mapping (`map()`).
- **Key Code File:** [Project.jsx](file:///m:/FOR%20ME/M/COLLEGE%20WORK/5th%20SEMESTER/WDF-ADVANCED/Portfolio/student-portfolio/src/component/Project.jsx)

---

### **Practical 4: Building a RESTful API with Node.js and Express**
- **Objective:** Build a Node.js Express server providing full RESTful CRUD endpoints with custom middleware.
- **Key Deliverables & Implementation:**
  - Defined `GET`, `POST`, `PUT`, and `DELETE` routes for `/tasks`.
  - Applied global request logging middleware recording request timestamp, HTTP method, and URL.
  - Created global JSON body parser (`express.json()`) and header validation middleware.
  - Implemented centralized 404 handler and global error handling middleware.
- **Key Code File:** [task-manager-api/server.js](file:///m:/FOR%20ME/M/COLLEGE%20WORK/5th%20SEMESTER/WDF-ADVANCED/Portfolio/task-manager-api/server.js)

---

### **Practical 5: MongoDB Integration and Schema Design with Mongoose**
- **Objective:** Connect MongoDB database to Express and enforce data validation through Mongoose models.
- **Key Deliverables & Implementation:**
  - Connected MongoDB database securely using `mongoose.connect()`.
  - Designed `Task` schema with validation (`title` required, `completed` boolean, `priority` enum, `createdAt` default timestamp).
  - Replaced temporary arrays with persistent Mongoose CRUD methods (`Task.find()`, `Task.create()`, `Task.findByIdAndUpdate()`, `Task.findByIdAndDelete()`).
- **Key Code File:** [Task.js Model](file:///m:/FOR%20ME/M/COLLEGE%20WORK/5th%20SEMESTER/WDF-ADVANCED/Portfolio/task-manager-api/models/Task.js)

---

### **Practical 6: Full Stack Integration (React + Node + MongoDB)**
- **Objective:** Wire the React frontend to the Express backend for complete end-to-end data persistence.
- **Key Deliverables & Implementation:**
  - Configured `cors` middleware on Express server to enable cross-origin communication.
  - Created centralized API helper service [api.js](file:///m:/FOR%20ME/M/COLLEGE%20WORK/5th%20SEMESTER/WDF-ADVANCED/Portfolio/student-portfolio/src/services/api.js).
  - Synchronized React local state with database operations after successful write actions.

---

### **Practical 7: Authentication and Middleware Pipeline**
- **Objective:** Implement secure JWT-based authentication, user registration, and protected backend routes.
- **Key Deliverables & Implementation:**
  - Designed `User` model ([User.js](file:///m:/FOR%20ME/M/COLLEGE%20WORK/5th%20SEMESTER/WDF-ADVANCED/Portfolio/task-manager-api/models/User.js)) for user credentials.
  - Hashed user passwords securely using `bcryptjs` with salt factor 10.
  - Built `/register` and `/login` endpoints returning signed 1-hour JWT tokens.
  - Built protected `/me` profile route and protected all `/tasks` CRUD operations with custom [auth.js](file:///m:/FOR%20ME/M/COLLEGE%20WORK/5th%20SEMESTER/WDF-ADVANCED/Portfolio/task-manager-api/middleware/auth.js) middleware.
  - Created server-side input validation middleware ([validateInput.js](file:///m:/FOR%20ME/M/COLLEGE%20WORK/5th%20SEMESTER/WDF-ADVANCED/Portfolio/task-manager-api/middleware/validateInput.js)).

---

## 🌐 **API Endpoints Reference Table**

### 🔑 Authentication Routes
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user (hashes password with `bcryptjs`) | Public |
| `POST` | `/login` | Authenticate credentials & return JWT token | Public |
| `GET` | `/me` | Get currently logged-in user profile | Protected (JWT) |

### 📋 Task Management Routes
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Fetch all tasks from MongoDB | Protected (JWT) |
| `GET` | `/tasks/:id` | Fetch single task by MongoDB ID | Protected (JWT) |
| `POST` | `/tasks` | Create a new task entry | Protected (JWT) |
| `PUT` | `/tasks/:id` | Update an existing task | Protected (JWT) |
| `DELETE` | `/tasks/:id` | Delete a task by ID | Protected (JWT) |

---

## 🚀 **How to Run the Application Locally**

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB instance (Local MongoDB server or MongoDB Atlas)

---

### 1️⃣ **Backend Setup (`task-manager-api`)**
```bash
cd Portfolio/task-manager-api

# Install dependencies
npm install

# Create environment configuration file
cp .env.example .env

# Configure your .env file with your local MongoDB URI & JWT Secret:
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/TASKDB
# JWT_SECRET=supersecretkey_awf_5th_sem_2026

# Start the Express backend server
npm start
```
*Backend runs on `http://localhost:5000`*

---

### 2️⃣ **Frontend Setup (`student-portfolio`)**
```bash
cd Portfolio/student-portfolio

# Install dependencies
npm install

# Start Vite local development server
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

### ✉️ **Submission Details**
Submitted by **Meet Ghori (24CE034)** for Advanced Web Development Frameworks (ITUE301) Evaluation.
