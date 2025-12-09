// scripts.js
const gameListEl = document.getElementById('gameList');
const searchInput = document.getElementById('searchInput');
const platformFilter = document.getElementById('platformFilter');

// UPCOMING container
const upcomingContainer = document.getElementById("upcomingGames");

let games = [];

// Read platform parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const platformFromURL = urlParams.get("platform");

// Load JSON
fetch('data/games.json')
  .then(res => res.json())
  .then(data => {
    games = data;

    // Render Upcoming Games FIRST
    renderUpcomingGames(games);
    renderSpecialOffers(games);
    // If URL includes ?platform=XYZ → auto filter
    if (platformFromURL) {
      const filtered = games.filter(g => g.platform === platformFromURL);
      renderGames(filtered);
      return;
    }

    // Default render
    renderGames(games);
  });

/* ============================
      RENDER MAIN GAME LIST
   ============================ */
function renderGames(list) {
  gameListEl.innerHTML = '';

  list.forEach(game => {
    const card = document.createElement('div');
    card.classList.add('game-card');

    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <p>${game.platform}</p>
      <a href="game-detail.html?id=${game.id}">See details</a>
    `;

    gameListEl.appendChild(card);
  });
}

/* ============================
      RENDER UPCOMING GAMES
   ============================ */
function renderUpcomingGames(list) {
  if (!upcomingContainer) return;

  // Filter only games with upcoming: true
  const upcomingList = list.filter(game => game.upcoming === true);

  upcomingContainer.innerHTML = "";

  upcomingList.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("upcoming-game-card");

    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <p><strong>Platform:</strong> ${game.platform}</p>
      <p><strong>Genre:</strong> ${game.genre}</p>
      <p><strong>Price:</strong> $${game.price}</p>
      <p><a href="game-detail.html?id=${game.id}">See details</a></p>
    `;

    upcomingContainer.appendChild(card);
  });

  console.log("Upcoming rendered:", upcomingList);
}

function renderSpecialOffers(gamesList) {
  const container = document.getElementById("specialOffers");
  if (!container) return;

  container.innerHTML = "";

  // Filter games on offer
  const offerGames = gamesList.filter(game => game.offer === true);

  offerGames.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("offer-card");

    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <p class="price">$${game.price}</p>
      <a class="details-btn" href="game-detail.html?id=${game.id}">See details</a>
    `;

    container.appendChild(card);
  });
}



/* ============================
      SEARCH + FILTER
   ============================ */
searchInput.addEventListener('input', filterGames);
platformFilter.addEventListener('change', filterGames);

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
