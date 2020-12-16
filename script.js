// link to principal question and answer elements of the html
var questionContainer = document.querySelector("#question-container");
var welcomeContainer = document.querySelector("#welcome-container");
var answers = document.querySelectorAll(".answer");

// access each of the sub-sections of the question / answers on the html
var displayQuestion = document.getElementById("question");
var answer1 = document.getElementById("answer-1");
var answer2 = document.getElementById("answer-2");
var answer3 = document.getElementById("answer-3");
var answer4 = document.getElementById("answer-4");
var rightOrWrong = document.getElementById("display-answer");

// timer counts down, 60 sec to 0 sec
var actualTimer = document.getElementById("timer")
var timerDisplay = document.getElementById("score-box")
var secondsLeft = 60;
var timerCountDown;

// track which question you're on in the array of questions
var counter = 0;

// user click button starts the quiz
var startButton = document.querySelector("#startTheQuiz");

var highScoreContainer = document.querySelector("#high-score-container")
var finalScore = document.querySelector("#display-score")
var userNameSubmission = document.querySelector("#name")
var submitBtn = document.querySelector("#submit-btn")


// here are the questions, answer options and correct answers
var quizQuestions = [{
        question: "Who is Joe Exotic?",
        optionA: "A. The lead actor in the award winning movie Parasite.",
        optionB: "B. An extremely successful performance artist in Las Vegas and animal fanatic.",
        optionC: "C. An international criminal that is at large and is wanted by the FBI.",
        optionD: "D. The eccentirc owner of a zoo in Oklahoma that has feud with Carol Baskin and ran for US president in the 2016 election.",
        correctAnswer: "D"
    },
    {
        question: "According to Netflix, how many households viewed the series Tiger King in it's first month of release?",
        optionA: "A. 34 Million",
        optionB: "B. 15 Million",
        optionC: "C. 64 Million",
        optionD: "D. 89 Million",
        correctAnswer: "C"
    },
    {
        question: "This series has emphasized what major issue happening across the United States for decades?",
        optionA: "A. The Corona Virus.",
        optionB: "B. Corporations lobbying for power.",
        optionC: "C. The deepening divide between conservatism and progressivism.",
        optionD: "D. The breeding, trafficking and exploitation of large cats and other exotic animals. ",
        correctAnswer: "D"
    },
    {
        question: "Carole Baskin, the arch nemesis of Joe Exotic, is accused of allegedly commiting what major crime throughout the series?",
        optionA: "A. Illegally trespassing on Joe Exotic's property and stealing some of his animals.",
        optionB: "B. Killing her previous husband by putting him in a meat grinder.",
        optionC: "C. Mistreating her tigers and leaving them out in the cold weather conditions for too long.",
        optionD: "D. Repeated tax evasion and avoiding numerous legal penalties.",
        correctAnswer: "B"
    },
    {
        question: "Doc Antle, big cat trainer and zoo owner has worked with numerous celebrities and major film productions (i.e. Dr. Dolittle, Ace Ventura, The Jungle Book) over the past few decades. He is also know for...",
        optionA: "A. Animal cruelty and wildlife trafficking.",
        optionB: "B. The training of Hedwig the owl in Harry Potter.",
        optionC: "C. His revolutionary performance in the movie Into the Wild.",
        optionD: "D. The abuse of his horses in numerous movies.",
        correctAnswer: "A"
    },
    {
        question: "At one point, Joe Exotic's animal park had how many big cats in captivity?",
        optionA: "A. 48 big cats.",
        optionB: "B. 89 big cats.",
        optionC: "C. 102 big cats.",
        optionD: "D. 187 big cats.",
        correctAnswer: "D"
    }
];

// default with the questions hidden
questionContainer.style.display = "none";
timerDisplay.style.display = "none";
highScoreContainer.style.display = "none";

// user clicks start, welcome message disappears, the question container appears, timer starts, start question function
startButton.addEventListener("click", function () {
    welcomeContainer.style.display = "none";
    questionContainer.style.display = "block";
    timerDisplay.style.display = "block";
    setTimer();
    currentQuestion();
});

// start the timer to count down, if second left = 0 then, clear the interval and queue high score form / next phase
function setTimer() {
    timerCountDown = setInterval(function () {
        secondsLeft--;
        actualTimer.textContent = secondsLeft;
        if (secondsLeft === 0) {
            console.log("timer done")
            clearInterval(timerCountDown)
            questionContainer.style.display = "none";
            highScoreContainer.style.display = "block";
        }
    }, 1000)
};

// cycle through the questions and make them appear on the screen 
function currentQuestion() {
    displayQuestion.textContent = quizQuestions[counter].question;
    answer1.textContent = quizQuestions[counter].optionA;
    answer2.textContent = quizQuestions[counter].optionB;
    answer3.textContent = quizQuestions[counter].optionC;
    answer4.textContent = quizQuestions[counter].optionD;
};

// user response click on the correct answer, if wrong, minus clock by 5 seconds. If 
answers.forEach(function (answerEl) {
    answerEl.addEventListener("click", function (event) {
        var userSelection = event.target.textContent;
        if (userSelection[0] !== quizQuestions[counter].correctAnswer) {
            secondsLeft = secondsLeft - 5;
            rightOrWrong.textContent = ("Wrong! Correct Answer: " + quizQuestions[counter].correctAnswer)
        } else {
            rightOrWrong.textContent = ("Correct!")
        }
        // switch to the next question, then end timer after the final question
        counter++;
        if (counter <= 5) {
            currentQuestion();
        } else {
            clearInterval(timerCountDown)
            questionContainer.style.display = "none";
            highScoreContainer.style.display = "block";
        }

    })
});

// submit your high score 
submitBtn.addEventListener("click", function (event) {
    event.preventDefault()

    var userObject = {
        name: userNameSubmission.value,
        score: secondsLeft
    }
    if (userObject.name === "") {
        displayMessage("error", "Name cannot be blank");
    }
    // store the high score in local storage
    var myListOfHighScoresInLocalStorage = localStorage.getItem("userNameAndHighScore");
    if (myListOfHighScoresInLocalStorage === null) {
        // if there's no high scores yet, create a list for the first time
        myListOfHighScoresInLocalStorage = [userObject]
        localStorage.setItem("userNameAndHighScore", JSON.stringify(myListOfHighScoresInLocalStorage))
    } else {
        // add the new high score
        myListOfHighScoresInLocalStorage = JSON.parse(myListOfHighScoresInLocalStorage);
        myListOfHighScoresInLocalStorage.push(userObject)

        localStorage.setItem("userNameAndHighScore", JSON.stringify(myListOfHighScoresInLocalStorage))
    }

    location.href = "high-score.html";
})