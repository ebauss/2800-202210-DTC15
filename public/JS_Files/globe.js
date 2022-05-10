// FloatingBar variables
const globeIcon = document.querySelector("#world-btn")

function disableIcon(){
    globeIcon.style.pointerEvents = "none"
    globeIcon.style.cursor = "default"
}

function setup(){
    disableIcon()
}

$(document).ready(setup)