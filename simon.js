//
// VARIABLES
// The stuff that needs to be tracked during the game
//
var boardButtons = [
  {color:'green', defaultClass:'green-btn', pressedClass:'light-green', sound:'greenSound'},
  {color:'red', defaultClass:'red-btn', pressedClass:'light-red', sound:'redSound'},
  {color:'yellow', defaultClass:'yellow-btn', pressedClass:'light-yellow', sound:'yellowSound'},
  {color:'blue', defaultClass:'blue-btn', pressedClass:'light-blue', sound:'blueSound'}
];
var theSequence = [];
var playerMoves = [];
var userTurn = false;
var strictMode = false;

//
// BUTTON PRESSING AND STYLING
// The stuff that happens when buttons get pushed, like turning the game on and off.
//

// Start Button - changes styling on press and release. Also starts the game if the game is on.
$('.start-btn')
  .mousedown(function () {
    $(this).removeClass('btn-shadow');
    $('.count-box h2').html('--');
  })
  .mouseup(function() {
    // If the game is off, it just changes the button styling
    if($('.on-off-switch').hasClass('off')) {
      $(this).addClass('btn-shadow');
    }
    // If the game is on, the button moves back up and the count-box blinks before the game starts.
    else if(strictMode === false){
      $(this).addClass('btn-shadow');
      countBoxBlinking();
      setTimeout(function() {startGame();}, 1200);
    }
  });

// Strict Button - adjusts styling on presses and turns strict mode on and off
$('.strict-btn')
  .mousedown(function () {
    $(this).removeClass('btn-shadow');
  })
  .mouseup(function() {
    // If the game is off, it just changes the button styling
    if($('.on-off-switch').hasClass('off')) {
      $(this).addClass('btn-shadow');
    }
    else if(strictMode === false) {
      $(this).addClass('btn-shadow strict-btn-on');
      strictMode = true;
    }
    // If the game is on, the button moves back up and the count-box blinks before the game starts.
    else {
      $(this).addClass('btn-shadow').removeClass('strict-btn-on');
      strictMode = false;
    }
  });

// On/Off Switch Styling
$('.on-off-switch').click (function() {
  if($(this).hasClass('off')) {
    $(this).removeClass('off').addClass('on');
    $('.count-box').removeClass('count-off').addClass('count-on');
  }
  else {
    $(this).removeClass('on').addClass('off');
    $('.count-box').removeClass('count-on').addClass('count-off');
    $('.count-box h2').html('--');
  }
});


//
//THE SOUNDS
//
var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

//
// FUNCTIONS
// The meat of the game.
//

/** Simply makes the text in the count-box blink 2 times.
* @countBoxBlinking
*/
function countBoxBlinking() {
  setTimeout(function(){
    $('.count-box').removeClass('count-on').addClass('count-off');
  }, 200);
  setTimeout(function(){
    $('.count-box').removeClass('count-off').addClass('count-on');
  }, 400);
  setTimeout(function(){
    $('.count-box').removeClass('count-on').addClass('count-off');
  }, 600);
  setTimeout(function(){
    $('.count-box').removeClass('count-off').addClass('count-on');
  }, 800);
}

/** Chooses a random number between 0 and 3 to be used in randomly selecting which buttons the computer will add to the theSequence.
* @addToSequence
*/
function addToSequence() {
  theSequence.push(Math.floor(Math.random() * 4));
}

/** Loops through the sequence of colors and creates a string of code that when run, will turn the color buttons on and off in sequence.
* @buildSequenceRunthroughCode
* @param arr - specifically theSequence where the sequence is stored
*/
var sequenceRunthroughCode;
var runSequence;

function buildSequenceRunthroughCode(arr) {
  var codeArr = [];
  var code = '';
  for(i=0; i<arr.length; i++) {
    codeArr.push(code.concat("setTimeout(function() {$('." + boardButtons[arr[i]].defaultClass + "').addClass('" + boardButtons[arr[i]].pressedClass + "'); " + boardButtons[arr[i]].sound + ".play();}, " + (i*1000+200) + ");"+ "setTimeout(function() {$('." + boardButtons[arr[i]].defaultClass + "').removeClass('" + boardButtons[arr[i]].pressedClass + "');}, " + (i+1)*1000 + ");"
  ));
  }
  sequenceRunthroughCode = codeArr.join("");
  runSequence = new Function(sequenceRunthroughCode);
}

/**
*
*/
function updateCountBox(arr) {
  $('.count-box h2').html(arr.length);
}

/** Runs through the initial steps for starting a game.
* @startGame
*/
function startGame() {
  theSequence = [];
  lengthenSequence();
}

/** It clears the playerMoves variable for the next round of user input
* @clearPlayerMoves
*/
function clearPlayerMoves() {
  playerMoves = [];
}

/** Adds a step to the sequence and plays through it for the user
* @lengthenSequence
*/
function lengthenSequence() {
  addToSequence();
  buildSequenceRunthroughCode(theSequence);
  runSequence();
  clearPlayerMoves();
  updateCountBox(theSequence);
  userTurn = true;
}

//Event listener for user pressing colored buttons
// TODO: Add conditionals for whether it is actually the user's turn
$('.color-game-btn').mousedown(function() {
  if(playerTurn === true) {
    if($(this).hasClass('green-btn')) {
      playerMoves.push(0);
      greenSound.play();
    }
    else if($(this).hasClass('red-btn')){
      playerMoves.push(1);
      redSound.play();
    }
    else if($(this).hasClass('yellow-btn')){
      playerMoves.push(2);
      yellowSound.play();
    }
    else if($(this).hasClass('blue-btn')){
      playerMoves.push(3);
      blueSound.play();
    }
}
});

/** Returns true or false. Checks each color button the user presses against theSequence.
* @checkUserInputAgainstSequence
* @param theSequence - the first array is the sequence, which the player moves must exactly match to return true
* @param playerMoves - the second array is the user's input
*/
function checkUserInputAgainstSequence(theSequence, playerMoves) {
  var movesAreCorrect = true;
  for(i=0; i<theSequence.length; i++) {
    if(theSequence[i] !== playerMoves[i]){
      movesAreCorrect = false;
    }
  }
  return movesAreCorrect;
}

// TODO: Then the program for the game runs.
// TODO: The game: First the game chooses a random color. It displays that color and plays corresponding sound.
// TODO: Then it waits for input from the user. While it is the user's turn the user may press any of the color buttons, which switch to a cursor when hovering over them. While pressed the color changes and the sound plays for that color.
// TODO: At each press the button is inputted into an array and compared to the colors given by the computer.
// TODO: At each press if it is correct the user can continue pressing until either they choose a wrong button, or until they complete the sequence. At that point the computer takes over again.
// TODO: If the length of the sequence is 20 and the user completes a sequence, then the user wins.
// TODO: When press start, reset sequenceRunthroughCode to undefined.




//
