// -------- A code to get current date which will be used for the max date for end-date ------- //
// --- Source: https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today - First comment --- //
nowDate = new Date()
// Gets the current date
currentDate = nowDate.toISOString().split("T")[0];
// Gets the first day of the month
firstDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).toISOString().split("T")[0]
console.log()
// ----- A customise the JSON data from Emission API chronological order ----- //
function customSort(dataX, dataY) {
    return new Date(dataX.start).getTime() - new Date(dataY.start).getTime()
}

// Function that gets the current month
function currentMonth(){
    const month = new Date().toLocaleString("default", {
        month: "long"})

        document.getElementById("month").innerHTML = month
}

// Creates the chart the desgin is from https://emissions-api.org/examples/chart.js
function createChart() {
    let apiUrl = `https://api.v2.emissions-api.org/api/v2/methane/average.json?country=CA&begin=${firstDay}&end=${currentDate}`
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data = data.sort(customSort)

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
                    // maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                autoSkip: true,
                                labelString: "Methane (CH???)"
                            },
                            ticks: {
                                backdropPadding: {
                                    y: 4
                                }
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
// ---------------------------------------------- //
// -------- All functions for Easter Egg -------- //
// ---------------------------------------------- //

// ----- Important variables ----- //
const easterEggInitiator = document.getElementById("easter-egg");
const overlay = document.getElementById("overly");
const globe = document.getElementById("globe")
const globeContainer = document.querySelector(".globe-container")
const easterEggExit = document.getElementById("exit")

// A function that adds the final classlist and shows the pulsating Earth
function finale(){
    easterEggExit.classList.add("fade-in")
    
}

// A function that  adds the white-out animation
function whiteOut() {
    overlay.classList.add("white-out")
    globeContainer.classList.remove("keep-things-hidden")
    whiteOutAnimation = document.querySelector(".white-out")
    
    // Checks when the white-out animation ended
    whiteOutAnimation.addEventListener("animationend", () => {
        finale()
    })
}

// A function that adds the black-out animation
function blackOut() {
    overlay.classList.add("black-out")
    blackOutAnimation = document.querySelector(".black-out")

    // Listens when the black-out animation has ended
    blackOutAnimation.addEventListener("animationend", () => {
        setTimeout(whiteOut, 1000)
    })
}

// Adds the animation of shrinking the hope
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


// ---------------------------------------- //
// -------- closing overlay button -------- //
// ---------------------------------------- //

// A function that removes all the animation classes
// Brings the tag into their original state - before the clicked happened
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

// Keeps track of the clicking of HOPE
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
    currentMonth()
}

$(document).ready(setup)