var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
function nextSequence()
{
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $("#level-title").text("Level "+level);
    $("#"+ randomChosenColor).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);
    userClickedPattern = [];
}
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkUserPattern(userClickedPattern.length-1);
})
function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
$(document).keydown(function(){
    if(level == 0) {
        gamePattern=[];
        nextSequence();
    }
})
function checkUserPattern(index)
{
    if(gamePattern[index] === userClickedPattern[index]) 
    {
        if(gamePattern.length == userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else
    {
        $("#level-title").text("Game Over. Press any key to restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        level=0;
    }
}
