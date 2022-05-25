
// ------------- Progress Game ------------- //
const scoreText = document.getElementById('user-score')
let quizChoice = document.querySelectorAll('.answer')
var best = ''
var last = ''
let score = 0
let quizNumber = 0
var maxQuestions = 10
var correct = ''
document.querySelector('.last-score').innerHTML = last
document.querySelector('.best-score').innerHTML = best

// allows to run this application automatially on open window
window.onload = sendApiRequest


// this checks if the player gave the right answer and add it if true
function isCorrect(playerAnswer) {
    console.log('made to correct')
    console.log(correct)
    if (playerAnswer == correct) {
        console.log(true)
        $(playerAnswer).prevObject[0].activeElement.style.backgroundColor = 'green';
        score += 1;

        console.log(score)
    } else {
        $(playerAnswer).prevObject[0].activeElement.style.backgroundColor = 'red'
        console.log(false)
    }

    setTimeout(function() {
        $(playerAnswer).prevObject[0].activeElement.style.backgroundColor = 'rgba(44, 169, 226, 0.568)';
        quizNumber += 1; 
    },100)

    setTimeout(function(){
        nextQuestion()
    },125)
}

// wether the game is over or not
function nextQuestion(){
    if (quizNumber < maxQuestions ){
        sendApiRequest()
    }else{
        prompt()
    } 
}

// update stats and return to main
function updateStats(){
    if (score > best){
        best = score
    }
    last = score
    score = 0
    quizNumber = 0
    startQuiz()
    // window.location.replace('http://localhost:3000/main.html');
}

function startQuiz (){
    document.querySelector('.last-score').innerHTML = last
    document.querySelector('.best-score').innerHTML = best
    sendApiRequest()
}



// ------------- The API ------------- //
// fetching data from Open Trivia API.
async function sendApiRequest() {
    let response = await fetch('https://opentdb.com/api.php?amount=1&category=17&difficulty=easy&type=multiple');
    // console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}

function useApiData(data) {
    correct = data.results[0].correct_answer
    console.log(correct)
    $(".answer").removeAttr('disabled')
    // document.querySelector('.best-score').innerHTML = (score * 10)
    document.querySelector('.quiz-number').innerHTML = 'Question ' + (quizNumber + 1)

    document.querySelector('.quiz-question').innerHTML = data.results[0].question
    document.querySelector('.answer1').innerHTML = data.results[0].correct_answer
    document.querySelector('.answer2').innerHTML = data.results[0].incorrect_answers[0]
    document.querySelector('.answer3').innerHTML = data.results[0].incorrect_answers[1]
    document.querySelector('.answer4').innerHTML = data.results[0].incorrect_answers[2]
    
    document.querySelector('.user-score').innerHTML = score + '/' + maxQuestions
}


// ------------- Exit controls ------------- //
const mainMenuSection = document.getElementById('quiz-menu')
const quizContainerSection = document.getElementById('quiz-container')

const exitButton = document.getElementById('return-home')
const startButton = document.getElementById('start-btn')
const endButton = document.getElementById('end-quiz')

const overlay = document.getElementById('overlay')
const popup = document.getElementById('popup-container')

const no = document.getElementById('no')


startButton.addEventListener('click', () => {
    mainMenuSection.style.display = 'none';
    quizContainerSection.style.display = 'block'
})

endButton.addEventListener('click', () => {
    prompt(endButton)
})

quizChoice.forEach(choice => {
    choice.addEventListener('click', () => {
        playerAnswer = choice.lastChild.innerHTML
        $(".answer").attr('disabled','disabled')
        isCorrect(playerAnswer)
    })
})

function prompt (id) {
    console.log(endButton)
    if (id == endButton){
        overlay.classList.add('dim')
        popup.classList.add('active')
        document.querySelector('.promter').innerHTML= 'Are you sure you want to quit? \n Your progress will not be saved.'
        choice()
    } else{
        overlay.classList.add('dim')
        popup.classList.add('active')
        document.querySelector('.promter').innerHTML= "You've completed the quiz! Your score:" + score + ' Do you want to play again?'
        choice()
    }
}

function choice(){
    yes.addEventListener('click', () => {
        overlay.classList.remove('dim')
        popup.classList.remove('active')
        updateStats()
    })
    
    no.addEventListener('click', () => {
        updateStats()
        mainMenuSection.style.display = 'block';
        quizContainerSection.style.display = 'none';
        overlay.classList.remove('dim')
        popup.classList.remove('active')
    })
}

// log a console message depending on whether highscore was updated
function processHighscoreUpdate(data) {
    switch (data) {
        case 'signed out':
            console.log('Sign in to save your highscore.');
            break;
        case 'replaced':
            console.log('Your highscore was replaced with a new best.');
            break;
        case 'not replaced':
            console.log('Your highscore was not replaced.');
            break;
    }
}

// request server to update user's highscore if neccessary
function requestHighscoreUpdate() {
    $.ajax({
        url: 'http://localhost:3000/compareHighscore',
        type: 'POST',
        data: {
            'score': score // replace 0 with the variable for the user's score
        },
        success: processHighscoreUpdate
    })
}