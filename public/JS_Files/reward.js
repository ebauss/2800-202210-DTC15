function processRewardsList(data) {
    console.log(data);

    data.forEach((reward) => {
        let cardTag =
            `<br>
        <div class="rewards-container" id="?">      
        <div class="image-container">
        <img src="${reward.photo}">
        </div>
        <div class="rewards-title">
        <h2>${reward.company} - $${reward.value}</h2>
        </div>
        <div class="rewards-info">
        <p>${reward.description}</p>
        </div>
        <div class="cost">
        ${reward.points_cost} points
        <button class="redeem-points">Redeem</button>
        </div>
        </div>`

        $("#rewards").append(cardTag);
    })
}

function processUserPoints(data) {
    $('#total-points').html(data[0].reward_points);
}

function makeRewardsListRequest() {
    $.ajax({
        url: "https://sustainably-2800-202210-dtc15.herokuapp.com/requestAllRewards",
        type: "GET",
        success: processRewardsList
    })
}

function makeUserPointsRequest() {
    $.ajax({
        url: "https://sustainably-2800-202210-dtc15.herokuapp.com/getUserPoints",
        type: "GET",
        success: processUserPoints
    })
}

function setup() {
    makeRewardsListRequest();
    makeUserPointsRequest();
    // loadRewards();    
}

$(document).ready(setup)