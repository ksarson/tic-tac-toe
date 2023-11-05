const gameBoard = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],

    initializeGame(player1Info, player2Info, winnerInfo, newGameButton) {
        player1Info.textContent = `P1 - ${player1.score}`;
        player2Info.textContent = `P2 - ${player2.score}`;
        winnerInfo.textContent = `${playerTurn.name} (${playerTurn.symbol}'s) turn`;
        newGameButton.style.display = 'none';
        gameBoard.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
    },

    updateBoard(tile, symbol, playerTurn) {
        tile.innerText = symbol;
        if (playerTurn === player1) {
            tile.style.color = 'var(--green)';
        } else if (playerTurn === player2) {
            tile.style.color = 'var(--purple-light)';
        }
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

    handleScoreColors(player1Score, player2Score, player1Info, player2Info) {
        if (player1Score === player2Score) {
            player1Info.style.color = 'white';
            player2Info.style.color = 'white';
        } else {
            player1Info.style.color =
                player1Score > player2Score ? 'green' : 'red';
            player2Info.style.color =
                player2Score > player1Score ? 'green' : 'red';
        }
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
    // #region initialize game
    const player1Info = document.getElementById('player1');
    const player2Info = document.getElementById('player2');
    const winnerInfo = document.getElementById('winner-text');
    const newGameButton = document.getElementById('new-game-button');
    const buttons = document.querySelectorAll('.tile-button');

    gameBoard.initializeGame(
        player1Info,
        player2Info,
        winnerInfo,
        newGameButton
    );
    // #endregion

    // #region new game buttton
    newGameButton.addEventListener('click', function () {
        console.log('clicked');
        gameBoard.initializeGame(
            player1Info,
            player2Info,
            winnerInfo,
            newGameButton
        );

        buttons.forEach((button) => {
            gameBoard.updateBoard(button, '', null);
            button.disabled = false;
        });
    });
    // #endregion

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            // #region playing turns
            const [row, col] = button.parentElement.id.split('-').map(Number);
            if (gameBoard.board[row][col].length === 0) {
                gameBoard.board[row][col] = playerTurn.symbol;
                gameBoard.updateBoard(button, playerTurn.symbol, playerTurn);
                playerTurn = playerTurn === player1 ? player2 : player1;
                winnerInfo.textContent = `${playerTurn.name} (${playerTurn.symbol}'s) turn`;
            } else {
                alert('Please make a valid selection!');
            }
            // #endregion

            // #region game won
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
                player1Info.textContent = `P1 - ${player1.score}`;
                player2Info.textContent = `P2 - ${player2.score}`;
                winnerInfo.textContent = `Winner is ${winningPlayer}!`;
                buttons.forEach((button) => {
                    button.disabled = true;
                });
                newGameButton.style.display = 'block';
                gameBoard.handleScoreColors(
                    player1.score,
                    player2.score,
                    player1Info,
                    player2Info
                );
                return;
            }
            // #endregion

            // #region game draw
            if (gameBoard.isBoardFull()) {
                winnerInfo.textContent = `Draw!`;
                buttons.forEach((button) => {
                    button.disabled = true;
                });
                newGameButton.style.display = 'block';
                gameBoard.handleScoreColors(
                    player1.score,
                    player2.score,
                    player1Info,
                    player2Info
                );

                return;
            }
            // #endregion
        });
    });
});

const player1 = createPlayer('Player 1', '❤');
const player2 = createPlayer('Player 2', '♥');
let playerTurn = player1;
