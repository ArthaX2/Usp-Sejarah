let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;
let scoreX = 0;
let scoreO = 0;
let vsAI = false;

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

cells.forEach(cell => cell.addEventListener("click", handleClick));

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] || gameOver) return;

  clickSound.play();

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.style.color = currentPlayer === "X" ? "#FF5733" : "#1F618D";

  const winPattern = checkWin();
  if (winPattern) {
    highlightWin(winPattern);
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    updateScore(currentPlayer);
    gameOver = true;
    winSound.play();
    showConfetti();
    return;
  }

  if (board.every(cell => cell)) {
    statusText.textContent = "🤝 It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (vsAI && currentPlayer === "O" && !gameOver) {
    setTimeout(() => {
      const aiMove = getBestMove(board, "O");
      const aiCell = document.querySelector(`.cell[data-index='${aiMove}']`);
      aiCell.click();
    }, 400);
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWin(pattern) {
  pattern.forEach(i => cells[i].classList.add("win"));
}

function updateScore(player) {
  if (player === "X") scoreX++;
  else scoreO++;
  scoreXText.textContent = scoreX;
  scoreOText.textContent = scoreO;
}

function resetBoard() {
  board = Array(9).fill(null);
  gameOver = false;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
    cell.style.color = "";
  });
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
}

function resetGame() {
  resetBoard();
  scoreX = 0;
  scoreO = 0;
  scoreXText.textContent = 0;
  scoreOText.textContent = 0;
  vsAI = false;
}

function showConfetti() {
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 }
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function playWithAI() {
  resetGame();
  vsAI = true;
  alert("You're now playing against AI!");
}

// MINIMAX + ALPHA-BETA (AI)
function getBestMove(boardState, player) {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < boardState.length; i++) {
    if (!boardState[i]) {
      boardState[i] = player;
      let score = minimax(boardState, 0, false, -Infinity, Infinity);
      boardState[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(boardState, depth, isMax, alpha, beta) {
  const winner = checkWinnerForAI(boardState);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (!boardState.includes(null)) return 0;

  if (isMax) {
    let maxEval = -Infinity;
    for (let i = 0; i < boardState.length; i++) {
      if (!boardState[i]) {
        boardState[i] = "O";
        let eval = minimax(boardState, depth + 1, false, alpha, beta);
        boardState[i] = null;
        maxEval = Math.max(maxEval, eval);
        alpha = Math.max(alpha, eval);
        if (beta <= alpha) break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < boardState.length; i++) {
      if (!boardState[i]) {
        boardState[i] = "X";
        let eval = minimax(boardState, depth + 1, true, alpha, beta);
        boardState[i] = null;
        minEval = Math.min(minEval, eval);
        beta = Math.min(beta, eval);
        if (beta <= alpha) break;
      }
    }
    return minEval;
  }
}

function checkWinnerForAI(boardState) {
  const patterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a, b, c] of patterns) {
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return null;
}
