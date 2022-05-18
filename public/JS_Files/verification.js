function getSingleReceiptData() {
    let currentUrl = parseInt(location.href.split('=')[1]);

    $.ajax({
        url: `http://localhost:3000/requestSingleReceiptData`,
        type: 'POST',
        data: {
            receipt_id: currentUrl,
        },
        success: processSingleReceiptData
    })
}

function processSingleReceiptData(data) {
    $('#receipt-img').attr('src', data[0].picture);

    if (data[0].admin_id == null) {
        $('#admin').html('Not verified yet.')
    } else {
        $('#admin').html(data[0].admin_email);
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

    $.ajax({
        url: "http://localhost:3000/verifyReceipt",
        type: "POST",
        data: {
            value: $('#value').val(),
            notes: $('#message').val(),
            verified_date: today.toISOString().split("T")[0],
            receipt_id: parseInt(location.href.split('=')[1])
        },
        success: processVerification
    })
}

function setup() {
    getSingleReceiptData();
    $('#verify').click(requestVerification);
};

$(document).ready(setup);