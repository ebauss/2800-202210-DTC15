function processRewardsList(data) {
    console.log(data);

    data.forEach((reward) => {
        let cardTag =
            `<br>
        <div class="rewards-container" id="${reward.reward_id}">      
            <div class="image-container">
                <img src="${reward.photo}">
            </div>
            <div class="rewards-title">
                <h2>${reward.company} - $${reward.value.toLocaleString('en-CA')}</h2>
            </div>
            <div class="rewards-info">
                <p>${reward.description}</p>
            </div>
            <div class="cost">
                ${reward.points_cost.toLocaleString('en-CA')} points
                <button class="redeem-points" id="${reward.points_cost}">Redeem</button>
            </div>
        </div>`

        $("#rewards").append(cardTag);
    })
}

function processUserPoints(data) {
    $('#total-points').html(data[0].reward_points.toLocaleString('en-CA'));
}

function makeRewardsListRequest() {
    $.ajax({
        url: "http://localhost:3000/requestAllRewards",
        type: "GET",
        success: processRewardsList
    })
}

function makeUserPointsRequest() {
    $.ajax({
        url: "http://localhost:3000/getUserPoints",
        type: "GET",
        success: processUserPoints
    })
}

function processRedeemRequest(data) {
    if (data) {
        alert("You have redeemed the reward successfully.");
    }
    else {
        alert("You do not have enough points!");
    }
}

function makeRedeemRequest() {
    today = new Date();

    $.ajax({
        url: "http://localhost:3000/redeemReward",
        type: "POST",
        data: {
            reward_id: parseInt($(this).parent().parent().attr("id")),
            redeemed_date: today.toISOString().split("T")[0],
            cost: parseInt($(this).attr("id"))
        },
        success: processRedeemRequest
    })
}

// redirects the user to authentication.html if user is not logged in
function redirectToLogin(data) {
    if (!data.loggedIn) {
        alert("You are logged out. Please login to access this page.");
        window.location.href = './authentication.html';
    }
    else {
        makeRewardsListRequest();
        makeUserPointsRequest();        
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

function setup() {
    verifyLogin();
    $('body').on('click', '.redeem-points', makeRedeemRequest)
}

$(document).ready(setup)