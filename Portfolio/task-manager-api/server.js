// const express = require('express');
// const app = express();

// const PORT = 5000;

// // ==========================================
// // 1. IN-MEMORY DATABASE (Temporary Storage)
// // ==========================================
// let tasks = [
//     { id: 1, title: 'Learn Express Middleware', completed: false },
//     { id: 2, title: 'Build REST API', completed: true }
// ];

// // ==========================================
// // 2. GLOBAL BUILT-IN MIDDLEWARE
// // ==========================================
// // Parses incoming JSON payloads in req.body
// app.use(express.json());

// // ==========================================
// // 3. GLOBAL REQUEST LOGGING MIDDLEWARE
// // ==========================================
// app.use((req, res, next) => {
//     const timestamp = new Date().toISOString();
//     console.log(`[${timestamp}] ${req.method} ${req.url}`);
//     next(); // Pass control to the next middleware
// });

// // ==========================================
// // 4. SUPPLEMENTARY MIDDLEWARE: Header Validation
// // ==========================================
// // Rejects POST/PUT requests missing Content-Type: application/json
// const validateContentType = (req, res, next) => {
//     if ((req.method === 'POST' || req.method === 'PUT') && !req.is('application/json')) {
//         return res.status(400).json({
//             error: 'Invalid Content-Type. Request body must be application/json'
//         });
//     }
//     next();
// };

// // Apply header validation globally to POST and PUT requests
// app.use(validateContentType);

// // ==========================================
// // 5. ROUTE-SPECIFIC MIDDLEWARE: ID Validation
// // ==========================================
// // Validates that :id parameter is a positive integer
// const validateTaskId = (req, res, next) => {
//     const taskId = parseInt(req.params.id, 10);
//     if (isNaN(taskId) || taskId <= 0) {
//         return res.status(400).json({ error: 'Invalid Task ID. Must be a positive integer.' });
//     }
//     req.parsedTaskId = taskId; // Attach parsed ID to request object
//     next();
// };

// // ==========================================
// // 6. REST API CRUD ROUTES
// // ==========================================

// // GET /tasks -> Get all tasks (200 OK)
// app.get('/tasks', (req, res) => {
//     res.status(200).json(tasks);
// });

// // POST /tasks -> Create a new task (201 Created)
// app.post('/tasks', (req, res) => {
//     const { title, completed } = req.body;

//     if (!title || typeof title !== 'string' || title.trim() === '') {
//         return res.status(400).json({ error: 'Task title is required and must be a string' });
//     }

//     const newTask = {
//         id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
//         title: title.trim(),
//         completed: typeof completed === 'boolean' ? completed : false
//     };

//     tasks.push(newTask);
//     res.status(201).json(newTask);
// });

// // PUT /tasks/:id -> Update an existing task (200 OK / 404 Not Found)
// app.put('/tasks/:id', validateTaskId, (req, res) => {
//     const taskId = req.parsedTaskId;
//     const taskIndex = tasks.findIndex(t => t.id === taskId);

//     if (taskIndex === -1) {
//         return res.status(404).json({ error: `Task with ID ${taskId} not found` });
//     }

//     const { title, completed } = req.body;

//     if (title !== undefined) {
//         if (typeof title !== 'string' || title.trim() === '') {
//             return res.status(400).json({ error: 'Title must be a non-empty string' });
//         }
//         tasks[taskIndex].title = title.trim();
//     }

//     if (completed !== undefined) {
//         if (typeof completed !== 'boolean') {
//             return res.status(400).json({ error: 'Completed must be a boolean' });
//         }
//         tasks[taskIndex].completed = completed;
//     }

//     res.status(200).json(tasks[taskIndex]);
// });

// // DELETE /tasks/:id -> Delete a task (200 OK / 404 Not Found)
// app.delete('/tasks/:id', validateTaskId, (req, res) => {
//     const taskId = req.parsedTaskId;
//     const taskIndex = tasks.findIndex(t => t.id === taskId);

//     if (taskIndex === -1) {
//         return res.status(404).json({ error: `Task with ID ${taskId} not found` });
//     }

//     const deletedTask = tasks.splice(taskIndex, 1)[0];
//     res.status(200).json({
//         message: `Task ID ${taskId} deleted successfully`,
//         deletedTask
//     });
// });

// // Demo endpoint to test global error handling
// app.get('/error-test', (req, res, next) => {
//     const error = new Error('Deliberate test error triggered!');
//     next(error); // Passes error to the global error handler
// });

// // ==========================================
// // 7. SUPPLEMENTARY: 404 HANDLER FOR UNDEFINED ROUTES
// // ==========================================
// app.use((req, res) => {
//     res.status(404).json({
//         error: 'Route Not Found',
//         path: req.originalUrl,
//         method: req.method
//     });
// });

// // ==========================================
// // 8. GLOBAL ERROR HANDLING MIDDLEWARE (Defined Last!)
// // ==========================================
// app.use((err, req, res, next) => {
//     console.error('[GLOBAL ERROR LOG]:', err.stack); // Log internally for developer
//     res.status(500).json({
//         error: 'Something went wrong on the server',
//         message: err.message
//     });
// });

// // ==========================================
// // 9. START SERVER
// // ==========================================
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Task = require('./models/Task');
const User = require('./models/User');
const authMiddleware = require('./middleware/auth');
const { validateRegister, validateLogin, validateTask } = require('./middleware/validateInput');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for cross-origin requests from React frontend
app.use(cors());

// 1. Built-in JSON Middleware
app.use(express.json());

// 2. Global Request Logger
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// 3. Header Validation Middleware
const validateContentType = (req, res, next) => {
    if ((req.method === 'POST' || req.method === 'PUT') && !req.is('application/json')) {
        return res.status(400).json({ error: 'Invalid Content-Type. Request body must be application/json' });
    }
    next();
};
app.use(validateContentType);

// 4. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// PRACTICAL 7: AUTHENTICATION ENDPOINTS
// ==========================================

// POST /register -> User Registration (Password Hashing with bcryptjs)
app.post('/register', validateRegister, async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash password with bcryptjs (salt rounds: 10)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save User
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (err) {
        next(err);
    }
});

// POST /login -> User Login (Credential Check & JWT Token Generation)
app.post('/login', validateLogin, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare password hash using bcryptjs
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Sign JSON Web Token (JWT) with 1 hour expiry
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        next(err);
    }
});

// GET /me -> Protected route: Get currently logged-in user details
app.get('/me', authMiddleware, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
});


// ==========================================
// PRACTICAL 7: PROTECTED TASK CRUD ROUTES
// ==========================================

// GET /tasks -> Get all tasks (Protected by authMiddleware)
app.get('/tasks', authMiddleware, async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
});

// GET /tasks/:id -> Get single task by ID (Protected by authMiddleware)
app.get('/tasks/:id', authMiddleware, async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: `Task with ID ${req.params.id} not found` });
        }
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
});

// POST /tasks -> Create a new task (Protected & Validated)
app.post('/tasks', authMiddleware, validateTask, async (req, res, next) => {
    try {
        const { title, description, completed, priority } = req.body;
        const newTask = await Task.create({ title, description, completed, priority });
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
});

// PUT /tasks/:id -> Update an existing task (Protected)
app.put('/tasks/:id', authMiddleware, async (req, res, next) => {
    try {
        const { title, description, completed, priority } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, completed, priority },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: `Task with ID ${req.params.id} not found` });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        next(err);
    }
});

// DELETE /tasks/:id -> Delete a task (Protected)
app.delete('/tasks/:id', authMiddleware, async (req, res, next) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: `Task with ID ${req.params.id} not found` });
        }
        res.status(200).json({
            message: `Task ID ${req.params.id} deleted successfully`,
            deletedTask
        });
    } catch (err) {
        next(err);
    }
});

// 6. 404 Handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Route Not Found',
        path: req.originalUrl,
        method: req.method
    });
});

// 7. Global Centralized Error Handler
app.use((err, req, res, next) => {
    console.error('[GLOBAL ERROR LOG]:', err.message);

    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ error: 'Validation Error', details: errors });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ error: `Invalid MongoDB ID format: ${err.value}` });
    }

    res.status(500).json({
        error: 'Something went wrong on the server',
        message: err.message
    });
});

// 8. Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
