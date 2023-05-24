const cells = Array.from(document.querySelectorAll(".cell"));
const board = document.querySelector(".board");
const message = document.querySelector("#message");
const exit = document.querySelector("#exit");
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // baris
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // kolom
  [0, 4, 8],
  [2, 4, 6], // diagonal
];
let currentPlayer = "X";
let gameEnded = false;

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

function handleCellClick(e) {
  const cell = e.target;

  if (cell.textContent !== "" || gameEnded) {
    return;
  }

  cell.classList.remove("cell");
  cell.classList.add("active-cell");

  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    highlightWinningCombo(currentPlayer);
    message.innerHTML = "Player " + currentPlayer + " memenangkan permainan!";
    exit.innerHTML = "X";
    message.classList.add("message");
    exit.classList.add("exit");
    gameEnded = true;
    return;
  }

  if (checkDraw()) {
    message.innerHTML = "Game Seri";
    exit.innerHTML = "X";
    message.classList.add("message");
    exit.classList.add("exit");
    gameEnded = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin(player) {
  return winningCombos.some((combo) => {
    return combo.every((index) => cells[index].textContent === player);
  });
}

function checkDraw() {
  return cells.every((cell) => cell.textContent !== "");
}

function highlightWinningCombo(player) {
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;
    const cellA = cells[a];
    const cellB = cells[b];
    const cellC = cells[c];

    if (
      cellA.textContent === player &&
      cellB.textContent === player &&
      cellC.textContent === player
    ) {
      cellA.style.backgroundColor = "#d9002c";
      cellB.style.backgroundColor = "#d9002c";
      cellC.style.backgroundColor = "#d9002c";
    }
  });
}

const closeMessage = () => {
  message.innerHTML = "";
  exit.innerHTML = "";
  message.classList.remove("message");
  exit.classList.remove("exit");
};
