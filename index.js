// DOM
let scoreText = document.querySelector(".game-stats .score");
let changeBgButton = document.querySelector(".bg-changer");
let gameBoard = document.querySelector(".game-board");
let player = document.querySelector(".game-board .player");
let standardWidth = gameBoard.clientWidth / 2;
let standardHeight = gameBoard.clientHeight;
let playerLeft = standardWidth;
let ball = document.querySelector(".game-board .ball");
let ballTop = standardHeight / 5;
let ballSides = standardWidth;
let speed = 1;
let speedX = 1;

// MOVEMENT BUTTONS
let movementButtons = document.querySelector(".movement-buttons");
let leftButton = document.querySelector(".movement-buttons .fa-arrow-left");
let rightButton = document.querySelector(".movement-buttons .fa-arrow-right");

// GAME VARIABLES
let score = 0;
let boardColors = ["#EB5353", "#F9D923", "#36AE7C", "#187498"];
let game = false;
let digit = document.querySelector(".digit");
let digitPositions = ["1em", "7em", "1em"];

setTimeout(() => {
  game = true;
}, 5000);

setInterval(() => {
  if (game) {
    if (
      parseInt(ballTop) === standardHeight - 100 &&
      ballSides < playerLeft + player.clientWidth / 2 + 30 &&
      ballSides > playerLeft - player.clientWidth / 2 - 30
    ) {
      increaseSpeed();
      speed *= -1;
      increaseScore();
    } else if (ballTop <= (standardHeight * -1) / 20) {
      speed *= -1;
    } else if (ballSides <= 0 || ballSides >= standardWidth * 2) {
      speedX *= -1;
    } else if (ballTop >= standardHeight + 25) {
      lose();
      clearInterval();
    }
    ballTop += speed;
    ballSides += speedX;
    ball.style.top = ballTop.toString() + "px";
    ball.style.left = ballSides.toString() + "px";
  }
}, 0.1);

const lose = () => {
  // REMOVING ELEMENTS
  document.querySelector("body").removeChild(gameBoard);
  document
    .querySelector("body")
    .removeChild(document.querySelector(".game-stats"));
  document
    .querySelector("body")
    .removeChild(document.querySelector(".functional-container"));

  // ADDING ELEMENTS
  let header = document.createElement("h1");
  header.classList.add("lose-message");
  header.textContent = "You lost the game!";

  document.querySelector("body").appendChild(header);
  game = false;
};

const increaseScore = (text) => {
  score++;
  scoreText.textContent = "Score: " + score.toString();
};

const changeBoardColor = (color) => {
  gameBoard.style.background = color;
};

// PLAYER MOVEMENT

const movePlayerRight = () => {
  playerLeft += 50;
  player.style.left = playerLeft + "px";
};

const movePlayerLeft = () => {
  playerLeft -= 50;
  player.style.left = playerLeft + "px";
};

const changeBackground = () => {
  if (boardColors.length > 0) {
    changeBoardColor(boardColors[0]);
    boardColors.shift();
    return;
  }

  // RESETING BOARD COLORS
  boardColors = ["#EB5353", "#F9D923", "#36AE7C", "#187498"];
  changeBoardColor(boardColors[0]);
  boardColors.shift();
};

const showMovementButtons = () => {
  movementButtons.style.display = "block";
};

const hideMovementButtons = () => {
  movementButtons.style.display = "none";
};

const increaseSpeed = () => {
  if (Math.floor(Math.random() * 1) === 1) {
    speed += 0.1;
  }
};

window.addEventListener("load", () => {
  if (window.innerWidth <= 500) {
    showMovementButtons();
  }
});

// EVENT LISTENERS

changeBgButton.addEventListener("click", changeBackground);

document.addEventListener("keydown", (e) => {
  if (playerLeft < standardWidth * 2 - player.clientWidth / 2 - 50) {
    if (e.code === "ArrowRight") {
      movePlayerRight();
    }
  }
  if (playerLeft > player.clientWidth / 2 + 50) {
    if (e.code === "ArrowLeft") {
      movePlayerLeft();
    }
  }
});

[leftButton, rightButton].forEach((button, index) =>
  button.addEventListener("click", () => {
    if (index === 0) {
      movePlayerLeft();
      return;
    }

    movePlayerRight();
  })
);

window.addEventListener("resize", () => {
  if (window.innerWidth <= 500) {
    showMovementButtons();

    return;
  }
  hideMovementButtons();
});
