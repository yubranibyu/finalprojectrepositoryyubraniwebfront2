const gameListEl = document.getElementById('gameList');
const searchInput = document.getElementById('searchInput');
const platformFilter = document.getElementById('platformFilter');

let games = [];

// Cargar datos desde JSON
fetch('data/games.json')
  .then(res => res.json())
  .then(data => {
    games = data;
    renderGames(games);
  });

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

// Filtrar y buscar
searchInput.addEventListener('input', () => filterGames());
platformFilter.addEventListener('change', () => filterGames());

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
