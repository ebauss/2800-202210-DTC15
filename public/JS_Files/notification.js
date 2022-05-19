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
function poopulate_rewards(rewards) {

    // ------ Takes the template from the HTML file ------ //
    const earningsTemplate = document.getElementById("rewards-template")

    // ------ Grabs all values for every rewards mail -------//
    rewards.forEach(mail => {
        rewardStatus = mail.status;
        rewardsPoints = mail.points;
        rewardsTitle = mail.title;
        rewardsDate = mail.date;
        rewardsId = mail.rewardsID;
        rewardsCompany = mail.company;
        rewardsDescription = mail.description;
        rewardsImage = mail.img;

        // ------- creates a card ------- //
        let newMail = earningsTemplate.content.cloneNode(true);

        newMail.querySelector(".rewards-status").innerHTML = rewardStatus;
        newMail.querySelector(".rewards-points").innerHTML = rewardsPoints;
        newMail.querySelector(".rewards-title").innerHTML = rewardsTitle;
        newMail.querySelector(".rewards-date").innerHTML = rewardsDate;
        newMail.querySelector(".rewards-id").innerHTML = rewardsId;
        newMail.querySelector(".rewards-status-popup").innerHTML = rewardStatus;
        newMail.querySelector(".rewards-points-popup").innerHTML = rewardsPoints;
        newMail.querySelector(".rewards-title-popup").innerHTML = rewardsTitle;
        newMail.querySelector(".rewards-date-popup").innerHTML = rewardsDate;
        newMail.querySelector(".rewards-id-popup").innerHTML = rewardsId;
        newMail.querySelector(".rewards-company").innerHTML = rewardsCompany;
        newMail.querySelector(".rewards-description").innerHTML = rewardsDescription;
        newMail.querySelector(".rewards-img").setAttribute("src", rewardsImage)

        if (rewardStatus == "Claimed" || rewardStatus == "Expired") {
            newMail.querySelector(".rewards-status").classList.add("end")
        }

        document.getElementById("user-rewards-container").append(newMail)
    })
}

// ------- A function that populates the rewards container -------- //
function poopulate_earnings(earnings) {

    // ------ Takes the template from the HTML file ------ //
    const earningsTemplate = document.getElementById("earnings-template")

    // ------ Grabs all values for every rewards mail -------//
    earnings.forEach(mail => {
        earningsStatus = mail.status;
        earningsPoints = mail.points;
        earningsDate = mail.date;
        earningsId = mail.earningsID;
        earningsDescription = mail.description;

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
        newMail.querySelector(".earnings-description").innerHTML = earningsDescription;

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

function setup() {
    poopulate_rewards(dummy_rewards)
    poopulate_earnings(dummy_earnings)
}

$(document).ready(setup)