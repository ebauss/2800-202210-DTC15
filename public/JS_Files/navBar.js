// NavBar Functions
const hamburger = document.querySelector(".hamburger"); //
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
}))

function isUserLoggedIn() {
    $.ajax({
        url: "http://localhost:3000/loginStatus",
        type: "GET",
        success: updateNavbar
    })
}

function updateNavbar(data) {
    if (data.loggedIn) {
        $('#login-button-container').hide();
        $('#logout-button-container').show();
    } else {
        $('#login-button-container').show();
        $('#logout-button-container').hide();
    }
}

async function logoutUser() {
    await $.ajax({
        url: "http://localhost:3000/logout",
        type: "GET",
        success: processLogout
    })

    isUserLoggedIn();
}

function processLogout(data) {
    if (data) {
        alert("You have successfully logged out!");
    }
}

function setup() {
    isUserLoggedIn();
    $('body').on('click', '#logout-button', logoutUser);
};

$(document).ready(setup);