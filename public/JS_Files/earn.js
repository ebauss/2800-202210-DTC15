// Global variables
var monthlyTotalPoints = 1000
var monthlyGoalPoints = 1500

// Function that checks if receipt is successfully submitted

let popup = document.getElementById("popup")
$("#receipt-btn").on("change", (event) => {
    receipt = event.target.files;
    
    popup.classList.add("open-popup")
})

$("#closing-btn").on("click", () => {
    popup.classList.remove("open-popup")
})

// This function creates the chart.
function createChart(currentPoints, goalPoints) {
    new Chart("doughnut-rewards-chart", {
        type: "doughnut",
        data: {
            labels: ["Your Current Points", "Goal Points"],
            datasets: [{
                backgroundColor: ["#228B22", "#DCDCDC"],
                data: [currentPoints, goalPoints]
            }]
        },
        options: {
            title: {
                display: true,
                text: "My Current Points"
            }
        }
    })
}


function currentMonth(){
    const month = new Date().toLocaleString("default", {
        month: "long"})

        document.getElementById("display-month").innerHTML = month
}

function getUserRewardsInfo() {
    $.ajax({
        url: "https://sustainably-2800-202210-dtc15.herokuapp.com/getUserPoints",
        type: "GET",
        success: processUserRewardsInfo
    })
}

function processUserRewardsInfo(data) {
    console.log(data);

    monthlyTotalPoints = data[0].monthly_total_points;
    monthlyGoalPoints = data[0].monthly_goal_points;
    createChart(monthlyTotalPoints, monthlyGoalPoints);

    $('#display-current-points').html(monthlyTotalPoints);
    $('#display-goal-points').html(monthlyGoalPoints);
}

function setup(){
    currentMonth();
    getUserRewardsInfo();
}

$(document).ready(setup);