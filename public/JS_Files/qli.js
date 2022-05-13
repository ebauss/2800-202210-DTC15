// DEBUGGING: for quickly signing in without credentials

function processRequest(data) {
    if (data) {
        alert("You are now Tsubasa Kazanari");
        window.location.href="./profile.html";
    }
}

function makeRequest() {
    $.ajax({
        url: "https://sustainably-2800-202210-dtc15.herokuapp.com/quickLogin",
        type: "GET",
        success: processRequest
    })
}

function setup() {
    $('#quick-login').click(makeRequest);
}

$(document).ready(setup);