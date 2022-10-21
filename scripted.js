// code that sets the winnner
// code that changes the players
// An object to create the players of the game

(function game() {
    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'circle';
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [3, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    const board = document.querySelector('.game-table');
    const gameCells = document.querySelectorAll('.tabs');
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    const winningMessageElement = document.querySelector('#winningMessage');
    const restartGamBtn = document.querySelector('#restartButton');

    restartGamBtn.addEventListener('click', startGame);

    let currentPlayer;

    const playerX = 'Ben'
    const playerO = 'Dorothy'

    startGame();

    function startGame () {
        winningMessageElement.classList.remove('show');
        gameCells.forEach(cell => {
            cell.classList.remove(X_CLASS)
            cell.classList.remove(CIRCLE_CLASS)
        })
        currentPlayer = playerX;
        gameCells.forEach(cell => {
            cell.addEventListener('click', handleClick, {once:true});
        });

        setBoardHoverClass();
    }

    function handleClick(e) {
        const cell = e.target;
        let currentClass; 
        if(currentPlayer === playerX) {
            currentClass = X_CLASS;
        } else {
            currentClass = CIRCLE_CLASS;
        }
        // place the mark
        placeMark(cell, currentPlayer);
        // check for win
        checkWin(currentClass)

        if(checkWin(currentClass)) {
            endGame(false)
        } else if (isDraw()) {
            endGame(true)
        } else {
            changePlayer();
            setBoardHoverClass();
        } 
    }

    function endGame(status) {
        if(status) {
            winningMessageTextElement.innerText = "Draw!"
        } else {
            winningMessageTextElement.innerText = `${currentPlayer == playerO? playerO : playerX} Wins!`;
        }
        winningMessageElement.classList.add('show')
    } 

    function isDraw () {
        return [...gameCells].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
        })
    }

    function changePlayer () {
        if(currentPlayer === playerX) {
            currentPlayer = playerO;
        } else {
            currentPlayer = playerX
        }
    }
    function placeMark(cell, currentPlayer) {
        if(currentPlayer === playerX) {
            cell.classList.add(X_CLASS);
        } else {
            cell.classList.add(CIRCLE_CLASS);
        }
    }

    function setBoardHoverClass() {
        board.classList.remove(CIRCLE_CLASS);
        board.classList.remove(X_CLASS);
        if(currentPlayer === playerX) {
            board.classList.add(X_CLASS);
        } else if(currentPlayer === playerO) {
            board.classList.add(CIRCLE_CLASS);
        } else {
            changePlayer();
        }
    }

    function checkWin (currentClass) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameCells[index].classList.contains(currentClass);
            })
        });
    }



})();

