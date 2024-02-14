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


async function fetchData() {
  const url = 'https://dummyapi.io/data/v1/post';
  const headers = {
      'app-id': '65cb394056458ec3e87c58b3'
  };

  try {
      const response = await fetch(url, { headers });
      const data = await response.json();
      console.log(data);
      const cardsContainer = document.querySelector('.cards');
      const loader = document.getElementById('loader');
      loader.classList.add('hidden');

      data.data.forEach(element => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                      <img class=" img rounded-t-lg" src="${element.image}" alt="" />
                  </a>
                  <div class="p-5">
                      <a href="#">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${element.text}</h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${element.owner.firstName} ${element.owner.lastName}</p>
                      <a href="./details.html" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Read more
                          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                          </svg>
                      </a>
                      <button type="button" class="btn-delete btn py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Delete</button>
                  </div>
              </div>
          `;
          cardsContainer.appendChild(card);
      });

      const deleteButtons = document.querySelectorAll('.btn-delete');
      deleteButtons.forEach(button => {
          button.addEventListener('click', async () => {
              const card = button.closest('.card');
              const postId = card.dataset.postId; 
              card.style.display = "none";

              try {
                  const deleteResponse = await fetch(`https://dummyapi.io/data/v1/post/${element.id}`, {
                      method: 'DELETE',
                      headers: {
                          'app-id': '65cb394056458ec3e87c58b3'
                      }
                  });
                  if (deleteResponse.ok) {
                      console.log(`Post with ID ${postId} deleted successfully.`);
                  } else {
                      console.error(`Failed to delete post with ID ${postId}. Status: ${deleteResponse.status}`);
                  }
              } catch (error) {
                  console.error('Error deleting post:', error);
              }
          });
      });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

fetchData();
