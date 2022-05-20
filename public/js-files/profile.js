// Profile picture variables
const picDiv = document.querySelector(".profile-pic-container");
const photo = document.querySelector("#pic");
const file = document.querySelector("#pic-file");
const picBtn = document.querySelector("#upload-pic-btn");
const editBtn = document.querySelector("#edit-btn");
const saveBtn = document.querySelector("#save-btn");
const inputs = document.querySelectorAll(".info")

picDiv.addEventListener("touchstart", () => {
    picBtn.style.visibility = "visible";
});

picDiv.addEventListener("touchend", () => {
    setTimeout(() => {
        picBtn.style.visibility = "hidden";
    }, 3000);
});

file.addEventListener("change", (e) => {
    console.log(e.target.files);
    const choosedFile = e.target.files[0];

    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            photo.setAttribute("src", reader.result);
        })
        reader.readAsDataURL(choosedFile);
    }
});

editBtn.addEventListener("click", () => {
    inputs.forEach(input => {
        input.disabled = false;
        input.style.background = "white";
    })
    editBtn.style.display = "none";
    saveBtn.style.display = "block";
});

saveBtn.addEventListener("click", () => {
    console.log("Age: ", isValidAgeInput(), "Compass ID:", isValidCompassIdInput(), "Email:", isValidEmail())


    // validate user's input
    if (isValidAgeInput() && isValidCompassIdInput() && isValidEmail()) {
        makeWriteRequest();

        inputs.forEach(value => {
            // Disable input
            value.disabled = true
            //change background
            value.style.background = "rgba(220,220,220)"
        })

        // Hide save button and show edit button
        editBtn.style.display = "block";
        saveBtn.style.display = "none";
    }
    else {
        alertMessage = ""

        if (!isValidEmail()) {
            alertMessage += "Your email must contain the @ character.\n";
        }
        if (!isValidCompassIdInput()) {
            alertMessage += "Your Compass ID must be 20 digits or empty.\n";
        }
        if (!isValidAgeInput()) {
            alertMessage += "Your age must be a number between 0-255.\n";
        }

        alert(alertMessage);
    }
})

// checks if email contains the @ symbol
function isValidEmail() {
    let userEmail = $('#display-email').val();

    return (userEmail.includes('@'));
}

// checks if Compass ID is 20 numerical characters or empty string
function isValidCompassIdInput() {
    let userCompassId = $('#display-compass').val();

    return ((!isNaN(userCompassId) && userCompassId.length == 20) || userCompassId == '');
}

// checks if age is numerical and between 0 and 255
function isValidAgeInput() {
    let userAge = $('#display-age').val();

    return !(userAge == '' || isNaN(userAge) || userAge < 0 || userAge > 255);
}

// populates profile form with details from database
function displayProfile(data) {
    // rewards, name, email, compassID, country, age
    console.log(data);
    $('#display-rewards').html(data[0].reward_points);
    $('#display-first-name').val(data[0].first_name);
    $('#display-last-name').val(data[0].last_name);
    $('#display-email').val(data[0].email);
    $('#display-age').val(data[0].age);
    $('#display-country').val(data[0].country);
    $('#display-compass').val(data[0].compass_id); // MASK ALL EXCEPT LAST 4 NUMBERS
}

// informs user their profile was successfully updated
function updateProfile(data) {
    console.log('Profile has been updated');
}

// request user's profile information to be displayed
function makeReadRequest() {
    $.ajax({
        url: "http://localhost:3000/checkProfile",
        type: "GET",
        success: displayProfile
    })
}

// edits user's profile with new information
function makeWriteRequest() {
    if ($('#display-compass').val() == "") {
        compassIdToInsert = null;
    }
    else {
        compassIdToInsert = $('#display-compass').val();
    }


    $.ajax({
        url: "http://localhost:3000/updateProfile",
        type: "POST",
        data: {
            userFirstName: $('#display-first-name').val(),
            userLastName: $('#display-last-name').val(),
            userEmail: $('#display-email').val(),
            userAge: $('#display-age').val(),
            userCountry: $('#display-country').val(),
            userCompassId: compassIdToInsert
        },
        success: updateProfile
    });
}

// redirects the user to authentication.html if user is not logged in
function redirectToLogin(data) {
    if (!data.loggedIn) {
        alert("You are logged out. Please login to access this page.");
        window.location.href = './authentication.html';
    }
}

// sends request to server to check if user is logged in
function verifyLogin() {
    $.ajax({
        url: "http://localhost:3000/loginStatus",
        type: "GET",
        success: redirectToLogin
    })
}

function setup() {
    verifyLogin();
    makeReadRequest();
}

$(document).ready(setup);