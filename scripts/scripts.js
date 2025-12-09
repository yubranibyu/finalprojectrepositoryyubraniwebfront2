// scripts.js
// Render game cards dynamically


// === Hero Slider Logic ===
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".slider-dots");

// Create dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  if (index === 0) dot.classList.add("active-dot");
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".slider-dots span");

function updateSlider() {
  const slider = document.querySelector(".slides-container");
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[currentSlide].classList.add("active-dot");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}

function goToSlide(n) {
  currentSlide = n;
  updateSlider();
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);
