const board = document.querySelector(".game-board");
const restartBtn = document.getElementById("restartBtn");

let cardsArray = ["🍎","🍌","🍇","🍊","🍉","🍒","🥝","🍍"];
let gameGrid = [...cardsArray, ...cardsArray]; // duplicate for pairs
let firstCard, secondCard;
let lockBoard = false;

// Shuffle cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = "";
  shuffle(gameGrid);
  gameGrid.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = emoji;
    card.innerHTML = emoji;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart button
restartBtn.addEventListener("click", () => {
  shuffle(gameGrid);
  createBoard();
});

createBoard();
