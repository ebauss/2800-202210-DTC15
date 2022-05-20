var userId;

function getSingleReceiptData() {
    let currentUrl = parseInt(location.href.split('=')[1]);

    $.ajax({
        url: `http://localhost:3000/getSingleReceiptData`,
        type: 'POST',
        data: {
            receipt_id: currentUrl,
        },
        success: processSingleReceiptData
    })
}

function processSingleReceiptData(data) {
    userId = data[0].user_id;

    $('#receipt-img').attr('src', data[0].picture);

    if (data[0].admin_id == null) {
        $('#admin').html('Not verified yet.')
    } else {
        // disable fields if receipt has already been verified
        $('#admin').html(data[0].admin_email);
        $('#company').prop('disabled', true);
        $('#value').prop('disabled', true);
        $('#points').prop('disabled', true);
        $('#message').prop('disabled', true);
        $('#verify').prop('disabled', true);
        $('#verify').html('Already verified');
    }

    $('#user-email').html(data[0].email);
    $('#value').val(data[0].reward_points / 100);

    $('#message').val(data[0].notes);
}

function processVerification(data) {
    console.log(data);
    alert("Record has been updated.");
    location.href = './admin.html';
}

function requestVerification() {
    today = new Date();

    if (isNaN($('#value').val())) {
        alert('You must enter a number for the receipt value.');
        return;
    }

    $.ajax({
        url: "http://localhost:3000/verifyReceipt",
        type: "POST",
        data: {
            value: parseInt($('#value').val()),
            notes: $('#message').val(),
            verified_date: today.toISOString().split("T")[0],
            receipt_id: parseInt(location.href.split('=')[1]),
            user_id: userId
        },
        success: processVerification
    })
}

// redirects the user to main if they are not logged in or not an admin
function redirectToMain(data) {
    if (data[0] == undefined || !data[0].is_admin) {
        alert("You do not have permission to access this page.");
        window.location.href = './main.html';
    }
    else {
        getSingleReceiptData();
    }
}

// sends request to server to get user's details
function verifyAdmin() {
    $.ajax({
        url: "http://localhost:3000/checkProfile",
        type: "GET",
        success: redirectToMain
    })
}

function setup() {
    verifyAdmin();
    $('#verify').click(requestVerification);
};

$(document).ready(setup);