
var level = 0;
var gameStarted = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.random();
  randomNumber *= 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  console.log("gamePattern: "+gamePattern);


}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("wrong");

    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {$("body").removeClass("game-over");}, 200);
    startOver();
  }
}

function startOver() {
  console.log("Start Over");
  level = 0;
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
}

function playSound(name) {
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {$("#"+currentColour).removeClass("pressed");}, 100);
}

$(".btn").click(function (){
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (gameStarted === true) {
  userClickedPattern.push(userChosenColor);
  console.log("userClickedPattern: "+userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
  }
})

$("body").keypress(function () {
  console.log("Keypress");
  if (gameStarted === false) {
    gameStarted = true;
    $("h1").text("Level 0");
    nextSequence();
  }
})
