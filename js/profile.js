// User profile page functionality

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(currentUser);
}

function logout() {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
}

function uploadImage(event) {
    event.preventDefault();

    const user = checkAuth();
    if (!user) return;

    const title = document.getElementById('imageTitle').value;
    const description = document.getElementById('imageDescription').value;
    const fileInput = document.getElementById('imageFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image!');
        return;
    }

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = function(e) {
        const newImage = {
            id: Date.now().toString(),
            title,
            description,
            url: e.target.result,
            uploadDate: new Date().toISOString()
        };

        // Update user's images
        user.images = user.images || [];
        user.images.unshift(newImage);

        // Update in users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(user));
        }

        alert('Image uploaded successfully!');
        document.getElementById('uploadForm').reset();
        loadMyImages();
    };

    reader.readAsDataURL(file);
}

function loadMyImages() {
    const user = checkAuth();
    if (!user) return;

    const grid = document.getElementById('myImagesGrid');

    if (!user.images || user.images.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #718096;">No images uploaded yet.</p>';
        return;
    }

    grid.innerHTML = '';

    user.images.forEach(image => {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.innerHTML = `
            <img src="${image.url}" alt="${image.title}">
            <div class="image-info">
                <h3>${image.title}</h3>
                <p>${image.description || 'No description'}</p>
                <small>${new Date(image.uploadDate).toLocaleDateString()}</small>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const user = checkAuth();
    if (!user) return;

    // Display username
    document.getElementById('usernameDisplay').textContent = user.username;

    // Setup logout button
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Setup upload form
    document.getElementById('uploadForm').addEventListener('submit', uploadImage);

    // Load user's images
    loadMyImages();
});