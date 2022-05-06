// Check if user email exists in MySQL database.
function isEmailInDB() {
    console.log("Button pressed");

    $.ajax({
        url: "http://localhost:3000/checkEmailExists",
        type: "POST",
        data: {
            "email": $('#email').val()
        },
        success: processUserResult
    })
}

// process the result of the user via email query on MySQL
function processUserResult(data) {
    // if email exists, proceed to user_signIn()
    if (data.length != 0) {
        user_signIn();
    }
    // if email does not exist, proceed to user_signUP()
    else {
        user_signUp();
    }
}

function isPasswordCorrect() {
    console.log("Sign in button pressed")
    $.ajax({
        url: "http://localhost:3000/checkIfPasswordCorrect",
        type: "POST",
        data: {
            "email": $('#email').val(),
            "password": $('#password').val()
        },
        success: processLogin
    });
}

function processLogin(data) {
    if (data == true) {
        window.alert("You have successfully logged in");
    } else {
        window.alert("You entered the wrong password");
    }
}

// Show this if user exists
function user_signIn() {
    // Changes the Header into "Sign In"
    $("#authentication-header").html("Sign In")

    // Adds a new field called "Password"
    password = `<div class="input-container">
    <input class="user_input" type="password" name="password" id="password" autocomplete="password" equired>
    <span></span>
    <label for="password" class="input-labels" id="password-label"> Password </label>
</div>`

    // Shows the password field to the html
    $("#form-main-content").append(password)

    // Clears the container
    $("#form-action-container").empty()

    // Adds a new button called signIn
    sign_in = `<div class="form-action">
    <input type="button" value="Sign In" id="authenticate-signIn">
</div>`

    // Adds a new button in case user forgets their password
    forget_pass = `<div class="pass-miscellaneous"> Forget Password? </div>`

    // Shows the sign_in and forget_pass to the login page
    $("#form-action-container").append(sign_in, forget_pass)
}

// If user is a new user
function user_signUp() {
    // Changes the Header into "Sign Up"
    $("#authentication-header").html("Sign Up")

    // Adds a new field called "new_password"
    new_password = `<div class="input-container">
    <input class="user_input" type="password" name="new--password" id="new-password" autocomplete="new-password" required>
    <span></span>
    <label for="new-password" class="input-labels" id="newpassword-label"> Password </label>
    </div>`

    // Adds anew field called "confirm_password"
    confirm_password = `<div class="input-container">
    <input class="user_input" type="password" name="confirm_password" id="confirm_password" autocomplete="new-password" required>
    <span></span>
    <label for="confirm_password" class="input-labels" id="confirmpassword-label"> Confirm Password </label>
    </div>`

    // Adds anew field called "first_name"
    first_name = `<div class="input-container">
        <input class="user_input" type="text" name="first_name" id="first_name" autocomplete="name" required>
        <span></span>
        <label for="first_name" class="input-labels" id="first_name-label"> First Name </label>
    </div>`

    // Adds anew field called "last_name"
    last_name = `<div class="input-container">
        <input class="user_input" type="text" name="last_name" id="last_name" autocomplete="family-name" required>
        <span></span>
        <label for="last_name" class="input-labels" id="last_name-label"> Last Name </label>
    </div>`

    // Adds anew field called "country"
    country = `<div class="input-container">
        <input class="user_input" type="text" name="country" id="country" autocomplete="country" required>
        <span></span>
        <label for="country" class="input-labels" id="country-label"> Country </label>
    </div>`

    $("#form-main-content").append(new_password, confirm_password, first_name, last_name, country)

    $("#form-action-container").empty()

    sign_up = `<div class="form-action">
    <input type="button" value="Sign Up" id="authenticate-signUp">
    </div>`

    // Adds a new button in case user forgets their password
    cancel = `<div class="pass-miscellaneous"> Cancel </div>`

    // Shows the sign_up and cancel buttons to the login page
    $("#form-action-container").append(sign_up, cancel)
}

function GoIndex() {
    console.log("forwarding to index")
}

function setup() {
    $('#authenticate-user').click(isEmailInDB);
    $('body').on("click", '#authenticate-signIn', isPasswordCorrect);
}

$(document).ready(setup)