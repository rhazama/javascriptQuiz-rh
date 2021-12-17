const questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            { text: 'strings', correct: true},
            { text: 'booleans', correct: false},
            { text: 'alerts', correct: false},
            { text: 'numbers', correct: false}
        ]
    },
    {
        question: 'The condition in an if / else statement is enclosed with ____.',
        answers: [
            { text: 'quotes', correct: true},
            { text: 'curly brackets', correct: false},
            { text: 'parethesis', correct: false},
            { text: 'square brackets', correct: false}
        ]
    },
    {
        question: 'Arrays in Javascript can be used to store ____.',
        answers: [
            { text: 'numbers and strings', correct: true},
            { text: 'other arrays', correct: false},
            { text: 'booleans', correct: false},
            { text: 'all of the above', correct: false}
        ]
    },
    {
        question: 'String values must be enclosed within ____ when being assiged to variables',
        answers: [
            { text: 'commas', correct: true},
            { text: 'curly brackets', correct: false},
            { text: 'quotes', correct: false},
            { text: 'parenthesis', correct: false}
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: 'Javascript', correct: true},
            { text: 'Terminal/bash', correct: false},
            { text: 'for loops', correct: false},
            { text: 'console log', correct: false}
        ]
    }
]
const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const controlDiv = document.querySelector('.controls')
const headOfDisplay1 = document.querySelector('.headOfDisplay-item1')
const headOfDisplay2 = document.querySelector('.headOfDisplay-item2')
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var timeEl = document.querySelector('#time');

startButton.addEventListener('click', startGame)

function startGame() {
    console.log('started')
    controlDiv.classList.add('hide')
    startButton.classList.remove('hide')
    headOfDisplay1.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    questionContainerElement.classList.remove('hide')
    timerId = setInterval(clockTick, 1000)
    timeEl.textContent = time;
    setNextQuestion()
}

function clockTick() {
    time--;
    timeEl.textContent = time;
    console.log(time)
    if(time <= 0) {
        console.log('quiz Over')
        quizOver()
    }
}

function setNextQuestion() {
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text
        button.setAttribute("class", "btn");
        button.setAttribute('value', answer.correct)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        questionElement.appendChild(button)
    })
}

function setStatusClass(element, correct) {
    console.log(element, correct)
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    console.log(element)
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.getAttribute('value')
    if(correct === 'false') {
        // minus time
        time-= 15;
        if(time <0) {
            time = 0;
        }
        timeEl.textContent = time;
    } 
    currentQuestionIndex ++;
    console.log(correct)
    if(currentQuestionIndex === questions.length) {
        quizOver()
    } else {
        setNextQuestion()
    }
}

function quizOver() {
    clearInterval(timerId);
    console.log('quizOver')
    // Hide the questions container by adding a hide class
    questionContainerElement.classList.add('hide')
    headOfDisplay1.classList.add('hide')
    headOfDisplay2.classList.remove('hide')
    // Show the End Screen with the form to fill out highscore with initials
    //creating input
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.textContent = "";
    clearInterval.appendChild(inputEl)

    //creating submit
    var submitEl = document.createElement("btn");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("class", "btn");
    submitEl.textContent = "Submit";
    // Highscore can just be time left
    
    // Add Save HighScore Function
    // Set a var to the value of the input field
    // var highScores = JSON.parse(window.localStorage.getItem('highscores')) || [];
    // var newScore = {
    //    score: time,
    //    initials: initials
    //}
    submitEl.addEventListener("click", function saveHighScore() {
        var initials = inputEl.value;

        if (initials === null) {
            alert("Enter your initials");
        } else {
            var totalScore = {
                initials: inputEl.value,
                score: time
            }
        }
        console.log(totalScore);
        var userScores = localStorage.getItem("userScores");
        if (userScores === null) {
            userScores = [];
        } else {
            userScores = JSON.parse(userScores);
        }
        // push new score into highscores array
        userScores.push(totalScore);
        userScores.sort((a, b) => b.score - a.score);
        // set localstorage with the new highscores array
        var updateScore = JSON.stringify(userScores);
        localStorage.setItem("userScores", updateScore);
        // replace window location with highscores html
        window.location.replace("highscore.html")
    });
}