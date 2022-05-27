// check if user email exists in MySQL database.
function isEmailInDB() {
    console.log('Button pressed');

    if (!$('#email').val().trim().includes('@')) {
        alert('Your email must contain the @ symbol.');
        return;
    }

    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/checkEmailExists',
        type: 'POST',
        data: {
            'email': $('#email').val().trim()
        },
        success: processUserResult
    })
}

// process the result of the user via email query on MySQL
function processUserResult(data) {
    // if email exists, proceed to userSignin()
    if (data.length != 0) {
        userSignin();
    }
    // if email does not exist, proceed to userSignup()
    else {
        userSignup();
    }
}

// check with server whether password is correct, and sign in if it is
function isPasswordCorrect() {
    console.log('Sign in button pressed')
    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/checkIfPasswordCorrect',
        type: 'POST',
        data: {
            'email': $('#email').val().trim(),
            'password': $('#password').val()
        },
        success: processLogin
    });
}

// create a new user to the database
function addNewUserToDatabase() {
    console.log('Signup button pressed');
    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/createNewUser',
        type: 'POST',
        data: {
            'email': $('#email').val().trim(),
            'password': $('#new-password').val(),
            'confirm_password': $('#confirm-password').val(),
            'first_name': $('#first-name').val().trim(),
            'last_name': $('#last-name').val().trim(),
            'age': $('#age').val().trim(),
            'country': $('#country').val().trim()
        },
        success: processSignup
    })
}

// redirect the user depending on whether they are an admin
function processLogin(data) {
    if (data.isPasswordCorrect && data.isAdmin) {
        // user is an admin, so redirect them to admin dashboard
        window.location.href = '../admin.html';
    } else if (data.isPasswordCorrect) {
        // user is a customer, so redirect them to main page
        window.location.href = '../main.html';
    } else {
        // password is incorrect
        window.alert('You entered the wrong password');
    }
}

// inform user whether their signup was successful
function processSignup(data) {
    switch (data) {
        case 'success':
            // sign up was successful. Log in the user.
            signUpPopup = document.getElementById("signup-popup") 
            signUpPopup.classList.add("open-popup")
            $("body").on("click", "#signup-btn", () => {
                signUpPopup.classList.remove("open-popup")
                loginSignedUpUser();    
            })
            break;
        case 'unmatching password':
            // confirm password does not match password field
            alert('The passwords do not match!');
            break;
        case 'blank':
            // one or more fields were left blank
            alert('All fields are required!');
            break;
        case 'age is not a number':
            // the user entered letters or illegal characters as an age
            alert('You must enter a number for age');
            break;
    }
}

// logs in the user after they sign up
function loginSignedUpUser() {
    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/checkIfPasswordCorrect',
        type: 'POST',
        data: {
            'email': $('#email').val().trim(),
            'password': $('#new-password').val()
        },
        success: processLogin
    });
}

// --------------------------------------------------------- //
// -- Important Variables for the reactive Authentication -- //
// --------------------------------------------------------- //

nextBtn = document.querySelector(".next-btn")
cancellButton = document.querySelector(".cancel-btn")
signInTags = document.querySelectorAll(".sign-in")
signUpTags = document.querySelectorAll(".sign-up")
clickedBtn = ""

// Show this if user exists
function userSignin() {
    // Disables email field
    $('#email').prop('disabled', true);
    $('#email-label').hide();

    // Changes the Header into "Sign In"
    $("#authentication-header").html("Sign In")

    signInTags.forEach(tag => {
        tag.classList.remove("sign-in")
    })
    cancellButton.classList.remove("cancel-btn")
    nextBtn.style.display = "none"
    clickedBtn = "signIn"
}

// If user is a new user
function userSignup() {
    // Changes the Header into "Sign Up"
    $("#authentication-header").html("Sign Up")

    // lock email field for user sign up
    $("#email").prop("disabled", true);
    $("#email-label").hide();

    signUpTags.forEach(tag => {
        tag.classList.remove("sign-up")
    })
    cancellButton.classList.remove("cancel-btn")
    nextBtn.style.display = "none"
    clickedBtn = "signUp"
}

function GoIndex() {
    console.log("forwarding to index")
}

// deletes password/signup fields and makes email field editable again
function cancelToEmail() {
    
    if (clickedBtn == "signUp"){
        signUpTags.forEach(tag => {
            tag.classList.add("sign-up")
        })
    } else {
        signInTags.forEach(tag => {
            tag.classList.add("sign-in")
        })
    }

    // save email to be filled out again
    enteredEmail = $('#email').val().trim();
    $('#email').prop('disabled', false);
    nextBtn.style.display = "block"
    cancellButton.classList.add("cancel-btn")
    $('#email-label').show();
}

function setup() {
    $('body').on('click', '#authenticate-user', isEmailInDB);
    $('body').on('click', '#authenticate-signIn', isPasswordCorrect);
    $('body').on('click', '#authenticate-signup', addNewUserToDatabase);
    $('body').on('click', '#cancel-to-email', cancelToEmail);

    // catch a keypress event if user presses ENTER on various fields

    $('body').on('keypress', '#email', (event) => {
        // keypress works if the cursor is on the #email textbox.
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            isEmailInDB();
        }
    })

    $('body').on('keypress', '#password', (event) => {
        // keypress works if the cursor is on the #password textbox.
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            isPasswordCorrect();
        }
    })

    $('body').on('keypress', '#country', (event) => {
        // keypress works if the cursor is on the #password textbox.
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            addNewUserToDatabase();
        }
    })
}

$(document).ready(setup)