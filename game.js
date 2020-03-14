var buttonColors = ["red","green","blue","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

function start(){
  if (!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
}

$(document).keypress(start);
$("button").click(start);


$(".btn").click(function(){
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern.length);
});


function checkAnswer(currentlevel){
  if (userClickedPattern[currentlevel]===gamePattern[currentlevel]){
    if (userClickedPattern.length===gamePattern.length){
      setTimeout(nextSequence,1000);
    }
}else{
  wrong();
}
}


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}


function playSound(name){
  var audio = new Audio("sounds/" +name + ".mp3");
  audio.play();
}


function animatePress(currentColor){
  colorID = "."+currentColor;
  $(colorID).addClass("pressed");
  setTimeout(function(){ $(colorID).removeClass("pressed"); }, 100);
}

function wrong(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){ $("body").removeClass("game-over"); }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  $("button").text("Restart Game");
  startover();
}
function startover(){
  level = 0;
  gamePattern = [];
  started = false;
}
