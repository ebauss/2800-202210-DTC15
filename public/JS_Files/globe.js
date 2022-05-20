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
let easterEggInitiator = document.getElementById("easter-egg");


async function easterEgg(){
    easterEggChildren = easterEggInitiator.childNodes;
    easterEggChildren.forEach(child => {
        easterEggInitiator.classList.add("move-texts")
        // child.classList.add("move-texts")
    })
}

easterEggInitiator.addEventListener("click", (event) => {
    element = event.currentTarget;
    element.clicks = (element.clicks || 0) + 1;

    if (element.clicks == 3){
        easterEgg()
    }
})

function setup() {
    createChart()
}

$(document).ready(setup)