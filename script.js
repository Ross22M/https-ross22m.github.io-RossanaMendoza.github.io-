   document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');
    const resetScoreButton = document.getElementById('reset-score-button');
    const turnDisplay = document.getElementById('turn-display');
    const scoreDisplay = document.getElementById('score-display');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scoreX = 0;
    let scoreO = 0;

    function updateTurnDisplay() {
        turnDisplay.textContent = `Turno de: ${currentPlayer}`;
    }

    function updateScore() {
        scoreDisplay.textContent = `Puntuación - Jugador X: ${scoreX} | Jugador O: ${scoreO}`;
    }

    function resetCellStyles() {
        cells.forEach(cell => {
            cell.classList.remove('winner-cell');
        });
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                highlightWinner([a, b, c]);
                return gameBoard[a];
            }
        }

        return null;
     }

     function highlightWinner(winningCells) {
        winningCells.forEach(index => {
            cells[index].classList.add('winner-cell');
        });
     }

     function checkDraw() {
        return gameBoard.every(cell => cell !== '');
     }

     function handleCellClick(index) {
        if (!gameActive || gameBoard[index] !== '') {
            return;
        }

        resetCellStyles(); // Limpiar estilos antes de cada jugada

     // Decidir aleatoriamente si el jugador actual será 'X' o 'O'
     //currentPlayer = Math.random() < 0.5 ? 'X' : 'O'//;
        
        // Verificar si el jugador actual puede hacer un movimiento

        if (gameBoard.filter(cell => cell !== '').length % 2 === 0 && currentPlayer === 'O') {
           return;
        }
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            alert(`Player ${winner} wins!`);
            gameActive = false;
            if (winner === 'X') {
                scoreX++;
            } else {
                scoreO++;
            }
            updateScore();
        } else if (checkDraw()) {
            alert('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }

        updateTurnDisplay();
    }

    function restartGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner-cell');
        });
        gameActive = true;
        currentPlayer = 'X';
        updateTurnDisplay();
    }

    function resetScore() {
        scoreX = 0;
        scoreO = 0;
        updateScore();
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    restartButton.addEventListener('click', restartGame);
    resetScoreButton.addEventListener('click', resetScore);
    
    updateTurnDisplay();
    updateScore();
})