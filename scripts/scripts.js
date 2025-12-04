// scripts.js
// Render game cards dynamically

function renderGames(gamesList) {
  const container = document.getElementById("games-container");

  container.innerHTML = ""; // clear previous items

  gamesList.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <p><strong>Platform:</strong> ${game.platform}</p>
      <p><strong>Genre:</strong> ${game.genre}</p>
      <p><strong>Price:</strong> $${game.price}</p>

      <button class="add-cart-btn"
        onclick='addToCart({
          id: ${game.id},
          name: "${game.name}",
          price: ${game.price},
          image: "${game.image}"
        })'
      >
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
}

