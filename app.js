let rstbtn;
let gameTurn = 0;
let gameStat = [9, 9, 9, 9, 9, 9, 9, 9, 9];
let boxes = document.querySelectorAll(".selectionBox");
for(let i=0; i<9;i++){
boxes[i].addEventListener("click", () => gameplayTurn(i));
}
addResetButton();
rstbtn.innerText="Play";

function gameplayTurn(i) {
  if (isWon() != 1) {
    if (gameTurn > 9 || gameStat[i] != 9) return;
    else if (gameStat[i] !== 0 || gameStat[i] !== 1) {
      if (gameTurn % 2 === 0) gameStat[i] = 1;
      else gameStat[i] = 0;
    }
    gameTurn++;
  } else alert("Game Ended. Start a new game.");
  updateStat();
  if (isWon() === 1) addResetButton();
}

function updateStat() {
    if (gameTurn % 2 === 0)
      document.querySelector(".turnStat").innerText = "Player 1's turn (X)";
    else document.querySelector(".turnStat").innerText = "Player 2's turn (O)";
  for (let i = 0; i < 9; i++) {
    if (gameStat[i] === 1) boxes[i].innerText = "✖";
    else if (gameStat[i] === 0) boxes[i].innerText = "〇";
    else boxes[i].innerText = "";
  }
}

function startGame() {
  rstbtn.remove();
  rstbtn = null;
  gameTurn = 0;
  document.querySelector(".turnStat").innerText = "Player 1's turn (X)";
  for (let i = 0; i < 9; i++) {
    gameStat[i] = 9;
  }

  updateStat();
}

function isWon() {
  if (
    (gameStat[0] == 0 && gameStat[1] == 0 && gameStat[2] == 0) ||
    (gameStat[3] == 0 && gameStat[4] == 0 && gameStat[5] == 0) ||
    (gameStat[6] == 0 && gameStat[7] == 0 && gameStat[8] == 0) ||
    (gameStat[0] == 0 && gameStat[3] == 0 && gameStat[6] == 0) ||
    (gameStat[1] == 0 && gameStat[4] == 0 && gameStat[7] == 0) ||
    (gameStat[2] == 0 && gameStat[5] == 0 && gameStat[8] == 0) ||
    (gameStat[0] == 0 && gameStat[4] == 0 && gameStat[8] == 0) ||
    (gameStat[2] == 0 && gameStat[4] == 0 && gameStat[6] == 0)
  ) {
    document.querySelector(".turnStat").innerText = "Player 2 Won";
    return 1;
  } else if (
    (gameStat[0] == 1 && gameStat[1] == 1 && gameStat[2] == 1) ||
    (gameStat[3] == 1 && gameStat[4] == 1 && gameStat[5] == 1) ||
    (gameStat[6] == 1 && gameStat[7] == 1 && gameStat[8] == 1) ||
    (gameStat[0] == 1 && gameStat[3] == 1 && gameStat[6] == 1) ||
    (gameStat[1] == 1 && gameStat[4] == 1 && gameStat[7] == 1) ||
    (gameStat[2] == 1 && gameStat[5] == 1 && gameStat[8] == 1) ||
    (gameStat[0] == 1 && gameStat[4] == 1 && gameStat[8] == 1) ||
    (gameStat[2] == 1 && gameStat[4] == 1 && gameStat[6] == 1)
  ) {
    document.querySelector(".turnStat").innerText = "Player 1 Won";
    return 1;
  } else if (gameTurn > 8) {
    document.querySelector(".turnStat").innerText = "Game Draw";
    return 1;
  } else return 0;
}


function addResetButton() {
  if (!rstbtn) {
    rstbtn = document.createElement("button");
    rstbtn.innerText = "Play Again";
    rstbtn.className = "rstbtn";
    rstbtn.addEventListener("click", () => startGame());
    let container = document.querySelector(".rst");
    container.appendChild(rstbtn);
  }
  return;
}
