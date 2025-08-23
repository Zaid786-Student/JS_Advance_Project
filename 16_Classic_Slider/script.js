const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let index = 0;

// Create dots dynamically
slideItems.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => moveToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateSlider() {
  slides.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function moveToSlide(i) {
  index = i;
  updateSlider();
}

function nextSlide() {
  index = (index + 1) % slideItems.length;
  updateSlider();
}

function prevSlide() {
  index = (index - 1 + slideItems.length) % slideItems.length;
  updateSlider();
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

// Auto play
setInterval(nextSlide, 4000);
