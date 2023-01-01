let isDarkMode = false;

document.addEventListener('DOMContentLoaded', () => {


  document.querySelector('#mode-toggle').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.querySelector('body').style.backgroundColor = '#222222';
      document.querySelector('body').style.color = '#999999';
      document.querySelector('#mode-toggle').classList.remove('btn-light');
      document.querySelector('#mode-toggle').classList.add('btn-dark');
    } else {
      document.querySelector('body').style.backgroundColor = '#ffffff';
      document.querySelector('body').style.color = '#222222';
      document.querySelector('#mode-toggle').classList.remove('btn-dark');
      document.querySelector('#mode-toggle').classList.add('btn-light');
    }
  });
});


// Add an event listener to the search button
document.querySelector('button[type="submit"]').addEventListener('click', function (event) {
  // Prevent the form from being submitted and refreshing the page
  event.preventDefault();

  // Get the value of the repository search input
  const repoSearch = document.querySelector('#repo-search').value;
  // Get the selected language filter
  const languageFilter = document.querySelector('#language-filter').value;

  // Show the loading spinner
  document.querySelector('#loading-spinner').style.display = 'flex';

  // Use the GitHub API to search for repositories
  fetch(`https://api.github.com/search/repositories?q=${repoSearch}+language:${languageFilter}`)
    .then(response => response.json())
    .then(data => {
      // Hide the loading spinner
      document.querySelector('#loading-spinner').style.display = 'none';

      // Clear the card container
      document.querySelector('#card-container').innerHTML = '';

      // Add a card for each repository
      data.items.forEach((repo, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title"><a href="${repo.html_url}" target="_blank">${repo.full_name}</a></h5>
            <p class="card-text">${repo.description}</p>
            <p class="card-text"><strong>Language:</strong> ${repo.language}</p>
            <!-- Display the stars count as an icon -->
            <p class="card-text"><strong> </strong> <i class="fas fa-star"></i> ${repo.stargazers_count}</p>
            <!-- Display the forks count as an icon -->
            <p class="card-text"><strong> </strong> <i class="fas fa-code-branch"></i> ${repo.forks_count}</p>
          </div>
        `;
        document.querySelector('#card-container').appendChild(card);
      });

    });
});

// Add an event listener to the card size toggle button
document.querySelector('#card-size-toggle').addEventListener('click', function (event) {
  // Toggle the 'card-large' class on the card elements
  document.querySelectorAll('.card').forEach(card => {
    card.classList.toggle('card-large');
  });
});

// Add an event listener to the filter toggle button
document.querySelector('#filter-toggle').addEventListener('click', function (event) {
  // Toggle the 'd-none' class on the language filter element
  document.querySelector('#language-filter').classList.toggle('d-flex');
  document.querySelector('#language-text').classList.toggle('d-flex');
});





