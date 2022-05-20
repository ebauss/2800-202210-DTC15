// -------- A code to get current date which will be used for the max date for end-date ------- //
// --- Source: https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today - First comment --- //
nowDate = new Date()
// Gets the current date
currentDate = nowDate.toISOString().split("T")[0];
// Gets the first day of the month
firstDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).toISOString().split("T")[0]

// ----- A customise the JSON data from Emission API chronological orgeer -----
function custom_sort(dataX, dataY) {
    return new Date(dataX.start).getTime() - new Date(dataY.start).getTime()
}

function createChart() {
    let apiUrl = `https://api.v2.emissions-api.org/api/v2/methane/average.json?country=CA&begin=${firstDay}&end=${currentDate}`
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data = data.sort(custom_sort)

            let plotChart = document.getElementById("plot-chart").getContext("2d");
            new Chart(plotChart, {
                type: "bar",
                data: {
                    labels: data.map(info => info.start.substring(8, 10)),
                    datasets: [{
                        label: "CANADA",
                        backgroundColor: '#93bd20',
                        data: data.map(info => info.average),
                    }]
                },

                // Adding few sensible configurations options
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Methane (CH₄)"
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Day"
                            }
                        }]
                    }
                }
            })
        })
}

// -------- All functions for Easter Egg -------- //
const easterEggInitiator = document.getElementById("easter-egg");
const overlay = document.getElementById("overly");
const globe = document.getElementById("globe")
const globeContainer = document.querySelector(".globe-container")

function finale(){
    globeContainer.classList.remove("keep-things-hidden")
}

function whiteOut() {
    overlay.classList.add("white-out")
    globeContainer.classList.remove("keep-things-hidden")
    whiteOutAnimation = document.querySelector(".white-out")
    
    whiteOutAnimation.addEventListener("animationend", () => {
        finale()
    })
}

function blackOut() {
    overlay.classList.add("black-out")
    blackOutAnimation = document.querySelector(".black-out")

    blackOutAnimation.addEventListener("animationend", () => {
        setTimeout(whiteOut, 1000)
    })
}

// Adds the animation of shrinking the OurVision
function hideOurVision() {
    easterEggInitiator.classList.add("remove-our-vision")
    removeOurVision = document.querySelector(".remove-our-vision")

    removeOurVision.addEventListener("animationend", () => {
        // Adds the class where display will be none
        easterEggInitiator.classList.add("keep-things-hidden")
        setTimeout(blackOut, 500)
    })

}

// A function that adds the rainbow effect - FUN!
async function addRainbow() {
    easterEggInitiator.classList.add("rainbow")
    rainbowAnimation = document.querySelector(".rainbow")

    rainbowAnimation.addEventListener("animationend", async () => {
        setTimeout(hideOurVision, 500)
    })
}

// A function that adds the first animation class called move-text
async function easterEgg() {
    overlay.classList.add("dim")
    easterEggInitiator.classList.add("move-texts")

    moveTextAnimation = document.querySelector(".move-texts")

    moveTextAnimation.addEventListener("animationend", () => {
        setTimeout(addRainbow, 500)
    })
}



// -------- closing overlay button -------- //
function crackTheEasterEgg() {
    overlay.classList.remove('dim')
    easterEggInitiator.classList.remove("move-texts")
    easterEggInitiator.classList.remove("rainbow")
    easterEggInitiator.classList.remove("remove-our-vision")
    easterEggInitiator.classList.remove("keep-things-hidden")
    overlay.classList.remove("black-out")
    overlay.classList.remove("white-out")
    globeContainer.classList.add("keep-things-hidden")
}

overlay.addEventListener("click", () => {
    crackTheEasterEgg()
})

// Keeps track of the clicking of OUR VISION
easterEggInitiator.addEventListener("click", (event) => {
    element = event.currentTarget;
    element.clicks = (element.clicks || 0) + 1;

    if (element.clicks == 3) {
        easterEgg()
        element.clicks = 0
    }
})

function setup() {
    createChart()
}

$(document).ready(setup)