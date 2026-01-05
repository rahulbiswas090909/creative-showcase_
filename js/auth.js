// Simple authentication simulation using localStorage

function signup(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.username === username || u.email === email);

    if (existingUser) {
        alert('Username or email already exists!');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password, // In production, this should be hashed
        images: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully!');
    window.location.href = 'login.html';
}

function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => 
        (u.username === username || u.email === username) && u.password === password
    );

    if (user) {
        // Store current session
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'profile.html';
    } else {
        alert('Invalid credentials!');
    }
}

// Initialize forms
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (signupForm) {
        signupForm.addEventListener('submit', signup);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
});