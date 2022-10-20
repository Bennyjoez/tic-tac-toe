const gameTiles = Array.from(document.querySelectorAll('.tabs'));
function player (name) {
    return {
        name
    }
}

// representation of the gameBoard
const gameBoard = {
    gameGrid: [
        [],[],[],
        [],[],[],
        [],[],[]
    ]
}

// object to control the flow of the game
    // Two players per round
    // one person starts after clicking and leaving a mark, the other person follows.
    // one chance per person
    // Assign an X or an O to either players
    // After a player leaves a mark, update the game board with the selection. 
    // Whichever player is able to put in a set of inline marks(either horizontally, vertically, or diagonally) wins

