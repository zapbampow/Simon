//
// BUTTON PRESSING AND STYLING
// The stuff that happens when buttons get pushed, like turning the game on and off.
//

// Mousedown Style Changes - makes it look like button is going up and down.
$('.start-btn, .strict-btn')
  .mousedown(function () {
    $(this).removeClass('btn-shadow');
  })
  .mouseup(function() {
    // If the game is off, it just changes the button styling
    if($('.on-off-switch').hasClass('off')) {
      $(this).addClass('btn-shadow');
    }
    // If the game is on, the button moves back up and the count-box blinks before the game starts.
    else {
      console.log("start-btn up while .on-off-switch hasClass 'on'");
      $(this).addClass('btn-shadow');
      countBoxBlinking();
      // setTimeOut(startGame, 1000);
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
  }
});

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
var computerArr = [1, 2, 0, 3];
var playerMoves = [];

//
//THE SOUNDS
//
// var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
// var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
// var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
// var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

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

/** Chooses a random number between 0 and 3 to be used in randomly selecting which buttons the computer will add to the computerArr.
* @addToSequence
*/
function addToSequence() {
  computerArr.push(Math.floor(Math.random() * 4));
}


/** Loops through the sequence of colors and creates a string of code that when run, will turn on and off the buttons in sequence.
* @buildSequenceCode
* @param arr - specifically computerArr where the sequence is stored
*/
var sequenceCode;

function buildSequenceCode(arr) {
  var codeArr = [];
  var code = '';
  for(i=0; i<arr.length; i++) {
    codeArr.push(code.concat("setTimeout(function() {$('." + boardButtons[arr[i]].defaultClass + "').addClass('" + boardButtons[arr[i]].pressedClass + "');}, " + (i*1000+200) + ");"+ "setTimeout(function() {$('." + boardButtons[arr[i]].defaultClass + "').removeClass('" + boardButtons[arr[i]].pressedClass + "');}, " + (i+1)*1000 + ");"
  ));
  }
  sequenceCode = codeArr.join("");
//   arr.reduce(function (acc, cur, curInd) {
//     code = precode.concat("$('." + boardButtons[cur].defaultClass + "').addClass(" + boardButtons[cur].pressedClass + ");"+ "setTimeout(function() {$('.'" + boardButtons[cur].defaultClass + ").removeClass(" + boardButtons[cur].pressedClass + ");}, " + (curInd+1)*1000 + ");)});"
//   );}
// );
}




// TODO: If "on", when you click "Start", the count-box blinks 2 times.
// TODO: Then the program for the game runs.
// TODO: The game: First the game chooses a random color. It displays that color and plays corresponding sound.
// TODO: Then it waits for input from the user. While it is the user's turn the user may press any of the color buttons, which switch to a cursor when hovering over them. While pressed the color changes and the sound plays for that color.
// TODO: At each press the button is inputted into an array and compared to the colors given by the computer.
// TODO: At each press if it is correct the user can continue pressing until either they choose a wrong button, or until they complete the sequence. At that point the computer takes over again.
// TODO: If the length of the sequence is 20 and the user completes a sequence, then the user wins.
// TODO: When press start, reset sequenceCode to undefined.




//
