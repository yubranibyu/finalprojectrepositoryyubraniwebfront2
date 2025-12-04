// scripts.js
const gameListEl = document.getElementById('gameList');
const searchInput = document.getElementById('searchInput');
const platformFilter = document.getElementById('platformFilter');

let games = [];

// Read platform parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const platformFromURL = urlParams.get("platform");

// Load JSON
fetch('data/games.json')
  .then(res => res.json())
  .then(data => {
    games = data;

    // If URL includes ?platform=XYZ → auto filter WITHOUT using the select
    if (platformFromURL) {
      const filtered = games.filter(g => g.platform === platformFromURL);
      renderGames(filtered);
      return; // avoid rendering all games
    }

    // Default render
    renderGames(games);
  });

// Render Cards
function renderGames(list) {
  gameListEl.innerHTML = '';

  list.forEach(game => {
    const card = document.createElement('div');
    card.classList.add('game-card');
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <p>${game.platform}</p>
      <a href="game-detail.html?id=${game.id}">Ver detalle</a>
    `;
    gameListEl.appendChild(card);
  });
}

// Search + Filter Events
searchInput.addEventListener('input', filterGames);
platformFilter.addEventListener('change', filterGames);

// Manual Search + Dropdown Filter
function filterGames() {
  const searchText = searchInput.value.toLowerCase();
  const platform = platformFilter.value;

  const filtered = games.filter(game => {
    return (
      game.name.toLowerCase().includes(searchText) &&
      (platform === '' || game.platform === platform)
    );
  });

  renderGames(filtered);
}
