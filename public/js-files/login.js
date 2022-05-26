// DEPRECATED!

function processLogin(data) {
    alert('Your login was successful and totally secure!');
}

function postUserCredentials() {
    $.ajax({
        url: "http://localhost:3000/loginWithUserCredentials",
        type: "POST",
        data: {
            "email": $('#email').val().trim(),
            "password": $('#password').val().trim()
        },
        success: processLogin
    })
}

function setup() {
    $('#authenticate-user').click(postUserCredentials);
}

$(document).ready(setup);