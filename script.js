const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 8]
]


const tabElements = document.querySelectorAll('[data-cell');
const board = document.querySelector('.game-table');
const winningMessageElement = document.querySelector('#winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartGamBtn = document.querySelector('#restartButton');
let circleTurn

restartGamBtn.addEventListener('click', startGame)

startGame();

function startGame() {
    circleTurn = false
    tabElements.forEach(tab => {
        tab.classList.remove(X_CLASS);
        tab.classList.remove(CIRCLE_CLASS);
        tab.removeEventListener('click', handleClick);
        tab.addEventListener('click', handleClick, {once:true});
    })
    setBoardHoverClass();

    winningMessageElement.classList.remove('show')
}
function handleClick(e) {
    const tab = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(tab, currentClass);

    if(checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns();
        setBoardHoverClass();
    }
    // place the mark
    // check for win
    // check for draw
    // switch turns
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = "Draw!"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...tabElements].every(tab => {
        return tab.classList.contains(X_CLASS) || tab.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(tab, currentClass) {
    tab.classList.add(currentClass)
}
function swapTurns() {
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return tabElements[index].classList.contains(currentClass)
        })
    })
}
// representation of the gameBoard

// object to control the flow of the game
    // Two players per round
    // one person starts after clicking and leaving a mark, the other person follows.
    // one chance per person
    // Assign an X or an O to either players
    // After a player leaves a mark, update the game board with the selection. 
    // Whichever player is able to put in a set of inline marks(either horizontally, vertically, or diagonally) wins

