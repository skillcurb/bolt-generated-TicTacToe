const board = document.getElementById('board');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          message.textContent = `Player ${gameBoard[a]} wins!`;
          gameActive = false;
          return;
        }
      }

      if (!gameBoard.includes('')) {
        message.textContent = "It's a draw!";
        gameActive = false;
      }
    }

    function handleCellClick(e) {
      if (!gameActive) return;

      const cell = e.target;
      const index = cell.dataset.index;

      if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameActive) {
          message.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    }

    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
      message.textContent = `Player ${currentPlayer}'s turn`;
      document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    }

    board.addEventListener('click', handleCellClick);
    resetBtn.addEventListener('click', resetGame);
    message.textContent = `Player ${currentPlayer}'s turn`;
