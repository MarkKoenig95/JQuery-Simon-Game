var blueBtn = $("#blue");
var greenBtn = $("#green");
var redBtn = $("#red");
var yellowBtn = $("#yellow");
var title = $("#level-title");
var btns = $(".btn");
var flashBtnInterval;
var flashRate = 500;
var fadeSpeed = 100;
var gameIsOver = true;
var pattern = [];
var level = 0;
var index = {
  click: 0,
  flash: 0
};

function fadeClass(element, className, duration) {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, duration);
}

function testCLick(thisBtn) {
  if (pattern.length > 0) {
    let currentButton = pattern[index.click][0];

    if (thisBtn.id === currentButton.id) {
      let clickSound = new Audio(`./sounds/${currentButton.id}.mp3`);
      clickSound.play();

      if (index.click === pattern.length - 1) {
        setTimeout(game, flashRate);
        return;
      }
      index.click++;
    } else {
      gameOver();
    }
  }
}

function handleClick() {
  fadeClass(this, "pressed", 100);
  testCLick(this);
}

function setupGame() {
  if (gameIsOver) {
    fadeSpeed = flashRate / 5;
    gameIsOver = false;
    game();
  }
}

function handleKeyDown() {
  setupGame();
}

function randomBtn() {
  let randomColor = Math.floor(Math.random() * 4);
  let randomBtn;

  switch (randomColor) {
    case 0:
      randomBtn = blueBtn;
      break;
    case 1:
      randomBtn = greenBtn;
      break;
    case 2:
      randomBtn = redBtn;
      break;
    case 3:
      randomBtn = yellowBtn;
      break;
    default:
      break;
  }

  return randomBtn;
}

function flashPattern() {
  let btn = pattern[index.flash];
  btn.fadeOut(fadeSpeed).fadeIn(fadeSpeed);

  let flashSound = new Audio(`./sounds/${btn[0].id}.mp3`);
  flashSound.play();

  index.flash++;
  if (index.flash >= pattern.length) {
    clearInterval(flashBtnInterval);
  }
}

function gameOver() {
  gameIsOver = true;
  index.click = 0;
  pattern = [];
  title.text(
    `Game Over. You made it to Level ${level}! Press Any Key to Restart`
  );
  level = 0;
  fadeClass(document.body, "game-over", 500);
  let loseSound = new Audio("./sounds/wrong.mp3");
  loseSound.play();
}

function game() {
  level++;

  index.flash = 0;

  index.click = 0;

  title.text(`Level ${level}`);

  pattern.push(randomBtn());

  flashBtnInterval = setInterval(flashPattern, flashRate);
}

btns.click(handleClick);

$(document).on("keydown", handleKeyDown);
