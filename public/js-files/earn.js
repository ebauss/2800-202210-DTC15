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


function uploadComplete(data) {
    if (data) {
        alert("Upload complete");
    }
}

// sends a request to server for uploading a receipt
function uploadReceipt() {
    today = new Date();

    rewardPointsInput = $('#receipt-total').val();

    if (isNaN(rewardPointsInput)) {
        alert("You must enter a number for your receipt's value.")
        return;
    }

    rewardPoints = parseInt(rewardPointsInput) * 100;

    $.ajax({
        url: "http://localhost:3000/uploadReceipt",
        type: "POST",
        data: {
            receipt: "https://picsum.photos/id/237/200",
            value: rewardPoints,
            date: today.toISOString().split("T")[0]
        },
        success: uploadComplete
    })
}

function processGoalUpdate(data) {
    if (data) {
        alert('Your monthly goal has been updated.');
        getUserRewardsInfo();
    }
}

// saves user's monthly goal to database
function saveMonthlyGoal() {
    if (isNaN($('#display-goal-points').val()) || $('#display-goal-points').val() < 0) {
        alert('You must enter a positive number for your monthly goal.');
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/updateGoal',
        type: 'POST',
        data: {
            goal: parseInt($('#display-goal-points').val())
        },
        success: processGoalUpdate
    })
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
    $('#closing-btn').click(uploadReceipt);

    // save form if user presses ENTER while setting their monthly goal
    $('body').on('keypress', '#display-goal-points', (event) => {
        // keypress works if the cursor is on the monthly goal points textbox.
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            saveMonthlyGoal();
        }
    })
}

$(document).ready(setup);