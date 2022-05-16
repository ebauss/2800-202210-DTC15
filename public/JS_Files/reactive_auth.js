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

function addNewUserToDatabase() {
    console.log("Signup button pressed");
    $.ajax(
        {
            url: "http://localhost:3000/createNewUser",
            type: "POST",
            data: {
                "email": $('#email').val(),
                "password": $('#new-password').val(),
                "confirm_password": $('#confirm-password').val(),
                "first_name": $('#first-name').val(),
                "last_name": $('#last-name').val(),
                "age": $('#age').val(),
                "country": $('#country').val()
            },
            success: processSignup
        }
    )
}

function processLogin(data) {
    if (data.isPasswordCorrect && data.isAdmin) {
        window.location.href = "../admin.html";
    } else if (data.isPasswordCorrect) {
        window.location.href = "../main.html";
    } else {
        window.alert("You entered the wrong password");
    }
}

function processSignup(data) {
    switch (data) {
        case "success":
            alert("You have been signed up.");
            loginSignedUpUser();
            break;
        case "unmatching password":
            alert("The passwords do not match!");
            break;
        case "blank":
            alert("All fields are required!");
            break;
        case "age is not a number":
            alert("You must enter a nuber for age");
            break;
    }
}

function loginSignedUpUser() {
    $.ajax({
        url: "http://localhost:3000/checkIfPasswordCorrect",
        type: "POST",
        data: {
            "email": $('#email').val(),
            "password": $('#new-password').val()
        },
        success: processLogin
    });
}

// Show this if user exists
function user_signIn() {
    // Disables email field
    $('#email').prop('disabled', true);
    $('#email-label').hide();

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
    cancel = `<div class="pass-miscellaneous" id="cancel-to-email"> Cancel </div>`

    // Shows the sign_in and forget_pass to the login page
    $("#form-action-container").append(sign_in, cancel)
}

// If user is a new user
function user_signUp() {
    // Changes the Header into "Sign Up"
    $("#authentication-header").html("Sign Up")

    // lock email field for user sign up
    $("#email").prop("disabled", true);
    $("#email-label").hide();

    // Adds a new field called "new_password"
    new_password = `<div class="input-container">
    <input class="user_input" type="password" name="new--password" id="new-password" autocomplete="new-password" required>
    <span></span>
    <label for="new-password" class="input-labels" id="newpassword-label"> Password </label>
    </div>`

    // Adds anew field called "confirm_password"
    confirm_password = `<div class="input-container">
    <input class="user_input" type="password" name="confirm_password" id="confirm-password" autocomplete="new-password" required>
    <span></span>
    <label for="confirm_password" class="input-labels" id="confirmpassword-label"> Confirm Password </label>
    </div>`

    // Adds anew field called "first_name"
    first_name = `<div class="input-container">
        <input class="user_input" type="text" name="first_name" id="first-name" autocomplete="name" required>
        <span></span>
        <label for="first_name" class="input-labels" id="first_name-label"> First Name </label>
    </div>`

    // Adds anew field called "last_name"
    last_name = `<div class="input-container">
        <input class="user_input" type="text" name="last_name" id="last-name" autocomplete="family-name" required>
        <span></span>
        <label for="last_name" class="input-labels" id="last_name-label"> Last Name </label>
    </div>`

    // Adds a new field called "age"
    age = `<div class="input-container">
        <input class="user_input" type="text" name="age" id="age" autocomplete="age" required>
        <span></span>
        <label for="age" class="input-labels" id="last_name-label"> Age </label>
    </div>`

    // Adds anew field called "country"
    country = `<div class="input-container">
        <input class="user_input" type="text" name="country" id="country" autocomplete="country" required>
        <span></span>
        <label for="country" class="input-labels" id="country-label"> Country </label>
    </div>`

    $("#form-main-content").append(new_password, confirm_password, first_name, last_name, age, country)

    $("#form-action-container").empty()

    sign_up = `<div class="form-action">
    <input type="button" value="Sign Up" id="authenticate-signup">
    </div>`

    // Adds a new button in case user forgets their password
    cancel = `<div class="pass-miscellaneous" id="cancel-to-email"> Cancel </div>`

    // Shows the sign_up and cancel buttons to the login page
    $("#form-action-container").append(sign_up, cancel)
}

function GoIndex() {
    console.log("forwarding to index")
}

function cancelToEmail() {
    enteredEmail = $('#email').val();

    $('#form-main-content').empty();

    $('#form-main-content').append(
        `<div class="input-container">
            <input class="user_input" type="text" name="email" id="email" autocomplete="email" value="${enteredEmail}" required>
            <span></span>
            <label for="email" class="input-labels" id="email-label"> Email </label>
        </div>`
    );

    $('#cancel-to-email').remove();

    $('#form-action-container').empty();

    $('#form-action-container').append(
        `<div class="form-action">
            <input type="button" value="Next" id="authenticate-user">
        </div>`
    )
}

function setup() {
    $('body').on("click", '#authenticate-user', isEmailInDB);
    $('body').on("click", '#authenticate-signIn', isPasswordCorrect);
    $('body').on("click", "#authenticate-signup", addNewUserToDatabase);
    $('body').on("click", "#cancel-to-email", cancelToEmail)
}

$(document).ready(setup)