//Global Game Variables;
let gameTurn = 0;
let gameStat = [9, 9, 9, 9, 9, 9, 9, 9, 9];
let gameDifficulty = 2;
let curGamemode = 0;

//Core Game control functions
// Function to get click input
function getButttonClick() {
  let choice = 99;
  return new Promise((resolve) => {
    let boxes = document.querySelectorAll(".selectionBox");
    function handleClick() {
      for (box of boxes) box.removeEventListener("click", handleClick);
      resolve(choice);
    }
    for (let i = 0; i < 9; i++) {
      boxes[i].addEventListener("click", () => {
        choice = i;
        handleClick();
      });
    }
  });
}

// function to process plsyer input click
async function playerTurn() {
  let i = await getButttonClick();
  while (gameStat[i] == 1 || gameStat[i] == 0) i = await getButttonClick();
  if (gameStat[i] == 9) {
    if (gameTurn % 2 == 0) {
      gameStat[i] = 1;
    } else {
      gameStat[i] = 0;
    }
    gameTurn++;
    updateStat();
  }
}

// Function to Change page view
function pageViewControl(destinationPage, sourcePage = 0) {
  if (sourcePage === 0) {
    document.querySelector(".mainMenu").id = "hide";
    document.querySelector(".gameBoard").id = "hide";
    document.querySelector(".resultScreen").id = "hide";
    document.querySelector(".settingsPage").id = "hide";
  } else if (sourcePage === 1) {
    document.querySelector(".mainMenu").id = "hide";
    document.querySelector(".mainMenu").scrollIntoView({ behavior: "smooth" });
  } else if (sourcePage === 2) {
    document.querySelector(".gameBoard").id = "hide";
    document.querySelector(".gameBoard").scrollIntoView({ behavior: "smooth" });
  } else if (sourcePage === 3) {
    document.querySelector(".resultScreen").id = "hide";
    document
      .querySelector(".resultScreen")
      .scrollIntoView({ behavior: "smooth" });
  }

  if (destinationPage === 1) {
    document.querySelector(".mainMenu").id = "";
    document.querySelector(".mainMenu").scrollIntoView({ behavior: "smooth" });
  } else if (destinationPage === 2) {
    document.querySelector(".gameBoard").id = "";
    document.querySelector(".gameBoard").scrollIntoView({ behavior: "smooth" });
  } else if (destinationPage === 3) {
    document.querySelector(".gameBoard").id = "";
    document.querySelector(".resultScreen").id = "";
    document
      .querySelector(".resultScreen")
      .scrollIntoView({ behavior: "smooth" });
  } else if (destinationPage === 4) {
    document.querySelector(".settingsPage").id = "";
    document
      .querySelector(".settingsPage")
      .scrollIntoView({ behavior: "smooth" });
  }
}

// Function to update gameboard state
function updateStat() {
  let boxes = document.querySelectorAll(".selectionBox");
  if (gameTurn % 2 === 0)
    document.querySelector(".turnStat").innerText = "Player 1's turn (X)";
  else document.querySelector(".turnStat").innerText = "Player 2's turn (O)";
  for (let i = 0; i < 9; i++) {
    if (gameStat[i] === 1) boxes[i].innerText = "✖";
    else if (gameStat[i] === 0) boxes[i].innerText = "〇";
    else boxes[i].innerText = "";
  }
}

// Function to Check wheteher game is won or not. Also updates the .turnstat element comments and calls result view page.
function isWon(caller = 0) {
  console.log("ente");
  let checkPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  if (caller === 0) {
    for (let pattern of checkPattern) {
      let [a, b, c] = pattern;

      if (gameStat[a] === 0 && gameStat[b] === 0 && gameStat[c] === 0) {
        document.querySelector(".turnStat").innerText = "You lose!";
        pageViewControl(3);
        displayResult(1);
        return true;
      }

      if (gameStat[a] === 1 && gameStat[b] === 1 && gameStat[c] === 1) {
        document.querySelector(".turnStat").innerText = "You Won!";
        pageViewControl(3);
        displayResult(0);
        return true;
      }
    }

    if (gameTurn > 8) {
      document.querySelector(".turnStat").innerText = "Game Draw";
      displayResult(2);
      pageViewControl(3);
      return true;
    }

    return false;
  } else if (caller === 1) {
    for (let pattern of checkPattern) {
      let [a, b, c] = pattern;

      if (gameStat[a] === 0 && gameStat[b] === 0 && gameStat[c] === 0) {
        document.querySelector(".turnStat").innerText = "Player 2 Won";
        pageViewControl(3);
        displayResult(1, 1);
        return true;
      }

      if (gameStat[a] === 1 && gameStat[b] === 1 && gameStat[c] === 1) {
        document.querySelector(".turnStat").innerText = "Player 1 Won";
        pageViewControl(3);
        displayResult(0, 1);
        return true;
      }
    }

    if (gameTurn > 8) {
      document.querySelector(".turnStat").innerText = "Game Draw";
      pageViewControl(3);
      displayResult(2, 1);
      return true;
    }

    return false;
  }
}

// Function to show the Results Page.
function displayResult(scene, gameMode = 0) {
  if (scene === 0 && gameMode === 0) {
    document.querySelector(".resultStat").innerText = "Congratulations";
    document.querySelector(".resultScreen").style.backgroundColor = "#3da6cc";
    document.querySelector(".resultImage").src = "winner.png";
  } else if (scene === 1 && gameMode === 0) {
    document.querySelector(".resultStat").innerText = "Game Over";
    document.querySelector(".resultScreen").style.backgroundColor = "#141109";
    document.querySelector(".resultImage").src = "loser.png";
  } else if (scene === 2 && gameMode === 0) {
    document.querySelector(".resultStat").innerText = "Well Played!";
    document.querySelector(".resultScreen").style.backgroundColor = "#33cf96";
    document.querySelector(".resultImage").src = "draw.png";
  } else if (scene === 0 && gameMode === 1) {
    document.querySelector(".resultStat").innerText =
      "Congratulations! Player 1";
    document.querySelector(".resultScreen").style.backgroundColor = "#3da6cc";
    document.querySelector(".resultImage").src = "winner.png";
  } else if (scene === 1 && gameMode === 1) {
    document.querySelector(".resultStat").innerText =
      "Congratulations! Player 2";
    document.querySelector(".resultScreen").style.backgroundColor = "#b05dff";
    document.querySelector(".resultImage").src = "winner.png";
  } else if (scene === 2 && gameMode === 1) {
    document.querySelector(".resultStat").innerText = "Well Played!";
    document.querySelector(".resultScreen").style.backgroundColor = "#33cf96";
    document.querySelector(".resultImage").src = "draw.png";
  }
}

// Function to reset game.
function resetGame() {
  pageViewControl(2);
  gameTurn = 0;
  gameStat = [9, 9, 9, 9, 9, 9, 9, 9, 9];
  updateStat();
  if (curGamemode === 1) singlePlayer();
  else multiPlayer();
}

// Gameplay functions

// Multiplayer Mode Gameplay
function multiPlayer() {
  curGamemode = 2;
  pageViewControl(2);
  gameTurn = 0;
  updateStat();
  playerTurn()
    .then(() => {
      if (isWon(1) == true) return;
      return playerTurn();
    })
    .then(() => {
      if (isWon(1) == true) return;
      return playerTurn();
    })
    .then(() => {
      if (isWon(1) == true) return;
      return playerTurn();
    })
    .then(() => {
      if (isWon(1) == true) return;
      return playerTurn();
    })
    .then(() => {
      if (isWon(1) == true) return;
      return playerTurn();
    })
    .then(() => {
      if (isWon(1) == true) return;
      return playerTurn();
    })
    .then(() => {
      if (isWon(1) == true) return;
      return playerTurn();
    })
    .then(() => {
      if (isWon(1) == true) return;
      return playerTurn();
    })
    .then(() => {
      isWon(1);
    });
}

// Single Player Mode Gameplay
function singlePlayer() {
  curGamemode = 1;
  updateStat();
  gameTurn = 0;
  pageViewControl(2);
  playerTurn()
    .then(() => {
      if (isWon()) return;
      computersTurn();
      if (isWon()) return;
      return playerTurn();
    })
    .then(() => {
      if (isWon()) return;
      computersTurn();
      if (isWon()) return;
      return playerTurn();
    })
    .then(() => {
      if (isWon()) return;
      computersTurn();
      if (isWon()) return;
      return playerTurn();
    })
    .then(() => {
      if (isWon()) return;
      computersTurn();
      if (isWon()) return;
      return playerTurn();
    })
    .then(() => {
      isWon();
      return;
    });
}

//  Generates Computers turn for singleplayer mode  based on game difficulty.
function computersTurn() {
  let checkPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let choice = 99;
  if (gameTurn >= 3) {
    for (let i = 0; i < 8; i++) {
      let [a, b, c] = checkPattern[i];
      if (
        (gameStat[a] === gameStat[b] &&
          gameStat[c] === 9 &&
          gameStat[a] === 0) ||
        (gameStat[b] === gameStat[c] &&
          gameStat[a] === 9 &&
          gameStat[b] === 0) ||
        (gameStat[a] === gameStat[c] && gameStat[b] === 9 && gameStat[a] === 0)
      ) {
        if (gameStat[a] === 9) {
          choice = a;
        } else if (gameStat[b] === 9) {
          choice = b;
        } else {
          choice = c;
        }
        break;
      }
    }
    if (choice == 99) {
      for (let i = 0; i < 8; i++) {
        let [a, b, c] = checkPattern[i];
        if (
          (gameStat[a] === gameStat[b] &&
            gameStat[c] === 9 &&
            gameStat[a] === 1) ||
          (gameStat[b] === gameStat[c] &&
            gameStat[a] === 9 &&
            gameStat[b] === 1) ||
          (gameStat[a] === gameStat[c] &&
            gameStat[b] === 9 &&
            gameStat[a] === 1)
        ) {
          if (gameStat[a] === 9) {
            choice = a;
          } else if (gameStat[b] === 9) {
            choice = b;
          } else {
            choice = c;
          }
          break;
        }
      }
    }
  }

  if (choice == 99 && gameDifficulty >= 2) {
    if (
      (gameStat[0] === 1 && gameStat[8] === 1) ||
      (gameStat[2] === 1 && gameStat[6] === 1)
    ) {
      let emptySides = [1, 3, 5, 7].filter((side) => gameStat[side] === 9);
      if (emptySides.length > 0) {
        choice = emptySides[Math.floor(Math.random() * emptySides.length)];
      }
    }
  }

  if (choice == 99 && gameDifficulty >= 1) {
    if (gameStat[4] === 9) {
      choice = 4; // Center
    } else {
      let emptyCorners = [0, 2, 6, 8].filter(
        (corner) => gameStat[corner] === 9
      );
      if (emptyCorners.length > 0) {
        choice = emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
      }
    }
  }

  if (choice === 99) {
    choice = Math.round(Math.random() * 8);
    while (gameStat[choice] !== 9) choice = Math.round(Math.random() * 8);
  }
  gameStat[choice] = 0;
  gameTurn++;
  setTimeout(() => {
    updateStat();
    return;
  }, 400);
}

//Event Listeners
document.querySelector("#mnubtn").addEventListener("click", () => {
  pageViewControl(1);
});
document.querySelector("#st").addEventListener("click", () => {
  pageViewControl(4);
});
document.querySelector("#mP").addEventListener("click", () => {
  multiPlayer();
});

document.querySelector("#sP").addEventListener("click", () => {
  singlePlayer();
});

document.querySelector("#rstBtn").addEventListener("click", () => {
  resetGame();
});
document.querySelector("#mainMenuBtn").addEventListener("click", () => {
  gameMode = 0;
  gameTurn = 0;
  gameStat = [9, 9, 9, 9, 9, 9, 9, 9, 9];
  pageViewControl(1);
});
document.querySelector("#selector").addEventListener("change", (event) => {
  gameDifficulty = event.target.value;
});

// splashScreen iffe
(function () {
  setTimeout(() => {
    document.querySelector(".mainMenu").id = "";
    document.querySelector(".mainMenu").scrollIntoView({ behavior: "smooth" });
  }, 3000);
  setTimeout(() => {
    document.querySelector(".splashScreen").id = "hide";
  }, 3500);
})();
