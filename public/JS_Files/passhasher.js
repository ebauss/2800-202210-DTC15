function processRequest(data) {
    $('#password-result').html(`Password: ${$('#password').val()}`);
    $('#hash-result').html(`Hashed: ${data}`);
}

function makeRequest() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/passhasher",
        data: {
            "password": $('#password').val()
        },
        success: processRequest
    })
}

function setup() {
    $('#submit').click(makeRequest);
}

$(document).ready(setup);