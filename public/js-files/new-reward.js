// Listens to img whenever user clicks it

imgTag = document.getElementById("pic")
file = document.getElementById("pic-file");
displayImg = document.getElementById("display-img-container")
newImgTag = document.getElementById("new-pic")
newImgTagContainer = document.getElementById("new-img-btn")

imgTag.addEventListener("click", (event) => {
    $("#pic-file").trigger("click")
})

newImgTag.addEventListener("click", (event) => {
    $("#pic-file").trigger("click")
})

file.addEventListener("change", (e) => {
    console.log(e.target.files);
    const choosedFile = e.target.files[0];

    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            imgTag.setAttribute("src", reader.result);
            imgTag.style.width = "90%";
            displayImg.style.background = "none"
            newImgTagContainer.style.visibility = "visible"
        })
        reader.readAsDataURL(choosedFile);
    }
});

// inform user their reward was successfully created
function processCreation(data) {
    if (data) {
        alert('Successfully created new reward.');
        location.href='./admin.html';
    }
}

// request a new reward to be created
function requestCreation() {
    // reject value or reward points if they aren't a number
    if (isNaN($('#value').val().trim()) || isNaN(parseInt($('#points').val().trim()))) {
        alert('You must enter numbers for reward value and cost.');
        return;
    }

    // reject if company or description are blank
    if ($('#company').val().trim() == '' || $('#description').val().trim() == '') {
        alert('You must provide the company name and description.');
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/createReward',
        type: 'POST',
        data: {
            company: $('#company').val().trim(),
            description: $('#description').val().trim(),
            photo: 'https://picsum.photos/id/237/200',
            value: parseInt($('#value').val().trim()),
            cost: parseInt($('#points').val().trim())
        },
        success: processCreation
    })
}

// redirects the user to main if they are not logged in or not an admin
function redirectToMain(data) {
    if (data[0] == undefined || !data[0].is_admin) {
        alert('You do not have permission to access this page.');
        window.location.href = './main.html';
    }
}

// sends request to server to get user's details
function verifyAdmin() {
    $.ajax({
        url: 'http://localhost:3000/checkProfile',
        type: 'GET',
        success: redirectToMain
    })
}

function setup() {
    verifyAdmin();
    $('#submit').click(requestCreation);
}

$(document).ready(setup);