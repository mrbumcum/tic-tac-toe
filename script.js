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
