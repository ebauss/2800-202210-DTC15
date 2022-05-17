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
        url: "http://localhost:3000/getUserPoints",
        type: "GET",
        success: processUserRewardsInfo
    })
}

function processUserRewardsInfo(data) {
    console.log(data);

    monthlyTotalPoints = data[0].monthly_total_points;
    monthlyGoalPoints = data[0].monthly_goal_points;

    let currentPoints = monthlyTotalPoints;
    let totalPoints = monthlyGoalPoints - monthlyTotalPoints;

    if (totalPoints < 0) {
        totalPoints = 0
    };

    createChart(currentPoints, totalPoints);

    $('#display-current-points').html(monthlyTotalPoints);
    $('#display-goal-points').html(monthlyGoalPoints);
}

// redirects the user to authentication.html if user is not logged in
function redirectToLogin(data) {
    if (!data.loggedIn) {
        alert("You are logged out. Please login to access this page.");
        window.location.href = './authentication.html';
    }
    else {
        currentMonth();
        getUserRewardsInfo();
    }
}

// sends request to server to check if user is logged in
function verifyLogin() {
    $.ajax({
        url: "http://localhost:3000/loginStatus",
        type: "GET",
        success: redirectToLogin
    })
}

function setup(){
    verifyLogin();
}

$(document).ready(setup);