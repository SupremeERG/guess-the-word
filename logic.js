// GLOBAL VARIABLES (accessible by all functions)
// ==================================================================================================

// Array of Word Options (all lowercase)
var wordsList = ["jerome", "neena", "darion", "lou", "greg", "jordan",
  "jasmine", "stephen", "jacob", "adam", "rui", "luis"];
// Solution will be held here.
var chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
// This will break the solution into individual letters to be stored in array.
var lettersInChosenWord = chosenWord.split("");
// This will be the number of blanks we show based on the solution
var blanks = genBlanks(lettersInChosenWord.length).join(' ');
$('#word-blanks').text(blanks)
// Holds all of the wrong guesses
var wrongGuesses = [];

//keys to be ignored
var ignored = ["control", "{", "}", "[", "]", "/", "\\", "|", ".", ",", "'", '"', ";", ":", "*", "!", "@", "#", "$", "%", "^", "&", "(", ")",
  "-", "_", "=", "+", "shift", "enter", "?", "alt",
  "<", ">", "capslock", "`", "~", "escape", "arrowup",
  "arrowdown", "arrowright", "arrowleft"]
// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

$('#guesses-left').text(numGuesses);

// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// =========================================================================================
function genBlanks(len, index, char, existing) {
  if (len != null) {
    var blanks = "";
    if (index == null && char == null) {
      for (i = 0; i < len; i++) {
        blanks += "_ ";
      }
      blanks = blanks.split(' ');
      blanks.pop();
      return blanks;
    }
    else {
      for (i = 0; i < len; i++) {
        blanks += "_ "
      }
      blanks = blanks.split(' ')
      blanks[index] = char;
      blanks.pop()
      return blanks;
    }
  }
  else {
    var arr = existing.split(' ');
    arr[index] = char;
    return arr;
  }
}
function findPositions(first, second) {
  const indicies = [];
  first.forEach((element, index) => {
    if (second.includes(element)) {
      indicies.push(index);
    };
  });
  return indicies;
};
function run(e) {
  var indexes = findPositions(lettersInChosenWord, [e.key])
  if (i == 0) {
    // check if game started
    i++;
    $('.jumbotron').remove();
    $('.row').css('margin-top', '25px')
  }
  else {

    if (numGuesses == 0) return;
    findPositions(lettersInChosenWord, [e.key]).forEach(index => {
      if (guessed.indexOf(e.key) != -1) return;
      var elem = $('#word-blanks').text();
      // check how many indexes of certain letters there are
      if (index != -1) {
        var newBlanks = genBlanks(null, index, e.key, elem).join(' ');
        // set the blanks after correct key is chosen
        $('#word-blanks').text(newBlanks);
      }
    })
    // stop if special key is presses
    if (ignored.indexOf(e.key.toLowerCase()) != -1) return;
    if (indexes.length == 0 && guessed.indexOf(e.key) == -1) wrongGuesses.push(e.key);
    guessed.push(e.key)
    numGuesses--;
    $('#wrong-guesses').text(wrongGuesses.join(', '));
    $('#guesses-left').text(numGuesses);
  }
  if (lettersInChosenWord.join("") === $('#word-blanks').text().split(" ").join("")) {
    // ..add to the win counter & give the user an alert.
    winCounter++;
    alert("You win!");

    // Update the win counter in the HTML & restart the game.
    $("#win-counter").text(winCounter)
    startGame();
  }

  // If we've run out of guesses..
  else if (numGuesses === 0) {
    // Add to the loss counter.
    lossCounter++;
    // Give the user an alert.
    alert("You lose");

    // Update the loss counter in the HTML.
    $('#loss-counter').text(lossCounter);
  }


}
function startGame() {
  numGuesses = 9;
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  lettersInChosenWord = chosenWord.split("")
  wrongGuesses = [];
  blanks = genBlanks(lettersInChosenWord.length).join(' ');
  guessed = [];

  $('#wrong-guesses').text(wrongGuesses.join(', '));
  $('#guesses-left').text(numGuesses);
  $('#word-blanks').text(blanks);
}

var i = 0;
var guessed = []
$(document).on('keyup', run)