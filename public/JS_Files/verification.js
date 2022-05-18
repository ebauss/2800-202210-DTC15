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

function setup() {
    getSingleReceiptData();
};

$(document).ready(setup);