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
    inputs.forEach(value => {
        // take data

        // Disable input
        value.disabled = true
        //change background
        value.style.background = "rgba(220,220,220)"
    })

    // But after
    editBtn.style.display = "block";
    saveBtn.style.display = "none";

    if (isValidAgeInput && isValidCompassIdInput && isValidEmail) {
        $.ajax({
            url: "http://localhost:3000/updateProfile",
            type: "POST",
            data: {
                userName: $('#display-name').val(),
                userEmail: $('#display-email').val(),
                userAge: $('#display-age').val(),
                userCountry: $('#display-country').val(),
                userCompassId: $('#display-compass').val() 
            },
            success: displayProfile
        });
    } else {
        alert('You have inputted your fields wrong. Try again.');
    }
})

function isValidEmail() {
    let userEmail = $('#display-email').val();

    return (userEmail.includes('@'));
}

function isValidCompassIdInput() {
    let userCompassId = $('#display-compass').val();

    return !(isNaN(userCompassId) || userCompassId.length != 20);
}

function isValidAgeInput() {
    let userAge = $('#display-age').val();

    return !(userAge == '' || isNaN(userAge));
}

function displayProfile(data) {
    // rewards, name, email, compassID, country, age
    console.log(data);
    $('#display-rewards').html(data[0].reward_points);
    $('#display-name').val(`${data[0].first_name} ${data[0].last_name}`);
    $('#display-email').val(data[0].email);
    $('#display-age').val(data[0].age);
    $('#display-country').val(data[0].country);
    $('#display-compass').val(data[0].compass_id); // MASK ALL EXCEPT LAST 4 NUMBERS
}

function updateProfile(data) {
    console.log('Profile has been updated');
}

function makeReadRequest() {
    $.ajax({
        url: "http://localhost:3000/checkProfile",
        type: "GET",
        success: displayProfile
    })
}

function makeWriteRequest() {
    $.ajax({
        url: "http://localhost:3000/checkProfile",
        type: "GET",
        success: displayProfile
    })
}

function setup() {
    makeReadRequest();
}

$(document).ready(setup);