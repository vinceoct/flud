let boardBtn = document.getElementsByClassName("boardb");
let boardArray = Array.from(boardBtn);
const play = document.getElementsByClassName("playb");
const score = document.getElementById("turnnum");
const scoreLimit = document.getElementById("limit");
let colors = ["#ff0000", "#0000ff", "#ffff00", "#FFA500", "#800080", "#008000"];
const message = document.getElementById("message");
const endGame = document.getElementById("endgame");
const paletteMenu = document.getElementById("palettemenu");
const background = document.querySelector("html");
const instructions = document.getElementById("instructions");
let gridSize = 12;
const originalRowClasses = [
  "r1",
  "r2",
  "r3",
  "r4",
  "r5",
  "r6",
  "r7",
  "r8",
  "r9",
  "r10",
  "r11",
  "r12",
];
let rowClasses = [...originalRowClasses];

function changeBoardButtonSize(newHeight, newWidth) {
  for (let i = 0; i < boardBtn.length; i++) {
    boardBtn[i].style.height = `${newHeight}px`;
    boardBtn[i].style.width = `${newWidth}px`;
  }
}


function removeRows() {
  const boardContainer = document.getElementById("board");
  for (const rowClass of ["r13", "r14", "r15", "r16", "r17", "r18", "r19", "r20", "r21", "r22"]) {
    const rowToRemove = document.querySelector(`.${rowClass}`);
    if (rowToRemove) {
      boardContainer.removeChild(rowToRemove);
    }
  }
}

function small() {
  removeRows()
  scoreLimit.innerText = "22";
  gridSize = 12
  newBoard()
  changeBoardButtonSize(34, 34)
}
function medium() {
  removeRows()
  scoreLimit.innerText = "30";
  const boardContainer = document.getElementById("board");
  if (rowClasses.length > 12) {
    rowClasses.splice(12, 10);
    console.log(rowClasses.length);
  }
  for (const newRowClass of ["r13", "r14", "r15", "r16", "r17"]) {
    const newRow = document.createElement("div");
    newRow.className = newRowClass;
    boardContainer.appendChild(newRow);
    rowClasses.push(newRowClass);
    console.log(rowClasses.length);
  }
  
  gridSize = 17;
  console.log(rowClasses);
  newBoard();
  changeBoardButtonSize(24, 24);
}

function large() {
  scoreLimit.innerText = "36";
  const boardContainer = document.getElementById("board");
  if (rowClasses.length === 17) {
    for (const newRowClass of ["r18", "r19", "r20", "r21", "r22"]) {
      const newRow = document.createElement("div");
      newRow.className = newRowClass;
      boardContainer.appendChild(newRow);
      rowClasses.push(newRowClass);
    }
  } else if (rowClasses.length < 17) {
    for (const newRowClass of [
      "r13",
      "r14",
      "r15",
      "r16",
      "r17",
      "r18",
      "r19",
      "r20",
      "r21",
      "r22",
    ]) {
      const newRow = document.createElement("div");
      newRow.className = newRowClass;
      boardContainer.appendChild(newRow);
      rowClasses.push(newRowClass);
    }
  }
  console.log(rowClasses);
  gridSize = 22;
  newBoard();
  changeBoardButtonSize(18.54, 18.54);
}

//New Game Functions
function newBoard() {
  for (const rowClass of rowClasses) {
    const row = document.querySelector(`.${rowClass}`);

    for (let i = 0; i < gridSize; i++) {
      if (row.childElementCount < gridSize) {
        const button = document.createElement("button");
        button.className = "boardb";
        button.addEventListener("click", function () {
          turn(this);
        });
        row.appendChild(button);
      }
    }
  }
  boardBtn = document.getElementsByClassName("boardb");
  boardArray = Array.from(boardBtn);
  resetBoard();
}

console.log(boardBtn);
console.log(boardArray);

function resetBoard() {
  for (let i = 0; i < boardBtn.length; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    boardBtn[i].style.background = color;
  }
}
newBoard();

function reset() {
  resetBoard();
  score.innerText = "0";
}

//Button Functions
function playAgain(button) {
  reset();
  endGame.style.zIndex = -1;
  endGame.classList.toggle("gameend");
}

function showColors(button) {
  if (paletteMenu.style.zIndex == -1) {
    paletteMenu.style.zIndex = 10;
    paletteMenu.classList.toggle("colorop");
  } else {
    paletteMenu.classList.toggle("colorop");
    paletteMenu.style.zIndex = -1;
  }
}

function howTo(button) {
  if (instructions.style.zIndex == -1) {
    instructions.style.zIndex = 10;
    instructions.classList.toggle("instop");
  } else {
    instructions.classList.toggle("instop");
    instructions.style.zIndex = -1;
  }
}

function colorChange(button) {
  if (button.innerText === "default") {
    colors = ["#FF0000", "#0000FF", "#FFFF00", "#FFA500", "#800080", "#008000"];
    background.style.backgroundImage = "url('./images/defBG.png')";
    reset();
  } else if (button.innerText === "gutsy") {
    colors = ["#9D2241", "#0E1D6A", "#E2DF50", "#EA9828", "#FFFFFF", "#2A603B"];
    background.style.backgroundImage = "url('./images/gutsyBG.png')";
    reset();
  } else if (button.innerText === "ooo") {
    colors = ["#840F0A", "#069CD4", "#AEDCF6", "#FBB922", "#F199C0", "#64B3A4"];
    background.style.backgroundImage = "url('./images/oooBG.png')";
    reset();
  } else if (button.innerText === "colorblind") {
    colors = ["#DC267F", "#648FFF", "#FFB000", "#FE6100", "#785EF0", "#33460C"];
    background.style.backgroundImage = "url('./images/colorblindBG.png')";
    reset();
  }
  for (let i = 0; i < play.length; i++) {
    play[i].style.backgroundColor = colors[i];
  }
}

//Game Logic Function
function turn(button) {
  score.innerText++;
  const clickedBtnColor = window
    .getComputedStyle(button)
    .getPropertyValue("background-color");

  function checkAdj(startBtn, checked = []) {
    const currentColor = boardBtn[startBtn].style.background;
    checked.push(startBtn);

    const numberOfRows = Math.sqrt(boardBtn.length);
    const numberOfColumns = boardBtn[0].parentNode.childElementCount;

    const rowIndex = Math.floor(startBtn / numberOfColumns);
    const columnIndex = startBtn % numberOfColumns;

    const adjacentBtns = [];

    if (columnIndex > 0) {
      const leftBtn = startBtn - 1;
      if (!checked.includes(leftBtn)) {
        adjacentBtns.push(leftBtn);
      }
    }

    if (columnIndex < numberOfColumns - 1) {
      const rightBtn = startBtn + 1;
      if (!checked.includes(rightBtn)) {
        adjacentBtns.push(rightBtn);
      }
    }

    if (rowIndex > 0) {
      const topBtn = startBtn - numberOfColumns;
      if (!checked.includes(topBtn)) {
        adjacentBtns.push(topBtn);
      }
    }

    if (rowIndex < numberOfRows - 1) {
      const bottomBtn = startBtn + numberOfColumns;
      if (!checked.includes(bottomBtn)) {
        adjacentBtns.push(bottomBtn);
      }
    }

    for (const index of adjacentBtns) {
      const adjacentBtnColor = boardBtn[index].style.background;
      if (currentColor === adjacentBtnColor) {
        checkAdj(index, checked);
        boardBtn[startBtn].style.background = clickedBtnColor;
        boardBtn[index].style.background = clickedBtnColor;
      } else {
        boardBtn[startBtn].style.background = clickedBtnColor;
      }
    }
  }
  const index = Array.from(button.parentNode.children).indexOf(button);
  checkAdj(0);
  gameScan();
}

function gameScan() {
  function areSameColor(elements) {
    console.log(elements);
    if (elements.length === 0) {
      return false;
    }
    const strtColor = window.getComputedStyle(boardArray[0]).backgroundColor;

    return elements.every((element) => {
      const boardColor = window.getComputedStyle(element).backgroundColor;
      return boardColor === strtColor;
    });
  }
  const sameColor = areSameColor(boardArray);
  if (score.innerText == scoreLimit.innerText && sameColor === false) {
    endGame.style.zIndex = 10;
    endGame.classList.toggle("gameend");
    message.innerText = `You ran out of moves`;
  } else if (score.innerText <= scoreLimit.innerText && sameColor === true) {
    endGame.style.zIndex = 10;
    endGame.classList.toggle("gameend");
    message.innerText = `You won in ${score.innerText} moves`;
  }
}
