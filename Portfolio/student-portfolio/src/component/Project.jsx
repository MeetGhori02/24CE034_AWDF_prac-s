import React, { useState, useEffect } from "react";
import {
    registerUser,
    loginUser,
    getMeProfile,
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../services/api";

function Project() {
    // Mode toggle: 'tasks' (Practical 6/7) or 'github' (Practical 3)
    const [activeTab, setActiveTab] = useState("tasks");

    // ==========================================
    // PRACTICAL 7: USER AUTHENTICATION STATE
    // ==========================================
    const [token, setToken] = useState(localStorage.getItem("jwt_token") || "");
    const [user, setUser] = useState(null);
    const [authMode, setAuthMode] = useState("login"); // 'login' or 'register'

    // Auth Form State
    const [authName, setAuthName] = useState("");
    const [authEmail, setAuthEmail] = useState("");
    const [authPassword, setAuthPassword] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const [authSuccess, setAuthSuccess] = useState("");

    // Verify token on mount or token change
    useEffect(() => {
        if (token) {
            getMeProfile(token)
                .then((profile) => {
                    setUser(profile);
                    localStorage.setItem("jwt_token", token);
                })
                .catch(() => {
                    // Invalid or expired token
                    setToken("");
                    setUser(null);
                    localStorage.removeItem("jwt_token");
                });
        } else {
            setUser(null);
            localStorage.removeItem("jwt_token");
        }
    }, [token]);

    // Handle Register
    const handleRegister = async (e) => {
        e.preventDefault();
        setAuthError("");
        setAuthSuccess("");
        setAuthLoading(true);

        try {
            const res = await registerUser({
                name: authName,
                email: authEmail,
                password: authPassword
            });
            setAuthSuccess("Account created successfully! Please log in below.");
            setAuthMode("login");
            setAuthPassword("");
        } catch (err) {
            setAuthError(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError("");
        setAuthSuccess("");
        setAuthLoading(true);

        try {
            const res = await loginUser({
                email: authEmail,
                password: authPassword
            });
            setToken(res.token);
            setUser(res.user);
            setAuthSuccess(`Welcome back, ${res.user.name}!`);
        } catch (err) {
            setAuthError(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    // Handle Logout
    const handleLogout = () => {
        setToken("");
        setUser(null);
        setTasks([]);
        localStorage.removeItem("jwt_token");
        setAuthSuccess("Logged out successfully.");
    };


    // ==========================================
    // PRACTICAL 7: PROTECTED TASKS STATE & HANDLERS
    // ==========================================
    const [tasks, setTasks] = useState([]);
    const [tasksLoading, setTasksLoading] = useState(false);
    const [tasksError, setTasksError] = useState(null);

    // Form inputs for creating a new task
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    // Fetch tasks using JWT token
    const fetchTasks = async () => {
        if (!token) return;
        setTasksLoading(true);
        setTasksError(null);
        try {
            const data = await getTasks(token);
            setTasks(data);
        } catch (err) {
            setTasksError(err.message || "Failed to fetch protected tasks.");
        } finally {
            setTasksLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchTasks();
        }
    }, [token]);

    // Create Task Handler (Protected POST /tasks)
    const handleCreateTask = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!title.trim()) {
            setFormError("Task title is required.");
            return;
        }

        setSubmitting(true);
        try {
            const newTask = await createTask(
                { title: title.trim(), description: description.trim(), priority },
                token
            );
            setTasks([newTask, ...tasks]);
            setTitle("");
            setDescription("");
            setPriority("medium");
        } catch (err) {
            setFormError(err.message || "Error creating task.");
        } finally {
            setSubmitting(false);
        }
    };

    // Toggle Task Complete Status (Protected PUT /tasks/:id)
    const handleToggleComplete = async (id, currentStatus) => {
        try {
            const updated = await updateTask(id, { completed: !currentStatus }, token);
            setTasks(tasks.map(t => (t._id === id ? updated : t)));
        } catch (err) {
            alert(`Failed to update task: ${err.message}`);
        }
    };

    // Delete Task Handler (Protected DELETE /tasks/:id)
    const handleDeleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await deleteTask(id, token);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (err) {
            alert(`Failed to delete task: ${err.message}`);
        }
    };


    // ==========================================
    // PRACTICAL 3: GITHUB REPOSITORIES STATE
    // ==========================================
    const [repos, setRepos] = useState([]);
    const [reposLoading, setReposLoading] = useState(false);
    const [reposError, setReposError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const username = "MeetGhori02";

    const fetchRepos = () => {
        setReposLoading(true);
        setReposError(null);
        fetch(`https://api.github.com/users/${username}/repos`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
                return res.json();
            })
            .then((data) => setRepos(data))
            .catch((err) => setReposError(err.message || "Error fetching GitHub repos"))
            .finally(() => setReposLoading(false));
    };

    useEffect(() => {
        if (activeTab === "github" && repos.length === 0) {
            fetchRepos();
        }
    }, [activeTab]);

    const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="project-container">
            <h2>Projects & Task Hub</h2>

            {/* Navigation Tabs */}
            <div className="tab-navigation">
                <button
                    className={`tab-btn ${activeTab === "tasks" ? "active" : ""}`}
                    onClick={() => setActiveTab("tasks")}
                >
                    🔒 Practical 7: JWT Auth & Protected Tasks
                </button>
                <button
                    className={`tab-btn ${activeTab === "github" ? "active" : ""}`}
                    onClick={() => setActiveTab("github")}
                >
                    🐙 Practical 3: GitHub Projects API
                </button>
            </div>

            {/* TAB 1: PRACTICAL 7 JWT AUTHENTICATION & PROTECTED TASKS */}
            {activeTab === "tasks" && (
                <div className="task-manager-section">
                    <h3>Practical 7: Authentication & Middleware Pipeline</h3>

                    {/* AUTHENTICATION SECTION */}
                    <div className="auth-box">
                        {!user ? (
                            <>
                                <div className="auth-toggle">
                                    <button
                                        className={`auth-tab ${authMode === "login" ? "active" : ""}`}
                                        onClick={() => setAuthMode("login")}
                                    >
                                        🔑 Login
                                    </button>
                                    <button
                                        className={`auth-tab ${authMode === "register" ? "active" : ""}`}
                                        onClick={() => setAuthMode("register")}
                                    >
                                        📝 Register
                                    </button>
                                </div>

                                {authError && <div className="form-error-msg">⚠️ {authError}</div>}
                                {authSuccess && <div className="form-success-msg">✅ {authSuccess}</div>}

                                <form onSubmit={authMode === "login" ? handleLogin : handleRegister} className="auth-form">
                                    {authMode === "register" && (
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                value={authName}
                                                onChange={(e) => setAuthName(e.target.value)}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={authEmail}
                                            onChange={(e) => setAuthEmail(e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Password (min 6 chars)"
                                            value={authPassword}
                                            onChange={(e) => setAuthPassword(e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="auth-btn" disabled={authLoading}>
                                        {authLoading ? "Processing..." : authMode === "login" ? "Login" : "Register"}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="user-profile-box">
                                <div className="user-header">
                                    <div className="user-avatar">👤</div>
                                    <div>
                                        <h4>Logged in as: {user.name}</h4>
                                        <p className="user-email">✉️ {user.email}</p>
                                    </div>
                                    <button className="logout-btn" onClick={handleLogout}>
                                        🚪 Logout
                                    </button>
                                </div>

                                <div className="jwt-token-display">
                                    <strong>Active JWT Token (Bearer Header):</strong>
                                    <code className="token-code">{token.substring(0, 45)}...</code>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* TASK MANAGER SECTION */}
                    {!token ? (
                        <div className="unauthorized-warning">
                            <div className="warning-icon">🔒</div>
                            <h4>401 Unauthorized: Protected Routes</h4>
                            <p>
                                All <code>/tasks</code> endpoints are protected by Express <code>authMiddleware</code>.
                                You must <strong>Register or Login</strong> above to receive a signed JWT token and access task operations.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Task Creation Form */}
                            <form className="task-form" onSubmit={handleCreateTask}>
                                <h4>Create Protected Task</h4>
                                {formError && <div className="form-error-msg">⚠️ {formError}</div>}
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Task Title *"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Description (Optional)"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group row">
                                    <label>Priority: </label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    <button type="submit" className="submit-btn" disabled={submitting}>
                                        {submitting ? "Adding..." : "➕ Add Task"}
                                    </button>
                                </div>
                            </form>

                            {/* Task List */}
                            <div className="task-list-container">
                                <h4>Your Tasks ({tasks.length})</h4>

                                {tasksLoading && (
                                    <div className="spinner-container">
                                        <div className="spinner"></div>
                                        <p>Fetching JWT Protected Tasks...</p>
                                    </div>
                                )}

                                {tasksError && (
                                    <div className="error-container">
                                        <div className="error-icon">⚠️</div>
                                        <h3>Task Retrieval Error</h3>
                                        <p className="error-text">{tasksError}</p>
                                        <button className="retry-btn" onClick={fetchTasks}>
                                            🔄 Retry
                                        </button>
                                    </div>
                                )}

                                {!tasksLoading && !tasksError && tasks.length === 0 && (
                                    <p className="no-tasks-msg">No tasks found. Add a new task above!</p>
                                )}

                                {!tasksLoading && !tasksError && tasks.length > 0 && (
                                    <ul className="task-card-list">
                                        {tasks.map((task) => (
                                            <li key={task._id} className={`task-card ${task.completed ? "completed" : ""}`}>
                                                <div className="task-card-header">
                                                    <span className={`priority-badge ${task.priority}`}>
                                                        {task.priority.toUpperCase()}
                                                    </span>
                                                    <span className="task-date">
                                                        {new Date(task.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <h4 className="task-title">{task.title}</h4>
                                                {task.description && <p className="task-desc">{task.description}</p>}
                                                <div className="task-actions">
                                                    <button
                                                        className={`toggle-btn ${task.completed ? "done" : "pending"}`}
                                                        onClick={() => handleToggleComplete(task._id, task.completed)}
                                                    >
                                                        {task.completed ? "✅ Completed" : "⏳ Mark Complete"}
                                                    </button>
                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => handleDeleteTask(task._id)}
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* TAB 2: PRACTICAL 3 GITHUB REPOSITORIES */}
            {activeTab === "github" && (
                <div className="github-section">
                    <h3>GitHub Repositories (Practical 3 REST API Integration)</h3>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />

                    {reposLoading && (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                            <p>Loading GitHub Repositories...</p>
                        </div>
                    )}

                    {reposError && (
                        <div className="error-container">
                            <div className="error-icon">⚠️</div>
                            <h3>Failed to Load Repositories</h3>
                            <p className="error-text">{reposError}</p>
                            <button className="retry-btn" onClick={fetchRepos}>
                                🔄 Try Again
                            </button>
                        </div>
                    )}

                    {!reposLoading && !reposError && (
                        <>
                            <p className="repo-count">Showing {filteredRepos.length} projects</p>
                            <ul className="project-list">
                                {filteredRepos.map((repo) => (
                                    <li key={repo.id} className="project-item">
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <h3>{repo.name}</h3>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Project;
