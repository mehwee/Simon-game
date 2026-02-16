const buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var userIndex;

$("body").keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence(){
    userClickedPattern = [];
    userIndex=-1;
    level++;
    $("#level-title").html("Level " + level);  

    var randomNumber = (Math.floor(4 * Math.random()));
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    console.log(gamePattern);
}
  

$(".btn").click(function(event){
    userIndex++;
    handler($(this).attr('id'));
});

  
function handler(event){
    var userChosenColour = event;
    userClickedPattern.push(userChosenColour);
    animatePress($(this).attr('id'));
    playSound(userChosenColour);

    if(userClickedPattern[userIndex] != gamePattern [userIndex]){
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html("Game over! Press 'A' to start over!");  
        startOver();
    }else{
        if(userIndex + 1 == gamePattern.length){
            setTimeout(nextSequence,1000);
        }
    }
    
}

function playSound(key){
    $("#" + key).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){$("#" + currentColor).removeClass("pressed")} , 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}