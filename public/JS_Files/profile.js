// Profile picture variables
const picDiv = document.querySelector(".profile-pic-container");
const photo = document.querySelector("#pic");
const file = document.querySelector("#pic-file");
const picBtn = document.querySelector("#upload-pic-btn");
const editBtn = document.querySelector("#edit-btn");
const saveBtn = document.querySelector("#save-btn");
const inputs = document.querySelectorAll(".info")

picDiv.addEventListener("touchstart", () => {
    picBtn.style.visibility = "visible"
})

picDiv.addEventListener("touchend", () => {
    setTimeout(() => {
        picBtn.style.visibility = "hidden"
    }, 3000)
})

file.addEventListener("change", (e) => {
    console.log(e.target.files)
    const choosedFile = e.target.files[0];

    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            photo.setAttribute("src", reader.result);
        })
        reader.readAsDataURL(choosedFile);
    }
})

editBtn.addEventListener("click", () => {
    inputs.forEach(input => {
        input.disabled = false
        input.style.background = "white"
    })
    editBtn.style.display = "none"
    saveBtn.style.display = "block"
})

saveBtn.addEventListener("click", () => {
    inputs.forEach(value => {
        // take data (Love you!)

        // Disable input
        value.disabled = true
        //change background
        value.style.background = "rgba(220,220,220)"
    })

    // But after
    editBtn.style.display = "block"
    saveBtn.style.display = "none"
})

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

function makeRequest() {
    $.ajax({
        url: "http://localhost:3000/checkProfile",
        type: "GET",
        success: displayProfile
    })
}

function setup() {
    makeRequest();
}

$(document).ready(setup);