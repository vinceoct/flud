const board = document.getElementsByClassName("boardb")
const boardArray = Array.from(board);
const play = document.getElementsByClassName("playb")
const score = document.getElementById("turnnum")
let colors = ["#ff0000", "#0000ff", "#ffff00", "#FFA500", "#800080", "#008000" ] 
const message = document.getElementById("message")
const endGame = document.getElementById("endgame")
const paletteMenu = document.getElementById("palettemenu")
const background = document.querySelector("html")

function newBoard (){
    for (let i = 0; i < board.length; i++) {
        const color = colors[Math.floor(Math.random()*colors.length)]
        board[i].style.background = color 
    }
}
newBoard ();

function reset (){
    newBoard();
    score.innerText = "0"
}

function playAgain(button) {
    reset();
    endGame.style.zIndex = -1
}

function showColors (button) {
    if(paletteMenu.style.zIndex == -1){
        paletteMenu.style.zIndex = 10
    }else{
        paletteMenu.style.zIndex = -1
    }
}

function colorChange (button) {
    if(button.innerText === "default"){
        colors = ["#FF0000", "#0000FF", "#FFFF00", "#FFA500", "#800080", "#008000"]    
        background.style.backgroundImage = "url('defBG.png')"
        reset();
    }else if(button.innerText === "gutsy"){
        colors = ["#9D2241", "#0E1D6A", "#E2DF50", "#EA9828", "#FFFFFF", "#2A603B"] 
        background.style.backgroundImage = "url('gutsyBG.png')"
        reset();
    }else if(button.innerText === "ooo"){
        colors = ["#840F0A", "#069CD4", "#AEDCF6", "#FBB922", "#F199C0", "#64B3A4"]
        background.style.backgroundImage = "url('oooBG.png')"
        reset();
    }else if(button.innerText === "colorblind") {
        colors = ["#DC267F", "#648FFF", "#FFB000", "#FE6100","#785EF0", "#33460C"]
        background.style.backgroundImage = "url('colorblindBG.png')"
        reset();
    }
    for (let i = 0; i < play.length; i++) {
        play[i].style.backgroundColor = colors[i]
    }
}

function turn(button) {
    score.innerText++;
    const clickedBtnColor = window.getComputedStyle(button).getPropertyValue("background-color");
    
    function checkAdj (startBtn, checked = []) {
        const currentColor = board[startBtn].style.background;
        checked.push(startBtn);

        const numberOfRows = Math.sqrt(board.length);
        const numberOfColumns = board[0].parentNode.childElementCount;

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
            const adjacentBtnColor = board[index].style.background;
                if (currentColor === adjacentBtnColor) {
                    checkAdj(index, checked);
                    board[startBtn].style.background = clickedBtnColor;
                    board[index].style.background = clickedBtnColor;     
                }else{
                    board[startBtn].style.background = clickedBtnColor;
                }
         }
    }
    const index = Array.from(button.parentNode.children).indexOf(button);
    checkAdj(0);
    gameScan();
}

function gameScan() {
    function areSameColor(elements) {
        if (elements.length === 0) {
            return false;
        }
        const strtColor = window.getComputedStyle(board[0]).backgroundColor
    
        return elements.every((element) => {
            const boardColor = window.getComputedStyle(element).backgroundColor
            return boardColor === strtColor
        })
    }
    const sameColor = areSameColor(boardArray);  
    if(score.innerText == 25 && sameColor === false) {
        endgame.style.zIndex = 10
        message.innerText = `You ran out of moves` 
    }else if(score.innerText <= 25 && sameColor === true) {
        endgame.style.zIndex = 10
        message.innerText = `You won in ${score.innerText} moves`
    }
}



  
  
  
  
  
  
  
  
  


