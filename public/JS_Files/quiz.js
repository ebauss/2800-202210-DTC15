
const scoreText = document.getElementById("user-score")
let score = 0
let quizNumber = 0

// allows to run this application automatially on open window
window.onload = sendApiRequest


let quizChoice = document.querySelectorAll('.answer')
var correct = ""


function isCorrect(playerAnswer) {
    console.log("made to correct")
    console.log(correct)
    if (playerAnswer == correct) {
        console.log(true)
        changeColor = $(playerAnswer).prevObject[0].activeElement.style.backgroundColor = "green";
        score += 1;

        console.log(score)
    } else {
        changeColor = $(playerAnswer).prevObject[0].activeElement.style.backgroundColor = "red"
        console.log(false)
    }


    $(playerAnswer).prevObject[0].activeElement.style.backgroundColor = "rgba(44, 169, 226, 0.568))";
    quizNumber += 1;
    sendApiRequest()


}

quizChoice.forEach(choice => {
    choice.addEventListener("click", () => {
        playerAnswer = choice.lastChild.innerHTML
        isCorrect(playerAnswer)
    })

})



// ---------the API ----------------//
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

    document.querySelector(".quiz-number").innerHTML = "Question " + (quizNumber + 1)

    document.querySelector(".quiz-question").innerHTML = data.results[0].question
    document.querySelector(".answer1").innerHTML = data.results[0].correct_answer
    document.querySelector(".answer2").innerHTML = data.results[0].incorrect_answers[0]
    document.querySelector(".answer3").innerHTML = data.results[0].incorrect_answers[1]
    document.querySelector(".answer4").innerHTML = data.results[0].incorrect_answers[2]

    document.querySelector(".user-score").innerHTML = score+"/10"

}

const mainMenuSection = document.getElementById('quiz-menu')
const quizContainerSection = document.getElementById('quiz-container')
const exitButton = document.getElementById('return-home')
const startButton = document.getElementById('start-btn')
const closeButton = document.getElementById('close-quiz')

startButton.addEventListener('click', () => {
    mainMenuSection.style.display = 'none';
    quizContainerSection.style.display = 'block'
})

closeButton.addEventListener('click', () => {
    mainMenuSection.style.display = 'block';
    quizContainerSection.style.display = 'none'
})


// function startQuiz() {
   

//     // display menu

//     // on start display question
// }



// function setup() {
//     startQuiz()
// }


// $(document).ready(setup)