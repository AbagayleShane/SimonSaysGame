// Creating Button Color List
var buttonColors = ["purple", "orange", "blue", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Starting The Game
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("h2").hide();
  }
});

// Start Game Over
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

// Listening for Player's Button Click
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // Logging Button's color
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Checking User Choice Against Computer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        //Placing Delay on Next Randomly Generated Button Choice
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over!");
    $("h2").show();
    startOver();
  }
}

// Main Sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); // Generating Random Number
  var randomChosenColor = buttonColors[randomNumber]; // Creating Random Color
  gamePattern.push(randomChosenColor); // Add Color to Game Pattern

  $("#" + randomChosenColor) // Add Flash to Buttons
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

// Adding Sound to User Button Clicks
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Add Audio to Buttons
  audio.play();
}

// Animating User Clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
