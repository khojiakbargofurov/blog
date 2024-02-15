const BASE_URL = 'https://dummyapi.io/data/v1';
const API_KEY = '65cb394056458ec3e87c58b3';

// Function to format date using Luxon
function formatDate(dateTimeString) {
    const dt = luxon.DateTime.fromISO(dateTimeString);
    return dt.toFormat('dd-MM-yyyy HH:mm');
}

// Async function to fetch post details
async function fetchPostDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        if (!postId) throw new Error('Post ID not provided.');

        // Fetch post details using Axios
        const response = await axios.get(`${BASE_URL}/post/${postId}`, {
            headers: { 'app-id': API_KEY }
        });
        const post = response.data;
        
        // Render post details on the webpage
        const postDetailsContainer = document.getElementById('postDetails');
        const image = post.image ? `<img src="${post.image}" class="w-full h-auto mb-4" alt="Post Image">` : '';
        postDetailsContainer.innerHTML = `
            ${image}
            <h2 class="text-xl font-semibold mb-2">${post.text}</h2>
            <p class="text-sm text-gray-500">Published by ${post.owner.firstName} ${post.owner.lastName} on ${formatDate(post.publishDate)}</p>
            <p class="text-sm text-gray-500">Likes: ${post.likes}</p>
            <p class="text-sm text-gray-500">Tags: ${post.tags[0]}</p>
        `;
    } catch (error) {
        console.error('Error fetching post details:', error);
    }
}

fetchPostDetails();
