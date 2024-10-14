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

const gameBoard = (function () {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    this.cacheDom = function () { 
        this.boardElement = document.querySelector('.gameGrid');
        this.cells = Array.from(document.querySelectorAll('.cell'));
        this.playerScore = document.getElementById('playerScore');
        this.computerScore = document.getElementById('computerScore');
        
        this.bindEvents();
    };

    this.bindEvents = function () {
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });
    };
})();
