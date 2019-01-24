// -----------------------------------------------------------------------
// ------------------ VARIABLES ------------------------------------------

var gameStarted = false;
var generations = 0;
var size = 30;
var sizeChanged = false;
var initialState = generateGrid(size);
var currentState = generateGrid(size);
var nextState = generateGrid(size);
//var cells = $(".cell");
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
var musics = [
  "./mp3/beethoven-ode_to_joy.mp3",
  "./mp3/rondo.ogg",
  "./mp3/wagner-valkyries.ogg",
  "./mp3/strauss-zarathustra.ogg",
  "./mp3/bumblebee.ogg"
];
var ref = Math.floor(Math.random() * musics.length);
var randomMusic = musics[ref];
var alive = $(".alive");
var autogame = false;
var counter = $(".counter");

// -----------------------------------------------------------------------
// ------------------ FUNCTIONS DECLARATIONS -----------------------------

// generate array once given a defined size
function generateBoard(size) {
  $("#board").empty();
  for (var i = 0; i < size; i++) {
    $("#board").append($("<div>", { class: "row", id: "row" + i }));
    for (var j = 0; j < size; j++) {
      $("#row" + i + "").append(
        $("<div>", { class: "cell", id: "row" + i + "-col" + j })
      );
    }
  }
  initialState = generateGrid(size);
  currentState = generateGrid(size);
  nextState = generateGrid(size);

  if (sizeChanged) {
    $(".cell").on("click", event => {
      console.log("REDEFINED CLICK FUNCTION 2");
      console.log(event);
      console.log(event.target);
      console.log(event.currentTarget);
      $(event.target).toggleClass("alive");
    });
  }
}

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
      if ($("#row" + i + "-col" + j + "").hasClass("alive")) {
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
  console.log("MUSIC: ", audio);
  audio.play();
  if (ref === 0) {
    audio.currentTime = 205;
  } else if (ref === 3) {
    audio.currentTime = 17;
  }

  autogame = true;

  var intervalId = setInterval(function() {
    next();
    alive = $(".alive");
    if (alive.length === 0) {
      clearInterval(intervalId);
      autogame = false;
    }
  }, 100);
}

// moves up to a next generation
function next() {
  if (generations === 0) {
    snapshot(initialState);
  }
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
        $("#row" + i + "-col" + j + "").addClass("alive");
      } else if (nextState[i][j] === 0) {
        $("#row" + i + "-col" + j + "").removeClass("alive");
      }
    }
  }
  if (!autogame) {
    sound();
  }
  //congrats();
}

function updateCounter() {
  counter.html(generations);
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
  generations = 0;
  gameStarted = false;
  draw();
}

// triggers sounds at each iteration
function sound() {
  for (var i = 0; i < size; i++) {
    if (nextState[i].indexOf(1) > 0) {
      var q = Math.floor(i / 7) + 3;
      var r = i % 7;
      Synth.setVolume(0.4);
      Synth.play(0, notes[r], q, 2);
    }
  }
}

// randomly selected music
document.getElementById("audioDiv").innerHTML =
  '<audio id="audioPlayer" src=' + randomMusic + ">";
var audio = document.getElementById("audioPlayer");

//---------------------------------------------------------------------------------------------
//---------------------------- INITIALIZATION -------------------------------------------------

// generate board with default size (30)
generateBoard(size);

// displays modal on page load
$(window).on("load", function() {
  $("#size-modal").modal("show");
});

// inputs new size
$("#apply-size").on("click", function(event) {
  if ($("#new-size").val() < 1) {
    alert("Incorrect value - has to be > 0");
  } else {
    sizeChanged = true;
    size = $("#new-size").val();
    generateBoard(size);
  }
});

//---------------------------------------------------------------------------------------------

// OLD CODE

// CONGRATULATIONS : shown if reaches >100 generations
function congrats() {
  if (generations >= 100 && alive.length > 0) {
    modal.addClass("show");

    //closeicon on modal
    closeModal();
  }
}

//  play Again
function playAgain() {
  modal.removeClass("show");
  resetBoard();
}

// -----------------------------------------------------------------------
// ------------------- INPUTS --------------------------------------------

$(".cell").on("click", event => {
  console.log("REDEFINED CLICK FUNCTION");
  console.log(event);
  console.log(event.target);
  console.log(event.currentTarget);
  $(event.target).toggleClass("alive");
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
