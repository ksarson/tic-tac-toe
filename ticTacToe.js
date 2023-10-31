const gameBoard = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
};

function createPlayer(name, symbol) {
    const player = {
        name: name,
        symbol: symbol,
        score: 0,
    };

    return player;
}

const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');
console.log(player1);
console.log(player2);
