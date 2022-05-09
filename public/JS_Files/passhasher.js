function processRequest() {
    $('#submit').val("Request sent");
}

function makeRequest() {
    $.ajax({
        "type": "POST",
        "url": "http://localhost:3000/passhasher",
        "success": processRequest,
        "data": {
            "password": $('#password').val()
        }
    })
}

function setup() {
    $('#submit').click(makeRequest);
}

$(document).ready(setup);