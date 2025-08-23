const slider = document.querySelector(".slider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
const totalCards = document.querySelectorAll(".card").length;
const visibleCards = 3;

function updateSlider() {
  slider.style.transform = `translateX(-${index * (100 / visibleCards)}%)`;
}

nextBtn.addEventListener("click", () => {
  if (index < totalCards - visibleCards) {
    index++;
  } else {
    index = 0; // loop back
  }
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    index = totalCards - visibleCards; // go to end
  }
  updateSlider();
});

// Auto slide every 3 sec
setInterval(() => {
  nextBtn.click();
}, 3000);
