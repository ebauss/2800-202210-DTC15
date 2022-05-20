// populate rewards list with cards for every reward
function processRewardsList(data) {
    console.log(data);

    $('#rewards').empty();

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

        $('#rewards').append(cardTag);
    })
}

// show the user's total points at the top of the page
function processUserPoints(data) {
    $('#total-points').html(data[0].reward_points.toLocaleString('en-CA'));
}

// request all rewards, sorted according to dropdown
function makeRewardsListRequest() {
    // sort the results depending on dropdown
    switch ($('.sort-dropdown option:selected').val()) {
        case 'default':
            // oldest rewards first
            criteriaInput = 'company';
            orderInput = 'ASC';
            break;
        case 'descending':
            // expensive rewards first
            criteriaInput = 'points_cost';
            orderInput = 'DESC';
            break;
        case 'ascending':
            // cheapest rewards first
            criteriaInput = 'points_cost';
            orderInput = 'ASC';
            break;
    }

    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/requestAllRewards',
        type: 'POST',
        data: {
            criteria: criteriaInput,
            order: orderInput
        },
        success: processRewardsList
    })
}

// request server for the signed-in user's current points
function makeUserPointsRequest() {
    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/getUserPoints',
        type: 'GET',
        success: processUserPoints
    })
}

// inform user whether they successfully redeemed reward
function processRedeemRequest(data) {
    if (data) {
        alert('You have redeemed the reward successfully.');
        location.reload();
    }
    else {
        alert('You do not have enough points!');
    }
}

// request server to redeem a reward
function makeRedeemRequest() {
    today = new Date();

    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/redeemReward',
        type: 'POST',
        data: {
            reward_id: parseInt($(this).parent().parent().attr('id')),
            redeemed_date: today.toISOString().split('T')[0],
            cost: parseInt($(this).attr('id'))
        },
        success: processRedeemRequest
    })
}

// redirects the user to authentication.html if user is not logged in
function redirectToLogin(data) {
    if (!data.loggedIn) {
        alert('You are logged out. Please login to access this page.');
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
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/loginStatus',
        type: 'GET',
        success: redirectToLogin
    })
}

function setup() {
    verifyLogin();
    $('body').on('click', '.redeem-points', makeRedeemRequest);

    $('.sort-dropdown').change(makeRewardsListRequest);
}

$(document).ready(setup)