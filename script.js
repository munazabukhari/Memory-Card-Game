const cardsArray = [
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍒",
  "🥝",
  "🍑",
  "🍉",
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍒",
  "🥝",
  "🍑",
  "🍉",
];

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");
const restartBtn = document.getElementById("restart-btn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

// 🔹 Start Game
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameContainer.style.display = "grid";
  restartBtn.style.display = "block";
  startGame();
});

// 🔹 Initialize Game
function startGame() {
  gameContainer.innerHTML = "";
  matchedCount = 0;
  const shuffled = [...cardsArray].sort(() => 0.5 - Math.random());

  shuffled.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.textContent = "?";
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  this.textContent = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchedCount += 2;
  resetBoard();

  // ✅ Check if all cards are matched
  if (matchedCount === cardsArray.length) {
    setTimeout(() => {
      showWinMessage();
    }, 500);
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard.textContent = "?";
    secondCard.textContent = "?";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// 🔹 Win Message
function showWinMessage() {
  restartBtn.style.display = "none";
  gameContainer.style.display = "flex";
  gameContainer.style.flexDirection = "column";
  gameContainer.style.alignItems = "center";
  gameContainer.style.justifyContent = "center";

  gameContainer.innerHTML = `
    <div class="win-message">
      <h2>🎉 Congratulations! You Matched All Cards 🎉</h2>
      <button id="play-again">Play Again</button>
    </div>
  `;

  const playAgainBtn = document.getElementById("play-again");
  playAgainBtn.addEventListener("click", () => {
    // Reset layout back to grid before starting new game
    gameContainer.style.display = "grid";
    gameContainer.style.gridTemplateColumns = "repeat(4, 100px)";
    gameContainer.style.gridGap = "15px";

    restartBtn.style.display = "block";

    startGame();
  });
}

// 🔹 Restart Game Button
restartBtn.addEventListener("click", startGame);
