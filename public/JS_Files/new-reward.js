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