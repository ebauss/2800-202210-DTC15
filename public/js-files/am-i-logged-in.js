// This js file is used for testing purposes at the moment. This file just tests whether the user is logged in our out via express-sessions.

function updateStatus(data) {
    if (data.loggedIn) {
        $('#status').html(`You are logged in as ${data.uid}`)
    }
    else {
        $('#status').html('You are not logged in')
    }
}

function processLogout(data) {
    if (data) {
        $('#status').html(`You are logged out!`);
    }
}

function makeLogoutRequest() {
    $.ajax({
        url: "https://sustainably-2800-202210-dtc15.herokuapp.com/logout",
        type: "GET",
        success: processLogout
    })
}

function makeRequest() {
    $.ajax({
        url: "https://sustainably-2800-202210-dtc15.herokuapp.com/loginStatus",
        type: "GET",
        success: updateStatus
    })
}

function setup() {
    makeRequest();
    $('#logout-button').click(makeLogoutRequest);
}

$(document).ready(setup);