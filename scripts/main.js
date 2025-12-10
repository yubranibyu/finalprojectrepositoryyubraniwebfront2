// scripts.js

// ===============================
// DOM ELEMENTS
// ===============================
const gameListEl = document.getElementById('gameList');
const searchInput = document.getElementById('searchInput');
const platformFilter = document.getElementById('platformFilter');
const upcomingContainer = document.getElementById("upcomingGames");

// NUEVAS SECCIONES POR PLATAFORMA
const ps5Section = document.getElementById("ps5Games");
const xboxSection = document.getElementById("xboxGames");
const switchSection = document.getElementById("switchGames");
const pcSection = document.getElementById("pcGames");

let games = [];

// ===============================
// URL PARAM (?platform=PS5)
// ===============================
const urlParams = new URLSearchParams(window.location.search);
const platformFromURL = urlParams.get("platform");

// ===============================
const API_KEY = "36ae18086bef47499d8e36410b412bcc";


// ===============================
// PLATFORM ALIASES (CORRECCIÓN CLAVE)
// ===============================
const platformAliases = {
  "PlayStation 5": "PlayStation 5",
  "PS5": "PlayStation 5",

  "PlayStation 4": "PlayStation 4",
  "PS4": "PlayStation 4",

  "Xbox Series X": "Xbox Series X/S",
  "Xbox One": "Xbox One",
  "Xbox": "Xbox",

  "Nintendo Switch": "Nintendo Switch",
  "Switch": "Nintendo Switch",

  "PC": "PC"
};


// ===============================
// LOAD RAWG API DATA
// ===============================
async function loadGamesFromAPI() {
  try {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`;
    const res = await fetch(url);
    const rawData = await res.json();

    const apiGames = rawData.results.map(g => ({
      id: g.id,
      name: g.name,
      platform: g.platforms?.map(p => p.platform.name).join(", ") || "Unknown",
      genre: g.genres?.[0]?.name || "Unknown",
      image: g.background_image,
      price: (Math.random() * 60 + 10).toFixed(2), 
      offer: Math.random() > 0.7,
      upcoming: new Date(g.released) > new Date() 
    }));

    games = apiGames;

    // Render sections
    renderUpcomingGames(games);
    renderSpecialOffers(games);
    renderByPlatform(games);

    // ===============================
    // AUTO-FILTER CON ALIAS (FIX)
    // ===============================
    if (platformFromURL) {
      const alias = platformAliases[platformFromURL] || platformFromURL;

      const filtered = games.filter(g =>
        g.platform.toLowerCase().includes(alias.toLowerCase())
      );

      renderGames(filtered);
      return;
    }

    // Default catalog
    renderGames(games);

  } catch (err) {
    console.error("❌ Error loading RAWG API:", err);
  }
}

loadGamesFromAPI();


// ===============================
// RENDER MAIN GAME LIST
// ===============================
function renderGames(list) {
  if (!gameListEl) return;

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


// ===============================
// PLATFORM-BASED RENDERING
// ===============================
function renderByPlatform(list) {

  function renderSection(section, keyword) {
    if (!section) return;

    const filtered = list.filter(g =>
      g.platform.toLowerCase().includes(keyword.toLowerCase())
    );

    section.innerHTML = "";

    filtered.forEach(game => {
      const card = document.createElement("div");
      card.classList.add("game-card");

      card.innerHTML = `
        <img src="${game.image}" alt="${game.name}">
        <h3>${game.name}</h3>
        <p>${game.platform}</p>
        <a href="game-detail.html?id=${game.id}">See details</a>
      `;

      section.appendChild(card);
    });
  }

  // ONLY ONCE PER SECTION (FIX)
  renderSection(ps5Section, "PlayStation 5");
  renderSection(xboxSection, "Xbox");
  renderSection(switchSection, "Nintendo Switch");
  renderSection(pcSection, "PC");
}


// ===============================
// UPCOMING GAMES
// ===============================
function renderUpcomingGames(list) {
  if (!upcomingContainer) return;

  // Juegos que aún NO han salido
  const upcomingList = list.filter(game => {
    const releaseDate = game.released ? new Date(game.released) : null;
    const now = new Date();

    return (
      (releaseDate && releaseDate > now) || 
      game.tba === true
    );
  });

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
}


// ===============================
// SPECIAL OFFERS
// ===============================
function renderSpecialOffers(gamesList) {
  const container = document.getElementById("specialOffers");
  if (!container) return;

  container.innerHTML = "";

  const offerGames = gamesList.filter(game => game.offer);

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


// ===============================
// SEARCH + FILTER
// ===============================
searchInput?.addEventListener('input', filterGames);
platformFilter?.addEventListener('change', filterGames);

function filterGames() {
  const searchText = searchInput.value.toLowerCase();
  const platform = platformFilter.value;

  const filtered = games.filter(game => {
    return (
      game.name.toLowerCase().includes(searchText) &&
      (platform === '' || game.platform.includes(platform))
    );
  });

  renderGames(filtered);
}
