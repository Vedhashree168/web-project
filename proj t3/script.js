const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');
const confettiContainer = document.getElementById('confetti');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      showWin(currentPlayer);
      return;
    }
  }

  if (!gameState.includes("")) {
    message.textContent = "It's a Draw!";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function showWin(player) {
  message.innerHTML = `🎉 Congratulations! Player <strong>${player}</strong> Wins! 🎉`;
  launchConfetti();
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = 'X';
  message.textContent = '';
  cells.forEach(cell => cell.textContent = '');
  confettiContainer.innerHTML = '';
}

function launchConfetti() {
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = `${2 + Math.random() * 3}s`;
    confetti.style.width = `${6 + Math.random() * 6}px`;
    confetti.style.height = confetti.style.width;
    confettiContainer.appendChild(confetti);
  }
  setTimeout(() => confettiContainer.innerHTML = '', 4000);
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);