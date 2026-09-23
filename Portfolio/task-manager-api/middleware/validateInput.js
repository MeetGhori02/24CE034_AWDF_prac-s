// Validate Registration Input
const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = [];

    if (!name || name.trim() === '') {
        errors.push('Name is required');
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        errors.push('A valid email address is required');
    }
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: 'Input Validation Failed', details: errors });
    }
    next();
};

// Validate Login Input
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (!email || email.trim() === '') {
        errors.push('Email is required');
    }
    if (!password || password.trim() === '') {
        errors.push('Password is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: 'Input Validation Failed', details: errors });
    }
    next();
};

// Validate Task Input
const validateTask = (req, res, next) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            error: 'Input Validation Failed',
            details: ['Task title is required and must be a non-empty string']
        });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateTask
};
