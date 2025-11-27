const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

fetch('data/games.json')
  .then(res => res.json())
  .then(data => {
    const game = data.find(g => g.id == gameId);
    if (game) {
      document.getElementById('gameTitle').textContent = game.name;
      document.getElementById('gameImage').src = game.image;
      document.getElementById('gameImage').alt = game.name;
      document.getElementById('gameDescription').textContent = game.description;
      document.getElementById('gamePlatform').textContent = game.platform;
      document.getElementById('gameGenre').textContent = game.genre;
      document.getElementById('gameYear').textContent = game.releaseYear;
      document.getElementById('gameDeveloper').textContent = game.developer;
      document.getElementById('gameRating').textContent = game.rating;
      document.getElementById('gamePrice').textContent = game.price;
      document.getElementById('gameTrailer').href = game.trailer;
    } else {
      document.body.innerHTML = '<p>Juego no encontrado</p>';
    }
  });
