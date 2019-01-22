var gameStarted = false;

// GAME SETUP : click on a couple tiles to create an "initial state".
$(".cell").click(function() {
  $(this).toggleClass("alive");
});

// LAUNCH GAME : hit Enter key.
document.onkeydown = function(event) {
  if (event.keyCode === 13) {
    console.log("ENTER");
    if (gameStarted) {
      return;
    } else {
      console.log("LAUNCH GAME");
      launchGame();
    }
  }
  // 'Space' bar => Triggers a NEW GENERATION.
  if (event.keyCode === 32) {
    console.log("SPACE");
    event.preventDefault();
    nextGen();
  }

  // RESET BOARD : hit 'Backspace' key.
  if (event.keyCode === 8) {
    console.log("BACKSPACE");
    resetBoard();
    updateCounter();
  }
};

var initialState = [
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,]
];

// Creates a snapShot of the board state by checking which cells are shown as 'alive', records stats in a matrix.
function snapShot(matrix) {
  for (var i = 0; i < 24; i++) {
    for (var j = 0; j < 24; j++) {
      if ($("#row" + (i + 1) + "-col" + (j + 1) + "").hasClass("alive")) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = 0;
      }
    }
  }
}

var generations = 0;

// Game is started here. Initial state is recorded until game ends.
function launchGame() {
  snapShot(initialState);
  console.log("INITIAL STATE: ", initialState);
  gameStarted = true;
  generations = 0;
  nextGen();
}

var currentState = [
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,]
];

var nextState = [
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,],
  [, , , , , , , , , , , , , , , , , , , , , , ,]
];

// Launches new iteration on whole board
function nextGen() {
  snapShot(currentState);
  console.log("CURRENT STATE: ", currentState);

  for (var i = 0; i < 24; i++) {
    for (var j = 0; j < 24; j++) {
      var adj = countAdj(currentState, i, j);
      // RULES OF LIFE
      if (adj > 3) {
        nextState[i][j] = 0;
      } else if (adj === 3) {
        nextState[i][j] = 1;
      } else if (adj === 2 && currentState[i][j] === 1) {
        nextState[i][j] = 1;
      } else {
        nextState[i][j] = 0;
      }
    }
  }
  console.log("NEXT STATE:", nextState);
  reDraw();
  generations++;
  updateCounter();
}

// Counts adjacent "alive" cells & return number
function countAdj(matrix, i, j) {
  var adj = 0;

  // 1: index is in the "middle" of the matrix
  if (i > 0 && i < 23 && j > 0 && j < 23) {
    // up-left
    if (matrix[i - 1][j - 1] === 1) {
      adj++;
    }
    // up
    if (matrix[i - 1][j] === 1) {
      adj++;
    }
    // up-right
    if (matrix[i - 1][j + 1] === 1) {
      adj++;
    }
    // right
    if (matrix[i][j + 1] === 1) {
      adj++;
    }
    // bottom-right
    if (matrix[i + 1][j + 1] === 1) {
      adj++;
    }
    // bottom
    if (matrix[i + 1][j] === 1) {
      adj++;
    }
    // bottom-left
    if (matrix[i + 1][j - 1] === 1) {
      adj++;
    }
    // left
    if (matrix[i][j - 1] === 1) {
      adj++;
    }
  }
  // 2: top-row of the matrix, NOT a corner
  else if (i === 0 && j > 0 && j < 23) {
    // right
    if (matrix[i][j + 1] === 1) {
      adj++;
    }
    // bottom-right
    if (matrix[i + 1][j + 1] === 1) {
      adj++;
    }
    // bottom
    if (matrix[i + 1][j] === 1) {
      adj++;
    }
    // bottom-left
    if (matrix[i + 1][j - 1] === 1) {
      adj++;
    }
    // left
    if (matrix[i][j - 1] === 1) {
      adj++;
    }
  }
  // 3: bottom-row of the matrix, NOT a corner
  else if (i === 23 && j > 0 && j < 23) {
    // up-left
    if (matrix[i - 1][j - 1] === 1) {
      adj++;
    }
    // up
    if (matrix[i - 1][j] === 1) {
      adj++;
    }
    // up-right
    if (matrix[i - 1][j + 1] === 1) {
      adj++;
    }
    // right
    if (matrix[i][j + 1] === 1) {
      adj++;
    }
    // left
    if (matrix[i][j - 1] === 1) {
      adj++;
    }
  }
  // 4: left-column of the matrix, NOT a corner
  else if (i > 0 && i < 23 && j === 0) {
    // up
    if (matrix[i - 1][j] === 1) {
      adj++;
    }
    // up-right
    if (matrix[i - 1][j + 1] === 1) {
      adj++;
    }
    // right
    if (matrix[i][j + 1] === 1) {
      adj++;
    }
    // bottom-right
    if (matrix[i + 1][j + 1] === 1) {
      adj++;
    }
    // bottom
    if (matrix[i + 1][j] === 1) {
      adj++;
    }
  }
  // 5: right-column of the matrix, NOT a corner
  else if (i > 0 && i < 23 && j === 23) {
    // up-left
    if (matrix[i - 1][j - 1] === 1) {
      adj++;
    }
    // up
    if (matrix[i - 1][j] === 1) {
      adj++;
    }
    // bottom
    if (matrix[i + 1][j] === 1) {
      adj++;
    }
    // bottom-left
    if (matrix[i + 1][j - 1] === 1) {
      adj++;
    }
    // left
    if (matrix[i][j - 1] === 1) {
      adj++;
    }
  }
  // 6: top-left corner
  else if (i === 0 && j === 0) {
    // right
    if (matrix[i][j + 1] === 1) {
      adj++;
    }
    // bottom-right
    if (matrix[i + 1][j + 1] === 1) {
      adj++;
    }
    // bottom
    if (matrix[i + 1][j] === 1) {
      adj++;
    }
  }
  // 7: top-right corner
  else if (i === 0 && j === 23) {
    // bottom
    if (matrix[i + 1][j] === 1) {
      adj++;
    }
    // bottom-left
    if (matrix[i + 1][j - 1] === 1) {
      adj++;
    }
    // left
    if (matrix[i][j - 1] === 1) {
      adj++;
    }
  }
  // 8: bottom-right corner
  else if (i === 23 && j === 23) {
    // up-left
    if (matrix[i - 1][j - 1] === 1) {
      adj++;
    }
    // up
    if (matrix[i - 1][j] === 1) {
      adj++;
    }
    // left
    if (matrix[i][j - 1] === 1) {
      adj++;
    }
  }
  // 9: bottom-left corner
  else if (i === 23 && j === 0) {
    // up
    if (matrix[i - 1][j] === 1) {
      adj++;
    }
    // up-right
    if (matrix[i - 1][j + 1] === 1) {
      adj++;
    }
    // right
    if (matrix[i][j + 1] === 1) {
      adj++;
    }
  }

  return adj;
}

// Redraws the entire board (adds or removes "alive" class when necessary)
function reDraw() {
  console.log("REDRAWING");
  for (var i = 0; i < 24; i++) {
    for (var j = 0; j < 24; j++) {
      if (nextState[i][j] === 1) {
        $("#row" + (i + 1) + "-col" + (j + 1) + "").addClass("alive");
      } else if (nextState[i][j] === 0) {
        $("#row" + (i + 1) + "-col" + (j + 1) + "").removeClass("alive");
      }
    }
  }
  reInitialize(currentState);
  reInitialize(nextState);
  congrats();
}

// ReInitialize all values of a matrix to 0
function reInitialize(matrix) {
  for (var i = 0; i < 24; i++) {
    for (var j = 0; j < 24; j++) {
      matrix[i][j] = 0;
    }
  }
}

function resetBoard() {
  reInitialize(nextState);
  reDraw();
  generations = 0;
  gameStarted = false;
}

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

// alive cells
var alive = $(".alive");

// close icon in modal
var closeicon = $(".close");

// declare modal
var modal = $(".popup");

// COUNTER : counts the number of generations since game start
var counter = $(".counter");

function updateCounter() {
  counter.html(generations);
}

// @description toggles open and show class to display cards
var displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

// @description enable cards and disable matched cards
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

// CONGRATULATIONS : shown if reaches >100 generations
function congrats() {
  if (generations >= 100 && alive.length > 0) {
    modal.addClass("show");

    //closeicon on modal
    closeModal();
  }
}

// @description close icon on modal
function closeModal() {
  closeicon.addEventListener("click", function(e) {
    modal.classList.remove("show");
    playAgain();
  });
}

// @desciption for user to play Again
function playAgain() {
  modal.removeClass("show");
  resetBoard();
}
