const BASE_URL = 'http://localhost:5000';

// Helper function to attach Authorization header if token exists
const getAuthHeaders = (token) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

// ==========================================
// AUTHENTICATION API CALLS
// ==========================================

// Register User
export const registerUser = async (userData) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || data.details?.join(', ') || 'Registration failed');
    }
    return data;
};

// Login User
export const loginUser = async (credentials) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || data.details?.join(', ') || 'Login failed');
    }
    return data;
};

// Get Currently Logged-in User Profile (GET /me)
export const getMeProfile = async (token) => {
    const res = await fetch(`${BASE_URL}/me`, {
        method: 'GET',
        headers: getAuthHeaders(token)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to fetch user profile');
    }
    return data.user;
};

// ==========================================
// PROTECTED TASK API CALLS (JWT Token Required)
// ==========================================

// Fetch all tasks
export const getTasks = async (token) => {
    const res = await fetch(`${BASE_URL}/tasks`, {
        method: 'GET',
        headers: getAuthHeaders(token)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || data.error || `HTTP error! Status: ${res.status}`);
    }
    return data;
};

// Create a new task
export const createTask = async (taskData, token) => {
    const res = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(taskData)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || data.error || data.details?.join(', ') || `HTTP error! Status: ${res.status}`);
    }
    return data;
};

// Update an existing task
export const updateTask = async (id, taskData, token) => {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(taskData)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || data.error || `HTTP error! Status: ${res.status}`);
    }
    return data;
};

// Delete a task by ID
export const deleteTask = async (id, token) => {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || data.error || `HTTP error! Status: ${res.status}`);
    }
    return data;
};
