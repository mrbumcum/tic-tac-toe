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
    };

    const updateSelection = function (selected) {
        circle.classList.remove('selected');
        cross.classList.remove('selected');
        selected.classList.add('selected');
        chosenSymbol = selected === circle ? 'circle' : 'cross';
    }

    circle.addEventListener('click', handleCircleClick);
    cross.addEventListener('click', handleCrossClick);
    startButton.addEventListener('click', handleStartClick);

    return {
        getChosenSymbol: function() {
            return chosenSymbol;
        }
    }
})();

const player = (function () {
    const boardElement = document.querySelector('.gameGrid');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const playerScore = document.getElementById('playerScore');
    const computerScore = document.getElementById('computerScore');
    const restartButton = document.querySelector('.restartButton');
    const board = ['', '', '', '', '', '', '', '', ''];

    const handleCellClick = function (event) {
        const cell = event.target;
        const cellIndex = cells.indexOf(cell); // Corrected: Use cells array to find the index
        if (board[cellIndex] === '') {
            updateBoard(cellIndex, 'X');
        }
    };

    const updateBoard = function (index, symbol) {
        board[index] = symbol;
        renderBoard(index, symbol);
    };

    const renderBoard = function (index, symbol) {
        document.querySelector(`.cell${index}`).textContent = symbol;
    };

    const handleRestartClick = function () {
        board.fill('');
        cells.forEach(cell => {
            cell.textContent = '';
        });
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', handleRestartClick);
})();

