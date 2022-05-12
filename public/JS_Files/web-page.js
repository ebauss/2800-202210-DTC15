dummy_user = [
    {
        user_id: "sdasdasdasdasdaqwe",
        firstName: "Jake",
        lastname: "Navarro",
        email: "Hell_Card@gmail.com",
        country: "CA",
        age: 12,
        profile_icon: "",
        points: 1230,
        compass_id: 2314324241,
        is_admin: true

    },
    {
        user_id: "sdasdasdasdasdaqwe",
        firstName: "Jake",
        lastname: "Navarro",
        email: "Hell_Card@gmail.com",
        country: "CA",
        age: 12,
        profile_icon: "",
        points: 1230,
        compass_id: 2314324241,
        is_admin: true

    },
    {
        user_id: "sdasdasdasdasdaqwe",
        firstName: "Jake",
        lastname: "Navarro",
        email: "Hell_Card@gmail.com",
        country: "CA",
        age: 12,
        profile_icon: "",
        points: 1230,
        compass_id: 2314324241,
        is_admin: true

    },
]

dummy_receipts = [
    {
        user_id: "sdasdasdasdasdaqwe",
        receipt_id: "dasdasdasdsada",
        image_file: "dsadas.png",
        receiptStatus: "pending",
        admin: "To be determined",
    },
    {
        user_id: "sdasdasdasdasdaqwe",
        receipt_id: "dasdasdasdsada",
        image_file: "dsadas.png",
        receiptStatus: "pending",
        admin: "To be determined",
    },
    {
        user_id: "sdasdasdasdasdaqwe",
        receipt_id: "dasdasdasdsada",
        image_file: "dsadas.png",
        receiptStatus: "pending",
        admin: "To be determined",
    },
]

function user_populate_table(data) {
    let tableTemplate = document.getElementById("table-template-users")
    data.forEach(element => {
        userID = element.user_id;
        fName = element.firstname;
        lName = element.lastname;
        email = element.email;
        country = element.country;
        age = element.age;
        profile_icon = element.profile_icon;
        points = element.reward_points;
        compass_id = element.compass_id;
        is_admin = element.is_admin;

        let newcell = tableTemplate.content.cloneNode(true);
        newcell.querySelector(".user-id").innerHTML = `${userID}`
        newcell.querySelector(".user-first-name").innerHTML = `${fName}`
        newcell.querySelector(".user-last-name").innerHTML = `${lName}`
        newcell.querySelector(".user-email").innerHTML = `${email}`
        newcell.querySelector(".user-country").innerHTML = `${country}`
        newcell.querySelector(".user-reward-points").innerHTML = `${points}`
        newcell.querySelector(".user-age").innerHTML = `${age}`
        newcell.querySelector(".user-profile-icon").innerHTML = `${profile_icon}`
        newcell.querySelector(".user-compass-id").innerHTML = `${compass_id}`
        newcell.querySelector(".user-admin").innerHTML = `${is_admin}`

        document.getElementById("user-table-body").append(newcell);
    });
}

function receipts_populate_table(data){
    let tableTemplate = document.getElementById("table-template-receipt")
    i = 1
    data.forEach(info => {
        receiptUser = info.user_id
        receipt = info.receipt_id
        imageFile = info.image_file
        receiptStatus = info.status
        receiptAdmin = info.admin 

        let newcell = tableTemplate.content.cloneNode(true);
        newcell.querySelector(".receipt-number").innerHTML = i
        newcell.querySelector(".receipt-user-id").innerHTML = `${receiptUser}`
        newcell.querySelector(".receipt-id").innerHTML = `${receipt}`
        newcell.querySelector(".receipt-image-file").innerHTML = `${imageFile}`
        newcell.querySelector(".receipt-status").innerHTML = `${receiptStatus}`
        newcell.querySelector(".receipt-admin").innerHTML = `${receiptAdmin}`

        document.getElementById("receipts-table-body").append(newcell);
        i++
    })
}

function setup() {
    user_populate_table(dummy_user)
    receipts_populate_table(dummy_receipts)
}

$(document).ready(setup)