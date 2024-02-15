var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});
const BASE_URL = 'https://dummyapi.io/data/v1';
const API_KEY = '65cb394056458ec3e87c58b3';

function formatDate(dateTimeString) {
    const dt = luxon.DateTime.fromISO(dateTimeString);
    return dt.toFormat('dd-MM-yyyy HH:mm');
}

async function fetchPostDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        if (!postId) throw new Error('Post ID not provided.');

        const response = await axios.get(`${BASE_URL}/post/${postId}`, {
            headers: { 'app-id': API_KEY }
        });
        const post = response.data;
        const postDetailsContainer = document.getElementById('postDetails');
        const image = post.image ? `<img src="${post.image}" class="w-full h-auto mb-4" alt="Post Image">` : '';
        const firstTag = post.tags.length > 0 ? post.tags[0] : '';
        postDetailsContainer.innerHTML = `
                    ${image}
                    <h2 class="text-xl font-semibold mb-2 tracking-tight text-gray-900 dark:text-white">${post.text}</h2>
                    <p class="text-sm text-gray-500">Published by ${post.owner.firstName} ${post.owner.lastName} on ${formatDate(post.publishDate)}</p>
                    <p class="text-sm text-gray-500">Likes: ${post.likes}</p>
                    <p class="text-sm text-gray-500">Tags: ${firstTag}</p>
                    <div>
                        <a href="./index.html" class="inline-flex items-center  font-medium text-left text-white  ">
                            Main page
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                        
                    </div>
                `;
    } catch (error) {
        console.error('Error fetching post details:', error);
    }
}

fetchPostDetails();
