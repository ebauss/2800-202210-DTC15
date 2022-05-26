
// ------------- Progress Game ------------- //
const scoreText = document.getElementById('user-score')
let quizChoice = document.querySelectorAll('.answer')
var best = ''
var last = ''
let score = null
let quizNumber = 0
var maxQuestions = 10
var correct = ''

// allows to run this application automatially on open window
window.onload = sendApiRequest

// this checks if the player gave the right answer and add it if true
function isCorrect(playerAnswer,choice) {
    
    console.log('made to correct')
    console.log(quizChoice)
    if (playerAnswer == correct) {
        // console.log(true)
        document.querySelector('.correct').style.backgroundColor = 'green';
        score += 1;

        // console.log(score)
    } else {
        // console.log(document.querySelector('.answer'))
        // document.getElementsByClassName('incorrect').forEach(btn => {
        //     btn.addEventListener("click", () => {
        //         $(this).style.backgroundColor = 'red';
        //     })
        // })
        $(playerAnswer).prevObject[0].activeElement.style.backgroundColor = 'red'
        // console.log(false)
    }

    setTimeout(function() {
        quizNumber += 1; 
        // quizChoice.style.background = 'rgba(44, 169, 226, 0.568)';
        // playerAnswer.prevObject[0].activeElement.style.backgroundColor = 'rgba(44, 169, 226, 0.568)';

        var elements = document.getElementsByClassName('answer'); // get all elements
	    for(var i = 0; i < elements.length; i++){
		elements[i].style.backgroundColor = "rgba(44, 169, 226, 0.568)";
	}
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
// function updateStats(){
//     last = score
//     score = 0
//     quizNumber = 0
//     startQuiz()
//     // window.location.replace('http://localhost:3000/main.html');
// }

function startQuiz (){
    console.log('3. Filled in score details on the start screen');
    document.querySelector('.last-score').innerHTML = last
    document.querySelector('.best-score').innerHTML = best
    score = 0
   
    sendApiRequest()
}



// ------------- The API ------------- //
// fetching data from Open Trivia API.
async function sendApiRequest() {
    let response = await fetch('https://opentdb.com/api.php?amount=1&category=17&difficulty=easy&type=multiple');
    // console.log(response)
    let quizData = await response.json()
    // console.log(data)
    useApiData(quizData)
}

function useApiData(data) {
    correct = data.results[0].correct_answer
    // console.log(correct)
    // $(".answer").removeAttr('disabled')
    document.querySelector(".answer").enable
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
        document.querySelector(".answer").disable
        // $(".answer").attr('disabled','disabled')
        isCorrect(playerAnswer,choice)
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
        document.querySelector('.promter').innerHTML= "You've completed the quiz! Your score:" + score + ' Do you want to go back to the main menu?'
        choice()
    }
}

function choice(){
    no.addEventListener('click', () => {
        overlay.classList.remove('dim')
        popup.classList.remove('active')
    })

    yes.addEventListener('click', () => {
        mainMenuSection.style.display = 'block';
        quizContainerSection.style.display = 'none';
        overlay.classList.remove('dim')
        popup.classList.remove('active')    
    })
    
    requestHighscoreUpdate()
    requestHighscore()
}

// log a console message depending on whether highscore was updated
function processHighscoreUpdate(data) {
    console.log('1. Your highscore has been updated serverside')
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
            'score': score
        },
        success: processHighscoreUpdate
    })
}

// processes the user's highscore
function displayHighscore(data) {
    if (data == 'signed out') {
        console.log('Sign in to save your highscore.'); // replace this line with a dialog box or something
    }
    else {
        console.log('2. Your highscore has been retrieved clientside');
        best = data[0].quiz_highscore
        last = score
        quizNumber = 0
        startQuiz()
    }
}

// request user's highscore from the server
function requestHighscore() {
    $.ajax({
        url: 'http://localhost:3000/getHighscore',
        type: 'GET',
        success: displayHighscore
    })
}

function setup(){
    requestHighscoreUpdate()
    requestHighscore()

}


$(document).ready(setup)