// ---------- popup cards with more info --------- //
const openButtons = document.querySelectorAll('.card-body')
const closeButtons = document.querySelectorAll('.close-btn')
const overlay = document.getElementById('overlay')

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

// when the card-body is click it will take its popup-container and display it on window
openButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        show = button.nextElementSibling
        // console.log(show)
        openPopup(show)
    })
})

// when the close button in popup is click it will take its popup-container and hide it from the window
closeButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        hide = button.parentElement.parentElement
        console.log(hide)
        closePopup(hide)
    })
})

// when overlay outside the popup is click it will take its popup-container and hide it from the window
overlay.addEventListener('click',() =>{
    hide = document.getElementsByClassName('active')[0]
    console.log(hide)
    closePopup(hide)
})


// ---------- toggle section between buttons ----------- //
const rewardsSection=document.getElementById('user-rewards')
const earningsSection=document.getElementById('user-earnings')
const rewardsButton=document.getElementById('rewards-btn')
const earningsButton=document.getElementById('earnings-btn')


rewardsButton.addEventListener('click', () =>{
    if (earningsSection.style.display != 'none'){
        earningsSection.style.display = 'none'
        rewardsSection.style.display = 'block';
        // alert(true)
    }else{
        // alert(false)
        rewardsSection.style.display = 'block';
    }
})

earningsButton.addEventListener('click', () =>{
    if (rewardsSection.style.display != 'none'){
        rewardsSection.style.display = 'none'
        earningsSection.style.display = 'block';
        // alert(true)
    }else{
        // alert(false)
        earningsSection.style.display = 'block';
    }
})