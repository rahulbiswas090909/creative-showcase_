// Simulated data for landing page gallery
const sampleImages = [
    { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400', title: 'Abstract Art', author: 'artist1' },
    { url: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400', title: 'Digital Dreams', author: 'artist2' },
    { url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400', title: 'Color Splash', author: 'artist3' },
    { url: 'https://images.unsplash.com/photo-1549277513-f1b32fe1f8f5?w=400', title: 'Modern Vision', author: 'artist1' },
    { url: 'https://images.unsplash.com/photo-1578926219280-2e31c85d0f05?w=400', title: 'Artistic Flow', author: 'artist4' },
    { url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400', title: 'Creative Mind', author: 'artist2' },
    { url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400', title: 'Imagination', author: 'artist3' },
    { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400', title: 'Vibrant World', author: 'artist5' },
    { url: 'https://images.unsplash.com/photo-1541960071727-c531398e7494?w=400', title: 'Paint Story', author: 'artist4' },
    { url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400', title: 'Art Nouveau', author: 'artist1' },
    { url: 'https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=400', title: 'Expression', author: 'artist5' },
    { url: 'https://images.unsplash.com/photo-1545898679-1d7a7701548f?w=400', title: 'Creative Burst', author: 'artist2' }
];

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function loadGallery() {
    const gallery = document.getElementById('masonryGallery');
    const images = shuffleArray(sampleImages);

    gallery.innerHTML = '';

    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'masonry-item';
        item.innerHTML = `
            <img src="${image.url}" alt="${image.title}" loading="lazy">
            <div class="image-overlay">
                <h3>${image.title}</h3>
                <p>by ${image.author}</p>
            </div>
        `;
        item.onclick = () => {
            window.location.href = `public-profile.html?user=${image.author}`;
        };
        gallery.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', loadGallery);