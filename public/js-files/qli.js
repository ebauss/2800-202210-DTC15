// DEBUGGING: for quickly signing in without credentials

function processRequest(data) {
    switch (data) {
        case 'ac130':
            alert('AC-130 ABOVE!!');
            window.location.href= './admin.html';
            break;
        case 'tsubasa':
            alert('You are now Tsubasa Kazanari');
            window.location.href='./profile.html';
            break;
    }
}

function makeRequestStandard() {
    $.ajax({
        url: 'http://localhost:3000/quickLogin',
        type: 'GET',
        success: processRequest
    })
}

function makeRequestAdmin() {
    $.ajax({
        url: 'http://localhost:3000/quickLoginAdmin',
        type: 'GET',
        success: processRequest
    })
}

function setup() {
    $('#quick-login-standard').click(makeRequestStandard);
    $('#quick-login-admin').click(makeRequestAdmin);
}

$(document).ready(setup);