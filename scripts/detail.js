// Read the ID from URL
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");

const API_KEY = "36ae18086bef47499d8e36410b412bcc";

async function loadGameDetails() {
  try {
    const url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`;
    const res = await fetch(url);
    const game = await res.json();

    const container = document.getElementById("game-detail-container");

    // If RAWG returns an error
    if (game.detail === "Not found.") {
      container.innerHTML = `<p>Game not found.</p>`;
      return;
    }

    // Extract clean fields
    const image = game.background_image;
    const name = game.name;
    const price = (Math.random() * 60 + 10).toFixed(2); // random price like in catalog

    const platform = game.platforms
      ?.map(p => p.platform.name)
      .join(", ") || "Unknown";

    const genre = game.genres?.[0]?.name || "Unknown";

    const description = game.description_raw || "No description available.";

    const trailer = game.clip?.clip;

    // Render detail
    container.innerHTML = `
      <div class="detail-wrapper">
        
        <img src="${image}" alt="${name}" class="detail-img">

        <h2>${name}</h2>

        <p><strong>Platform:</strong> ${platform}</p>
        <p><strong>Genre:</strong> ${genre}</p>
        <p><strong>Release:</strong> ${game.released || "Unknown"}</p>
        <p><strong>Rating:</strong> ${game.rating || "N/A"} / 5</p>
        <p><strong>Price:</strong> $${price}</p>

        <p class="description">${description}</p>

        ${
          trailer
            ? `<a class="trailer-btn" href="${trailer}" target="_blank">Watch Trailer</a>`
            : ""
        }

        <button class="add-cart-btn"
          onclick='addToCart({
            id: ${game.id},
            name: "${name}",
            price: ${price},
            image: "${image}"
          })'
        >
          Add to Cart
        </button>
      </div>
    `;
  } catch (err) {
    console.error("Error loading game:", err);
    document.getElementById("game-detail-container").innerHTML =
      "<p>Error loading game.</p>";
  }
}

loadGameDetails();
