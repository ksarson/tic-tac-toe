const gameBoard = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],

    initializeGame(player1Info, player2Info, winnerInfo) {
        player1Info.textContent = `Player 1: ${player1.score}`;
        player2Info.textContent = `Player 2: ${player2.score}`;
        winnerInfo.textContent = '';
    },

    updateBoard(tile) {
        tile.innerText = playerTurn.symbol;
    },

    isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard.board[i][j].length === 0) {
                    return false;
                }
            }
        }
        return true;
    },

    isGameWon() {
        for (let i = 0; i < 3; i++) {
            if (
                gameBoard.board[i][0] === gameBoard.board[i][1] &&
                gameBoard.board[i][1] === gameBoard.board[i][2] &&
                gameBoard.board[i][0] !== ''
            ) {
                return gameBoard.board[i][0];
            }
        }

        for (let i = 0; i < 3; i++) {
            if (
                gameBoard.board[0][i] === gameBoard.board[1][i] &&
                gameBoard.board[1][i] === gameBoard.board[2][i] &&
                gameBoard.board[0][i] !== ''
            ) {
                return gameBoard.board[0][i];
            }
        }

        if (
            gameBoard.board[0][0] === gameBoard.board[1][1] &&
            gameBoard.board[1][1] === gameBoard.board[2][2] &&
            gameBoard.board[0][0] !== ''
        ) {
            return gameBoard.board[0][0];
        }

        if (
            gameBoard.board[0][2] === gameBoard.board[1][1] &&
            gameBoard.board[1][1] === gameBoard.board[2][0] &&
            gameBoard.board[0][2] !== ''
        ) {
            return gameBoard.board[0][2];
        }

        return false;
    },
};

function createPlayer(name, symbol) {
    const player = {
        name: name,
        symbol: symbol,
        score: 0,
    };

    return player;
}

document.addEventListener('DOMContentLoaded', function () {
    const player1Info = document.getElementById('player1');
    const player2Info = document.getElementById('player2');
    const winnerInfo = document.getElementById('current-winner');
    gameBoard.initializeGame(player1Info, player2Info, winnerInfo);

    const buttons = document.querySelectorAll('.tile-button');
    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            const [row, col] = button.parentElement.id.split('-').map(Number);
            if (gameBoard.board[row][col].length === 0) {
                gameBoard.board[row][col] = playerTurn.symbol;
                gameBoard.updateBoard(button);
                playerTurn = playerTurn === player1 ? player2 : player1;
            } else {
                alert('Please make a valid selection!');
            }
            if (gameBoard.isGameWon()) {
                const winner = gameBoard.isGameWon();
                let winningPlayer;
                if (winner === player1.symbol) {
                    player1.score++;
                    winningPlayer = player1.name;
                } else {
                    player2.score++;
                    winningPlayer = player2.name;
                }
                player1Info.textContent = `Player 1: ${player1.score}`;
                player2Info.textContent = `Player 2: ${player2.score}`;
                winnerInfo.textContent = `Winner is ${winningPlayer}!`;
                return;
            }
            if (gameBoard.isBoardFull()) {
                winnerInfo.textContent = `Draw!`;
                return;
            }
        });
    });
});

const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');
let playerTurn = player1;
