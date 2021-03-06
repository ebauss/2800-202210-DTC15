// ---------- popup cards with more info --------- //
const overlay = document.getElementById('overlay')

// ---------- toggle section between buttons ----------- //
const rewardsSection = document.getElementById('user-rewards-container')
const earningsSection = document.getElementById('user-earnings-container')
const rewardsButton = document.getElementById('rewards-btn')
const earningsButton = document.getElementById('earnings-btn')

// ------- All Functions for populating the card ------- //

// ------- A function that populates the rewards container -------- //
function populateRewards(rewards) {

    // ------ Takes the template from the HTML file ------ //
    const earningsTemplate = document.getElementById('rewards-template')

    console.log(rewards);

    // ------ Grabs all values for every reward -------//
    rewards.forEach(reward => {
        rewardsPoints = `${reward.points_cost.toLocaleString('en-CA')} points`;
        rewardsTitle = `${reward.company} - $${reward.value}`;
        rewardsDate = reward.redeemed_date.split('T')[0];
        rewardsId = reward.description;
        rewardsCompany = reward.company;
        rewardsImage = reward.photo;

        // ------- creates a card ------- //
        let newMail = earningsTemplate.content.cloneNode(true);

        newMail.querySelector('.rewards-points').innerHTML = rewardsPoints;
        newMail.querySelector('.rewards-title').innerHTML = rewardsTitle;
        newMail.querySelector('.rewards-date').innerHTML = rewardsDate;
        newMail.querySelector('.rewards-id').innerHTML = rewardsId;
        newMail.querySelector('.rewards-points-popup').innerHTML = rewardsPoints;
        newMail.querySelector('.rewards-title-popup').innerHTML = rewardsTitle;
        newMail.querySelector('.rewards-date-popup').innerHTML = rewardsDate;
        newMail.querySelector('.rewards-id-popup').innerHTML = rewardsId;
        newMail.querySelector('.rewards-img').setAttribute('src', rewardsImage)

        document.getElementById('user-rewards-container').append(newMail)
    })
}

// ------- A function that populates the rewards container -------- //
function populateEarnings(earnings) {

    // ------ Takes the template from the HTML file ------ //
    const earningsTemplate = document.getElementById('earnings-template')

    // ------ Grabs all values for every rewards mail -------//
    earnings.forEach(receipt => {
        console.log(receipt);

        if (receipt.admin_id == null) {
            earningsStatus = 'Pending';
        }
        else {
            earningsStatus = 'Verified';
        }
        
        earningsPoints = `${receipt.reward_points.toLocaleString('en-CA')} points`;

        if (receipt.verified_date == null) {
            earningsDate = ''
        }
        else {
            earningsDate = receipt.verified_date.split('T')[0];        
        }

        earningsId = receipt.notes;

        // ------- creates a card ------- //
        let newMail = earningsTemplate.content.cloneNode(true);

        newMail.querySelector('.earnings-status').innerHTML = earningsStatus;
        newMail.querySelector('.earnings-points').innerHTML = earningsPoints;
        newMail.querySelector('.earnings-date').innerHTML = earningsDate;
        newMail.querySelector('.earnings-id').innerHTML = earningsId;
        newMail.querySelector('.earnings-status-popup').innerHTML = earningsStatus;
        newMail.querySelector('.earnings-points-popup').innerHTML = earningsPoints;
        newMail.querySelector('.earnings-date-popup').innerHTML = earningsDate;
        newMail.querySelector('.earnings-id-popup').innerHTML = earningsId;

        if (earningsStatus == 'Declined') {
            newMail.querySelector('.earnings-status').classList.add('end')
            newMail.querySelector('.earnings-status-popup').classList.add('end')
        } else if (earningsStatus == "Pending") {
            newMail.querySelector(".earnings-status").classList.add("pending")
            newMail.querySelector('.earnings-status-popup').classList.add("pending")
        } else {
            newMail.querySelector(".earnings-status").classList.add("start")
            newMail.querySelector('.earnings-status-popup').classList.add("start")
        }

        document.getElementById('user-earnings-container').append(newMail)
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
        earningsButton.style.background = 'white'
        rewardsSection.style.display = 'block';
        rewardsButton.style.background = 'gainsboro'
        // alert(true)
    } else {
        // alert(false)
        rewardsSection.style.display = 'block';
        rewardsButton.style.background = 'white'
    }
})

earningsButton.addEventListener('click', () => {
    if (rewardsSection.style.display != 'none') {
        rewardsSection.style.display = 'none'
        rewardsButton.style.background = 'white'
        earningsSection.style.display = 'block';
        earningsButton.style.background = 'gainsboro'
        // alert(true)
    } else {
        // alert(false)
        earningsSection.style.display = 'block';
        earningsButton.style.background = 'white'
    }
})

// changes the page's greeting to welcome the user by name
function displayUsername(data) {
    $('.hero > h2').html(`Welcome, ${data[0].first_name}!`);
}


function requestUsername() {
    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/checkProfile',
        type: 'GET',
        success: displayUsername
    })
}

// requests an object with all rewards the user has redeemed
function requestOwnedRewards() {
    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/getUserRewards',
        type: 'GET',
        success: populateRewards
    })
}

// requests an object with all receipts user has posted
function requestOwnedReceipts() {
    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/getUserReceipts',
        type: 'GET',
        success: populateEarnings
    })
}

// redirects the user to authentication.html if user is not logged in
function redirectToLogin(data) {
    if (!data.loggedIn) {
        alert('You are logged out. Please login to access this page.');
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
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/loginStatus',
        type: 'GET',
        success: redirectToLogin
    })
}

function setup() {
    verifyLogin();
}

$(document).ready(setup)