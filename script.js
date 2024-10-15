const welcomeScreen = (function () {
    const circle = document.querySelector('.circle');
    const cross = document.querySelector('.cross');
    const startButton = document.querySelector('.startButton');
    const gameScreen = document.querySelector('.gameScreen');
    const welcomeScreen = document.querySelector('.welcomeScreen');
    let chosenSymbol = null;

    const handleCircleClick = function () {
        updateSelection(circle);
        console.log('circle');
    };

    const handleCrossClick = function () {
        updateSelection(cross);
        console.log('cross');
    };

    const handleStartClick = function () {
        welcomeScreen.classList.add('disabled');
        gameScreen.classList.remove('disabled');

        computerPlayer.makeMove(gameBoard.getBoard());
    };

    const updateSelection = function (selected) {
        circle.classList.remove('selected');
        cross.classList.remove('selected');
        selected.classList.add('selected');
        chosenSymbol = selected === circle ? 'O' : 'X';
    }

    circle.addEventListener('click', handleCircleClick);
    cross.addEventListener('click', handleCrossClick);
    startButton.addEventListener('click', handleStartClick);

    return {
        getChosenSymbol: function() {
            return chosenSymbol;
        },
    }
})();

const gameBoard = (function () {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const restartButton = document.querySelector('.restartButton');
    const board = ['', '', '', '', '', '', '', '', ''];
    const playerScore = document.getElementById('playerScore');
    const computerScore = document.getElementById('computerScore');
    const playerTurn = document.querySelector('.playerTurn');
    let playerScoreValue = 0;
    let computerScoreValue = 0;
    const getCells = function () {
        return cells;
    };

    const getBoard = function () {
        return board;
    };

    const updateBoard = function (index, symbol) {
        board[index] = symbol;
        renderBoard(index, symbol);
        
        if (winningCondition(symbol)) {
            if (symbol === welcomeScreen.getChosenSymbol()) {
                playerScoreValue++;
                playerScore.textContent = playerScoreValue;
            } else {
                computerScoreValue++;
                computerScore.textContent = computerScoreValue;
            }
            handleRestartClick();
        }
    };

    const renderBoard = function (index, symbol) {
        document.querySelector(`.cell${index}`).textContent = symbol;
        if (gameBoard.getBoard().every(cell => cell !== '')) {
            handleRestartClick();
        }
    };

    const handleRestartClick = function () {
        board.fill('');
        cells.forEach(cell => {
            cell.textContent = '';
        });
    };

    const playerTurnTracker = function (symbol) {
        playerTurn.textContent = `${symbol} Turn`;
    };
    
    restartButton.addEventListener('click', handleRestartClick);

    const winningCondition = function (symbol) {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winConditions.some(condition => 
            condition.every(index => board[index] === symbol)
        );
    };

    return {
        updateBoard: updateBoard,
        winningCondition: winningCondition,
        getBoard: getBoard,
        getCells: getCells,
        getPlayerScore: function() { return playerScoreValue; },
        getComputerScore: function() { return computerScoreValue; },
        playerTurnTracker: playerTurnTracker,
    }
})();

const player = (function () {
    let playerSymbol;
    
    const handleCellClick = function (event) {
        playerSymbol = welcomeScreen.getChosenSymbol();
        const cell = event.target;
        const cellIndex = gameBoard.getCells().indexOf(cell);
        if (gameBoard.getBoard()[cellIndex] === '') {
            gameBoard.updateBoard(cellIndex, playerSymbol);
            gameBoard.playerTurnTracker(computerPlayer.getComputerSymbol());
            if (gameBoard.getBoard().some(cell => cell === '')) {
                computerPlayer.makeMove(gameBoard.getBoard());
            }
        }
    };


    gameBoard.getCells().forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    return {
        handleCellClick: handleCellClick
    }
})();
    
const computerPlayer = (function () {
    let computerSymbol;

    const setComputerSymbol = function() {
        computerSymbol = welcomeScreen.getChosenSymbol() === 'O' ? 'X' : 'O';
    };

    const makeMove = function(board) {
        setComputerSymbol(); // Ensure the computer symbol is set based on the current choice
        const bestMove = findBestMove(board);
        gameBoard.updateBoard(bestMove, computerSymbol);
        gameBoard.playerTurnTracker(welcomeScreen.getChosenSymbol());
    };

    const findBestMove = function(board) {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = computerSymbol;
                let score = minimax(board, 0, false);
                board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    };

    const minimax = function(board, depth, isMaximizing) {
        if (gameBoard.winningCondition(computerSymbol)) {
            return 10 - depth;
        } else if (gameBoard.winningCondition(welcomeScreen.getChosenSymbol())) {
            return depth - 10;
        } else if (board.every(cell => cell !== '')) {
            return 0; // It's a tie
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = computerSymbol;
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = welcomeScreen.getChosenSymbol();
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    return {
        makeMove: makeMove,
        getComputerSymbol: function() { return computerSymbol; }
    }
})();
