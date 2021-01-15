//Questions for Quiz Arrays    
const questions = [{
    title: "Which of the following is an advantage of using JavaScript?",
    choices: ["Less server interaction( )", "Immediate feedback to the visitors( )", " Increased interactivity( )", "All of the above( )"],
    answer: "All of the above( )"
},
{
    title: "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
    choices: ["getIndex( )", "location(( )", "indexOf( )", " None of the above( )"],
    answer: "indexOf( )"
},
{
    title: " Which built-in method returns the characters in a string beginning at the specified location?",
    choices: ["substr( )", "getSubstring( )", "slice( )", "None of the above."],
    answer: "substr( )"
},
{
    title: "Which built-in method returns the calling string value converted to upper case?",
    choices: ["toUpperCase( )", "toUpper( )", "changeCase( )", "None of the above( )"],
    answer: "toUpperCase( )"
},
{
    title: "Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )"
}
]
// Variables
let score = 0;
let currentQuestion = -1;
let timeLeft = 0;
let timer;

//Start button
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//End Quiz 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2> TIME UP!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First and Last Name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("main-quiz").innerHTML = quizContent;
}

//Score Results
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("main-quiz").innerHTML = quizContent;
}

function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    JavaScript Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("main-quiz").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
score += 20;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("main-quiz").innerHTML = quizContent;
}