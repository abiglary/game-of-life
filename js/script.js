var gameStarted = false;

// Click on a cell toggles it to "alive".
//Only necessary BEFORE game starts, then it should be locked somehow (user cannot input again).
$(".cell").click(function() {
  $(this).toggleClass("alive");
});

document.onkeydown = function(event) {
  // Game is launched on hitting 'Enter' key.
  if (event.keyCode === 13) {
    console.log("ENTER");
    if (gameStarted) {
      return;
    } else {
      console.log("LAUNCH GAME");
      launchGame();
    }
  }

  // New generation loaded when hitting 'Space'.
  if (event.keyCode === 32) {
    console.log("SPACE");
    event.preventDefault();
    nextGen();
  }

  // Reset board when hitting 'Backspace'.
  if (event.keyCode === 8) {
    console.log("BACKSPACE");
    resetBoard();
    gameStarted = false;
  }
};

var initialState = [
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,]
];

// Creates a snapShot of the current CSS state of the board into a temporary matrix
function snapShot(matrix) {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if ($("#row" + (i + 1) + "-col" + (j + 1) + "").hasClass("alive")) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = 0;
      }
    }
  }
}

// Action that takes a snapShot of the initial state and launches the "game".
// Only input possibilities from now on : a) iterate to next generation, or b) reset the board.
function launchGame() {
  snapShot(initialState);
  console.log("INITIAL STATE", initialState);
  gameStarted = true;
  nextGen();
}

var currentState = [
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,]
];

var nextState = [
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,]
];

// Launches new iteration on whole board
function nextGen() {
  snapShot(currentState);
  console.log("CURRENT STATE", currentState);

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var adj = countAdj(currentState, i, j);
      if (adj >= 3) {
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
}

// Counts adjacent "alive" cells & return number
function countAdj(matrix, i, j) {
  var adj = 0;

  // 1: index is in the "middle" of the matrix
  if (i > 0 && i < 9 && j > 0 && j < 9) {
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
  else if (i === 0 && j > 0 && j < 9) {
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
  else if (i === 9 && j > 0 && j < 9) {
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
  else if (i > 0 && i < 9 && j === 0) {
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
  else if (i > 0 && i < 9 && j === 9) {
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
  else if (i === 0 && j === 9) {
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
  else if (i === 9 && j === 9) {
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
  else if (i === 9 && j === 0) {
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

var nextState = [
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,],
  [, , , , , , , , ,]
];

// Redraws the entire board (adds or removes "alive" class when necessary)
function reDraw() {
  console.log("REDRAWING");
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (nextState[i][j] === 1) {
        $("#row" + (i + 1) + "-col" + (j + 1) + "").addClass("alive");
      } else if (nextState[i][j] === 0) {
        $("#row" + (i + 1) + "-col" + (j + 1) + "").removeClass("alive");
      }
    }
  }
  //reInitialize(currentState);
  //reInitialize(nextState);
}

// ReInitialize all values of a matrix to 0
function reInitialize(matrix) {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      matrix[i][j] = 0;
    }
  }
}

//-------------------------------------

// declaring variable of alive cells
var alive = $(".alive");

// close icon in modal
var closeicon = $(".close");

// declare modal
var modal = $(".popup");

function startGame() {
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  // reset moves
  moves = 0;
  counter.innerHTML = moves;
  // reset rating
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }
  //reset timer
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}

// @description toggles open and show class to display cards
var displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
}

// @description when cards match
function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}

// description when cards don't match
function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function() {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
}

// @description disable cards temporarily
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add("disabled");
  });
}

// @description enable cards and disable matched cards
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

// @description count player's moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  // setting rates based on moves
  if (moves > 8 && moves < 12) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 13) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // show congratulations modal
    modal.classList.add("show");

    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    //closeicon on modal
    closeModal();
  }
}

// @description close icon on modal
function closeModal() {
  closeicon.addEventListener("click", function(e) {
    modal.classList.remove("show");
    startGame();
  });
}

// @desciption for user to play Again
function playAgain() {
  modal.classList.remove("show");
  startGame();
}

/*
// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
}
*/
