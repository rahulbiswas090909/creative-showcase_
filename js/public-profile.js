// Public profile page functionality

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function loadPublicProfile() {
    const username = getUrlParameter('user');

    if (!username) {
        document.querySelector('.public-profile-container').innerHTML = 
            '<p style="text-align: center; margin-top: 2rem;">User not found.</p>';
        return;
    }

    // Find user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username);

    if (!user) {
        document.querySelector('.public-profile-container').innerHTML = 
            '<p style="text-align: center; margin-top: 2rem;">User not found.</p>';
        return;
    }

    // Display username
    document.getElementById('profileUsername').textContent = user.username;

    // Display stats
    const imageCount = user.images ? user.images.length : 0;
    document.getElementById('profileStats').textContent = `${imageCount} artwork${imageCount !== 1 ? 's' : ''}`;

    // Display images
    const gallery = document.getElementById('userGallery');

    if (!user.images || user.images.length === 0) {
        gallery.innerHTML = '<p style="text-align: center; color: #718096;">No artworks to display.</p>';
        return;
    }

    gallery.innerHTML = '';

    user.images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'masonry-item';
        item.innerHTML = `
            <img src="${image.url}" alt="${image.title}" loading="lazy">
            <div class="image-overlay">
                <h3>${image.title}</h3>
                <p>${image.description || ''}</p>
            </div>
        `;
        gallery.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', loadPublicProfile);