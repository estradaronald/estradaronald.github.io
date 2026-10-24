// ========================================
// ELEMENTS
// ========================================

const target = document.getElementById("target");

const gameArea = document.getElementById("gameArea");

const glove = document.getElementById("glove");

const hitText = document.getElementById("hitText");

const message = document.getElementById("message");

const startBtn = document.getElementById("startBtn");

const scoreDisplay = document.getElementById("score");

const timeDisplay = document.getElementById("time");

const comboDisplay = document.getElementById("combo");

const result = document.getElementById("result");


// ========================================
// GAME VARIABLES
// ========================================

let score = 0;

let combo = 0;

let timeLeft = 30;

let gameRunning = false;

let timer;


// ========================================
// START GAME
// ========================================

startBtn.addEventListener("click", startGame);


function startGame() {

  // Reset values

  score = 0;

  combo = 0;

  timeLeft = 30;

  gameRunning = true;


  // Update display

  scoreDisplay.textContent = score;

  comboDisplay.textContent = combo;

  timeDisplay.textContent = timeLeft;


  // UI

  result.textContent = "";

  message.style.display = "none";

  target.style.display = "block";

  startBtn.disabled = true;

  startBtn.textContent = "GAME RUNNING...";


  // Put face somewhere

  moveTarget();


  // Clear previous timer

  clearInterval(timer);


  // Start countdown

  timer = setInterval(() => {

    timeLeft--;

    timeDisplay.textContent = timeLeft;


    if (timeLeft <= 0) {

      endGame();

    }

  }, 1000);

}


// ========================================
// CLICK / PUNCH FACE
// ========================================

target.addEventListener("click", function (event) {

  if (!gameRunning) return;


  // Increase score

  score++;

  combo++;


  scoreDisplay.textContent = score;

  comboDisplay.textContent = combo;


  // ======================================
  // FIND FACE POSITION
  // ======================================

  const targetRect =
    target.getBoundingClientRect();

  const areaRect =
    gameArea.getBoundingClientRect();


  const targetX =
    targetRect.left -
    areaRect.left +
    targetRect.width / 2;


  const targetY =
    targetRect.top -
    areaRect.top +
    targetRect.height / 2;


  // ======================================
  // MOVE GLOVE TO FACE
  // ======================================

  glove.style.left = `${targetX}px`;

  glove.style.top = `${targetY}px`;


  // Restart glove animation

  glove.classList.remove("punch");

  void glove.offsetWidth;

  glove.classList.add("punch");


  // ======================================
  // FACE HIT ANIMATION
  // ======================================

  target.classList.remove("hit");

  void target.offsetWidth;

  target.classList.add("hit");


  // ======================================
  // BONK TEXT
  // ======================================

  showBonk(
    targetX,
    targetY
  );


  // ======================================
  // MOVE FACE
  // ======================================

  setTimeout(() => {

    if (gameRunning) {

      moveTarget();

    }

  }, 180);

});


// ========================================
// MOVE FACE RANDOMLY
// ========================================

function moveTarget() {

  const areaWidth =
    gameArea.clientWidth;

  const areaHeight =
    gameArea.clientHeight;

  const targetWidth =
    target.offsetWidth;

  const targetHeight =
    target.offsetHeight;


  const maxX =
    areaWidth - targetWidth;

  const maxY =
    areaHeight - targetHeight;


  const x =
    Math.random() * maxX;


  const y =
    Math.random() * maxY;


  target.style.left =
    `${x}px`;

  target.style.top =
    `${y}px`;

}


// ========================================
// SHOW BONK
// ========================================

function showBonk(x, y) {

  hitText.style.left =
    `${x}px`;

  hitText.style.top =
    `${y}px`;


  hitText.classList.remove("show");

  void hitText.offsetWidth;

  hitText.classList.add("show");

}


// ========================================
// END GAME
// ========================================

function endGame() {

  gameRunning = false;


  clearInterval(timer);


  // Hide face

  target.style.display = "none";


  // Reset button

  startBtn.disabled = false;

  startBtn.textContent = "PLAY AGAIN 👊";


  // Result

  let message;


  if (score >= 30) {

    message =
      "🔥 INSANE! You're a punching machine!";

  } else if (score >= 20) {

    message =
      "🥊 Pretty good!";

  } else if (score >= 10) {

    message =
      "😂 Not bad!";

  } else {

    message =
      "💀 BRO YOU CAN'T PUNCH!";

  }


  result.innerHTML = `
    ${message}<br>
    Final Score: ${score} 👊
  `;

}
