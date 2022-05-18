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
    }
    $('#user-email').html(data[0].email);
    $('#value').val(data[0].reward_points / 100);

    $('#message').val(data[0].notes);
}

function processVerification(data) {
    console.log(data);
    alert("Record has been updated motherfucker");
}

function requestVerification() {
    today = new Date();

    $.ajax({
        url: "http://localhost:3000/verifyReceipt",
        type: "POST",
        data: {
            value: $('#value').val(data[0].reward_points / 100),
            notes: $('#message').val(data[0].notes),
            verified_date: today.toISOString()
        },
        success: processVerification
    })
}

function setup() {
    getSingleReceiptData();
    $('#verify').click(requestVerification);
};

$(document).ready(setup);