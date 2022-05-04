function processLogin() {
    alert('Your login was successful and totally secure!');
}

function postUserCredentials() {
    $.ajax(
        {
            url: "http://localhost:3000/login",
            type: "POST",
            data: {
                "email": $('#email-input').val(),
                "password": $('#password-input').val() // hash this field later
            },
            success: processLogin
        }
    )
}

function setup() {
    $('#submit-credentials').click(postUserCredentials)
}

$(document).ready(setup);