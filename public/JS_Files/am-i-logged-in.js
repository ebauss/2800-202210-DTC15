function updateStatus(data) {
    if (data.loggedIn) {
        $('#status').html(`You are logged in as ${data.uid}`)
    }
    else {
        $('#status').html('You are not logged in')
    }
}

function makeRequest() {
    $.ajax({
        url: "http://localhost:3000/loginStatus",
        type: "GET",
        success: updateStatus
    })
}

function setup() {
    makeRequest();
}

$(document).ready(setup);