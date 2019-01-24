// -----------------------------------------------------------------------
// ------------------ VARIABLES ------------------------------------------

var gameStarted = false;
var generations = 0;
var size = 24;
var initialState = generateGrid(size);
var currentState = generateGrid(size);
var nextState = generateGrid(size);
var directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];
var notes = ["C", "D", "E", "F", "G", "A", "B"];
var audio = document.getElementById("audioPlayer");
var alive = $(".alive");

// -----------------------------------------------------------------------
// ------------------ FUNCTIONS ------------------------------------------

// generates an empty matrix
function generateGrid(size) {
  var grid = [];
  for (var row = 0; row < size; row++) {
    grid[row] = [];
    for (var col = 0; col < size; col++) {
      grid[row][col] = 0;
    }
  }
  return grid;
}

// records a snapshot of the board state
function snapshot(matrix) {
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if ($("#row" + (i + 1) + "-col" + (j + 1) + "").hasClass("alive")) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = 0;
      }
    }
  }
}

// records initial state, resets any counters and launches 1st generation
function launch() {
  snapshot(initialState);
  alive = $(".alive");
  console.log("INITIAL STATE: ", initialState);
  gameStarted = true;
  generations = 0;
  audio.play();
  audio.currentTime = 205;
}

// moves up to a next generation
function next() {
  snapshot(currentState);
  console.log("CURRENT STATE: ", currentState);

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      var adj = count(i, j);
      // Rules of life & death
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
  draw();
  generations++;
  updateCounter();
  alive = $(".alive");
  if (alive.length === 0) {
    audio.pause();
  }
}

// checks if index is still inbounds
function inbounds(r, c) {
  return r >= 0 && r < size && c >= 0 && c < size;
}

// counts how many adjacent "alive" cells
function count(i, j) {
  var adj = 0;
  for (var k = 0; k < directions.length; k++) {
    var direction = directions[k];
    var row = direction[0] + i;
    var col = direction[1] + j;
    if (inbounds(row, col)) {
      if (currentState[row][col] === 1) {
        adj++;
      }
    }
  }
  return adj;
}

// draws the entire board with updated values
function draw() {
  console.log("DRAWING");
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (nextState[i][j] === 1) {
        $("#row" + (i + 1) + "-col" + (j + 1) + "").addClass("alive");
      } else if (nextState[i][j] === 0) {
        $("#row" + (i + 1) + "-col" + (j + 1) + "").removeClass("alive");
      }
    }
  }
  //sound();
  //congrats();
}

// resets all values of a matrix to 0
function reset(matrix) {
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      matrix[i][j] = 0;
    }
  }
}

// global reset
function resetBoard() {
  reset(nextState);
  draw();
  generations = 0;
  gameStarted = false;
}

// sounds
function sound() {
  for (var i = 0; i < size; i++) {
    if (nextState[i].indexOf(1) > 0) {
      var q = Math.floor(i / 7) + 3;
      var r = i % 7;
      Synth.play(1, notes[r], q, 5);
    }
  }
}

// -----------------------------------------------------------------------
// ------------------- INPUTS --------------------------------------------

$(".cell").click(function() {
  $(this).toggleClass("alive");
});

document.onkeydown = function(event) {
  if (event.keyCode === 13) {
    console.log("ENTER");
    if (gameStarted) {
      return;
    } else {
      console.log("LAUNCH GAME");
      launch();
    }
  }
  if (event.keyCode === 32) {
    console.log("SPACE");
    event.preventDefault();
    next();
  }
  if (event.keyCode === 8) {
    console.log("BACKSPACE");
    resetBoard();
    updateCounter();
  }
};

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

// OLD CODE

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
