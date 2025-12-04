/* ================================
   CART SYSTEM
   ================================ */
carcount = document.getElementById("cart-count");
// Load cart from localStorage
function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update number in navbar (if exists)
function updateCartCount() {
  const cart = loadCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCountEl = document.querySelector(".cart-count");
  if (cartCountEl) cartCountEl.textContent = count;
}

// Add product to cart
function addToCart(product) {
  let cart = loadCart();

  const exists = cart.find(item => item.id === product.id);

  if (exists) {
    exists.quantity++;
    carcount.textContent = parseInt(carcount.textContent) + 1;
    
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

/* ================================
   TOAST MESSAGE (notification)
   ================================ */
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ================================
   RENDER CART PAGE
   ================================ */

function renderCartPage() {
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");

  if (!cartContainer || !totalContainer) return; // Only run in cart.html

  let cart = loadCart();

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty">Your cart is empty</p>`;
    totalContainer.textContent = "$0.00";
    cartcount.textContent = "0";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p class="price">$${item.price.toFixed(2)}</p>

        <div class="quantity-controls">
          <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>

        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  updateTotal();
}

/* ================================
   CART ACTIONS
   ================================ */

function changeQuantity(id, amount) {
  let cart = loadCart();

  const product = cart.find(item => item.id === id);
  if (!product) return;

  product.quantity += amount;

  if (product.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart(cart);
  updateCartCount();
  renderCartPage();
}

function removeFromCart(id) {
  let cart = loadCart().filter(item => item.id !== id);

  saveCart(cart);
  updateCartCount();
  renderCartPage();
  showToast("Item removed");
}

function updateTotal() {
  const totalContainer = document.getElementById("cart-total");
  const cart = loadCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  totalContainer.textContent = "$" + total.toFixed(2);
}

/* ================================
   INIT ON PAGE LOAD
   ================================ */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartPage();
});
