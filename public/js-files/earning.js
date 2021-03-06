// Global variables
var monthlyTotalPoints = 1000
var monthlyGoalPoints = 1500

// --------------------------------------------------------------- //
// ------ All functions and codes that interacts with MYSQL ------ //
// --------------------------------------------------------------- //

// requests user's monthly goal and actual points
function getUserRewardsInfo() {
    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/getUserPoints',
        type: 'GET',
        success: processUserRewardsInfo
    })
}

// sends a request to server for uploading a receipt
function uploadReceipt() {
    today = new Date();

    rewardPointsInput = $('#receipt-total').val().trim();

    if (isNaN(rewardPointsInput)) {
        alert("You must enter a number for your receipt's value.")
        return;
    } else if (rewardPointsInput == "") {
        alert("You must enter the receipt's value")
        return;
    } 

    rewardPoints = parseInt(rewardPointsInput) * 100;

    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/uploadReceipt',
        type: 'POST',
        data: {
            receipt: 'https://ibb.co/3mhy0Bj',
            value: rewardPoints,
            date: today.toISOString().split('T')[0]
        },
        success: amountBtncloser
    })
}

// tells user their monthly goal was successfully updated, and redraws chart accordingly
function processGoalUpdate(data) {
    if (data) {
        alert('Your monthly goal has been updated.');
        location.reload();
    }
}

// saves user's monthly goal to database
function saveMonthlyGoal() {
    if (isNaN($('#display-goal-points').val().trim()) || $('#display-goal-points').val().trim() < 0) {
        alert('You must enter a positive number for your monthly goal.');
        return;
    }

    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/updateGoal',
        type: 'POST',
        data: {
            goal: parseInt($('#display-goal-points').val().trim())
        },
        success: processGoalUpdate
    })
}

// redirects the user to authentication.html if user is not logged in
function redirectToLogin(data) {
    if (!data.loggedIn) {
        alert('You are logged out. Please login to access this page.');
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
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/loginStatus',
        type: 'GET',
        success: redirectToLogin
    })
}

// ------------------------------------------------------------- //
// ------- All functions and codes for Earnings FrontEnd ------- //
// ------------------------------------------------------------- //

// Function that checks if receipt is successfully submitted
// It is also a function that shows the popup
let Amountpopup = document.getElementById("amount-popup")
let closingpopup = document.getElementById("closing-popup")
$("#receipt-btn").on("change", (event) => {
    receipt = event.target.files;
    
    Amountpopup.classList.add("open-popup")
})

function amountBtncloser (){
    Amountpopup.classList.remove("open-popup")
    closingpopup.classList.add("open-popup")
}

$("#closing-btn").on("click", () => {
    closingpopup.classList.remove("open-popup")
})

// Function that gets the current month
function currentMonth(){
    const month = new Date().toLocaleString("default", {
        month: "long"})

        document.getElementById("display-month").innerHTML = month
}


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

//populates the goal and current points container
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
    $('#display-goal-points').val(monthlyGoalPoints);
}

function setup(){
    verifyLogin();
    $('#amount-closing-btn').click(uploadReceipt);

    // save form if user presses ENTER while setting their monthly goal
    $('body').on('keypress', '#display-goal-points', (event) => {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        // keycode 13 is the ENTER key
        if (keycode == '13') {
            saveMonthlyGoal();
        }
    })
}

$(document).ready(setup);