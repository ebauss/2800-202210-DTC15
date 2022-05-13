// DEPRECATED!

function processLogin(data) {
    alert('Your login was successful and totally secure!');
}

function postUserCredentials() {
    $.ajax({
        url: "https://sustainably-2800-202210-dtc15.herokuapp.com/loginWithUserCredentials",
        type: "POST",
        data: {
            "email": $('#email').val(),
            "password": $('#password').val()
        },
        success: processLogin
    })
}

function setup() {
    $('#authenticate-user').click(postUserCredentials);
}

$(document).ready(setup);