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
        url: "https://sustainably-2800-202210-dtc15.herokuapp.com/loginStatus",
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
        url: "https://sustainably-2800-202210-dtc15.herokuapp.com/logout",
        type: "GET",
        success: processLogout
    })

    isUserLoggedIn();
}

function processLogout(data) {
    if (data) {
        let logOutPopUp = document.getElementById("logout-popup")
        logOutPopUp.classList.add("open-popup")
    }
}

function redirectToMain(){
    window.location.href = './main.html';
}

function setup() {
    isUserLoggedIn();
    $('body').on('click', '#logout-button', logoutUser);
    $('body').on('click', '#farewell-btn', redirectToMain);
};

$(document).ready(setup);