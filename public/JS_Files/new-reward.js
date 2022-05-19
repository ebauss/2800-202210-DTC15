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

function processCreation(data) {
    if (data) {
        alert("Successfully created new reward.");
        location.href='./admin.html';
    }
}

function requestCreation() {
    $.ajax({
        url: 'http://localhost:3000/createReward',
        type: 'POST',
        data: {
            company: $('#company').val(),
            description: $('#description').val(),
            photo: 'https://picsum.photos/id/237/200',
            value: parseInt($('#value').val()),
            cost: parseInt($('#points').val())
        },
        success: processCreation
    })
}

function setup() {
    $('#submit').click(requestCreation);
}

$(document).ready(setup);