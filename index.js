
var gamePattern=[];
var userClickedPattern =[];
var level = 0;
var started = false;
var currentLevel = 0;
//colors of buttons
const buttonColors=["red","blue","green","yellow"];

//for button sound
function playSound(inputChosenColor){
    let buttonAudio=new Audio("sounds/"+inputChosenColor+".mp3");
    buttonAudio.play();
}

//for button animation
function animatePress(inputChosenColor){
    $("#"+inputChosenColor).fadeIn(75).fadeOut(75).fadeIn(75);
    $("#"+inputChosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+inputChosenColor).removeClass("pressed");
    },75);
}

//starting over
function startOver() {
    
    //resetting values
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
}

//functions for wrong
function wrong(){
    //game over animation
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    $("h1").text("Game Over");
    setTimeout(function(){
        $("body").removeClass("game-over");
        $("h1").text("press any key to continue");
    },1000);
    
    startOver();
}

//checking answers
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        wrong();
    }
 }

//buttom animation and sound for user button click
$(".btn").click(function(){
    let userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//to chose a random color
function nextSequence(){
    userClickedPattern=[];
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $("h1").text("Level "+level);
    
    $("#"+randomChosenColor).fadeIn(75).fadeOut(75).fadeIn(75);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);

}
//game restart after keypress
$(document).keypress(function(){
    if(!started){
        nextSequence();
        started=true;
    }
    
})
