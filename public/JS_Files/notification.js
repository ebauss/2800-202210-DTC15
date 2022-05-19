// ---------- popup cards with more info --------- //
const overlay = document.getElementById('overlay')

// ---------- toggle section between buttons ----------- //
const rewardsSection = document.getElementById('user-rewards-container')
const earningsSection = document.getElementById('user-earnings-container')
const rewardsButton = document.getElementById('rewards-btn')
const earningsButton = document.getElementById('earnings-btn')

dummy_rewards = [
    {
        "status": "Claimed",
        "points": 1000,
        "title": "JANE Group Coupon",
        "date": "03 / 30 / 2002",
        "img": "./Image_Files/JANE_logo.png",
        "rewardsID": "adwarttfsa123121",
        "company": "J.A.N.E. Group",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit Nostrum quibusdam commodi fugit adipisci sapiente a ab veniam exercitationem voluptatibus molestiae?",
    },
    {
        "status": "New",
        "points": 1000,
        "title": "Global 10% discount",
        "date": "03 / 30 / 2022",
        "img": "./Image_Files/money.png",
        "rewardsID": "adwarttfsa123121",
        "company": "J.A.N.E. Group",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit Nostrum quibusdam commodi fugit adipisci sapiente a ab veniam exercitationem voluptatibus molestiae?",
    },
]

dummy_earnings = [
    {
        "status": "Approved",
        "points": "1000",
        "date": "03 / 30 / 2002",
        "earningsID": "adwarttfsa123121",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit Nostrum quibusdam commodi fugit adipisci sapiente a ab veniam exercitationem voluptatibus molestiae?",
    },
    {
        "status": "Pending",
        "points": null,
        "date": "03 / 30 / 2022",
        "earningsID": "adwarttfsa123121",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit Nostrum quibusdam commodi fugit adipisci sapiente a ab veniam exercitationem voluptatibus molestiae?",
    },
]

// ------- All Functions for populating the card ------- //

// ------- A function that populates the rewards container -------- //
function populate_rewards(rewards) {

    // ------ Takes the template from the HTML file ------ //
    const earningsTemplate = document.getElementById("rewards-template")

    console.log(rewards);

    // ------ Grabs all values for every reward -------//
    rewards.forEach(reward => {
        rewardsPoints = reward.points_cost.toLocaleString('en-CA');
        rewardsTitle = reward.company;
        rewardsDate = reward.redeemed_date.split("T")[0];
        rewardsId = reward.description;
        rewardsCompany = reward.company;
        rewardsImage = reward.photo;

        // ------- creates a card ------- //
        let newMail = earningsTemplate.content.cloneNode(true);

        newMail.querySelector(".rewards-points").innerHTML = rewardsPoints;
        newMail.querySelector(".rewards-title").innerHTML = rewardsTitle;
        newMail.querySelector(".rewards-date").innerHTML = rewardsDate;
        newMail.querySelector(".rewards-id").innerHTML = rewardsId;
        newMail.querySelector(".rewards-points-popup").innerHTML = rewardsPoints;
        newMail.querySelector(".rewards-title-popup").innerHTML = rewardsTitle;
        newMail.querySelector(".rewards-date-popup").innerHTML = rewardsDate;
        newMail.querySelector(".rewards-id-popup").innerHTML = rewardsId;
        newMail.querySelector(".rewards-img").setAttribute("src", rewardsImage)

        document.getElementById("user-rewards-container").append(newMail)
    })
}

// ------- A function that populates the rewards container -------- //
function populate_earnings(earnings) {

    // ------ Takes the template from the HTML file ------ //
    const earningsTemplate = document.getElementById("earnings-template")

    // ------ Grabs all values for every rewards mail -------//
    earnings.forEach(receipt => {
        console.log(receipt);

        if (receipt.admin_id == null) {
            earningsStatus = "Pending";
        }
        else {
            earningsStatus = "Verified";
        }
        
        earningsPoints = receipt.reward_points.toLocaleString('en-CA');

        if (receipt.verified_date == null) {
            earningsDate = ""
        }
        else {
            earningsDate = receipt.verified_date.split("T")[0];        
        }

        earningsId = receipt.notes;

        // ------- creates a card ------- //
        let newMail = earningsTemplate.content.cloneNode(true);

        newMail.querySelector(".earnings-status").innerHTML = earningsStatus;
        newMail.querySelector(".earnings-points").innerHTML = earningsPoints;
        newMail.querySelector(".earnings-date").innerHTML = earningsDate;
        newMail.querySelector(".earnings-id").innerHTML = earningsId;
        newMail.querySelector(".earnings-status-popup").innerHTML = earningsStatus;
        newMail.querySelector(".earnings-points-popup").innerHTML = earningsPoints;
        newMail.querySelector(".earnings-date-popup").innerHTML = earningsDate;
        newMail.querySelector(".earnings-id-popup").innerHTML = earningsId;

        if (earningsStatus == "Declined") {
            newMail.querySelector(".rewards-status").classList.add("end")
        }

        document.getElementById("user-earnings-container").append(newMail)
    })
    addListeners()
}


// ------- All functions for popup cards ------- //

// this functions take the event show and adds a class active to popup-container showing the popup
// this functions take the event show and adds a class dim that blocks other events in window
function openPopup(show) {
    show.classList.add('active')
    overlay.classList.add('dim')
}

// this functions take the event die and removes the class active to popup-container hiding the popup
// this functions take the event hide and removes the class dim that unblocks other events in window
function closePopup(hide) {
    hide.classList.remove('active')
    overlay.classList.remove('dim')
}

// This function add event listeners to all card-bodies
function addListeners() {

    // ---------- popup cards with more info --------- //
    const openButtons = document.querySelectorAll('.card-body')
    const closeButtons = document.querySelectorAll('.close-btn')

    // when the card-body is click it will take its popup-container and display it on window
    openButtons.forEach(button => {
        console.log(button)
        button.addEventListener('click', (event) => {
            show = button.nextElementSibling
            // console.log(show)
            openPopup(show)
        })
    })

    // when the close button in popup is click it will take its popup-container and hide it from the window
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            hide = button.parentElement.parentElement
            console.log(hide)
            closePopup(hide)
        })
    })
}

// when overlay outside the popup is click it will take its popup-container and hide it from the window
overlay.addEventListener('click', () => {
    hide = document.getElementsByClassName('active')[0]
    console.log(hide)
    closePopup(hide)
})

// -------- All functions for the toggle buttons -------- //

rewardsButton.addEventListener('click', () => {
    if (earningsSection.style.display != 'none') {
        earningsSection.style.display = 'none'
        earningsButton.style.background = "white"
        rewardsSection.style.display = 'block';
        rewardsButton.style.background = "gainsboro"
        // alert(true)
    } else {
        // alert(false)
        rewardsSection.style.display = 'block';
        rewardsButton.style.background = "white"
    }
})

earningsButton.addEventListener('click', () => {
    if (rewardsSection.style.display != 'none') {
        rewardsSection.style.display = 'none'
        rewardsButton.style.background = "white"
        earningsSection.style.display = 'block';
        earningsButton.style.background = "gainsboro"
        // alert(true)
    } else {
        // alert(false)
        earningsSection.style.display = 'block';
        earningsButton.style.background = "white"
    }
})

function displayUsername(data) {
    $('.hero > h2').html(`Welcome, ${data[0].first_name}!`);
}

function requestUsername() {
    $.ajax({
        url: 'http://localhost:3000/checkProfile',
        type: 'GET',
        success: displayUsername
    })
}

// requests an object with all rewards the user has redeemed
function requestOwnedRewards() {
    $.ajax({
        url: 'http://localhost:3000/getUserRewards',
        type: 'GET',
        success: populate_rewards
    })
}

// requests an object with all receipts user has posted
function requestOwnedReceipts() {
    $.ajax({
        url: 'http://localhost:3000/getReceiptData',
        type: 'GET',
        success: populate_earnings
    })
}

// redirects the user to authentication.html if user is not logged in
function redirectToLogin(data) {
    if (!data.loggedIn) {
        alert("You are logged out. Please login to access this page.");
        window.location.href = './authentication.html';
    }
    else {
        requestOwnedRewards();
        requestOwnedReceipts();
        requestUsername();
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
}

$(document).ready(setup)