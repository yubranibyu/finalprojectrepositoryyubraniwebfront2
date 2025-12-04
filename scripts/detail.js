// Read the ID from URL
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");

// Load JSON and render detail
fetch("../data/games.json") 
  .then(res => res.json())
  .then(data => {
    // Find game by ID
    const game = data.find(g => g.id == gameId);

    const container = document.getElementById("game-detail-container");

    // If no game found
    if (!game) {
      container.innerHTML = `<p>Game not found.</p>`;
      return;
    }

    // Render detail
    container.innerHTML = `
      <div class="detail-wrapper">
        <img src="${game.image}" alt="${game.name}" class="detail-img">

        <h2>${game.name}</h2>
        <p><strong>Platform:</strong> ${game.platform}</p>
        <p><strong>Genre:</strong> ${game.genre}</p>
        <p><strong>Release Year:</strong> ${game.releaseYear}</p>
        <p><strong>Developer:</strong> ${game.developer}</p>
        <p><strong>Rating:</strong> ${game.rating}/10</p>
        <p><strong>Price:</strong> $${game.price}</p>

        <p class="description">
          ${game.description || "No description available."}
        </p>

        ${
          game.trailer
            ? `<a class="trailer-btn" href="${game.trailer}" target="_blank">Watch Trailer</a>`
            : ""
        }

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
      </div>
    `;
  })
  .catch(err => {
    console.error("Error loading game:", err);
    document.getElementById("game-detail-container").innerHTML =
      "<p>Error loading game.</p>";
  });
