function requestUserData() {
    console.log("User data requested");
    $.ajax(
        {
            url: "https://sustainably-2800-202210-dtc15.herokuapp.com/requestUserData",
            type: "GET",
            success: populate_table
        }
    )
}

// An eventlistener that changes the table when user clicked one of the buttons on the header
headerBtns = document.querySelectorAll(".header-btn")
webTables = document.querySelector(".web-page")


headerBtns.forEach((btn) => {
    btn.addEventListener("click", (clickedBtn) => {
        headerBtns.forEach(otherBtn => {
            if (otherBtn == clickedBtn.target) {
                clickedBtn.target.classList.add("activated-button")
                clickedBtnKey = clickedBtn.target.id.split("-")[0]
                if (getComputedStyle(webTables).display === "block") {
                    document.getElementById(clickedBtnKey + "-table").style.display = "table"
                } else {
                    document.getElementById(clickedBtnKey + "-collapsible-body").style.display = "block"
                }
            } else {
                otherBtnKey = otherBtn.id.split("-")[0]
                otherBtn.classList.remove("activated-button")
                if (getComputedStyle(webTables).display == "block") {
                    document.getElementById(otherBtnKey + "-table").style.display = "none"
                } else {
                    document.getElementById(otherBtnKey + "-collapsible-body").style.display = "none"
                }
            }
        })
    })
})

// Function that populates the user's table
function populate_table(data, mobile = false) {
    if (mobile) {
        var tableTemplate = document.getElementById("collapsible-template-users")
    } else {
        var tableTemplate = document.getElementById("table-template-users")
    }
    data.forEach(element => {
        userID = element.user_id;``
        fName = element.first_name;
        lName = element.last_name;
        email = element.email;
        country = element.country;
        age = element.age;
        profile_icon = element.profile_icon;
        points = element.reward_points;
        compass_id = element.compass_id;
        is_admin = element.is_admin;

        let newcell = tableTemplate.content.cloneNode(true);

        if (profile_icon == null) {
            profile_icon = "Not provided";
        }

        if (is_admin) {
            is_admin = "Yes";
        }
        else {
            is_admin = "No";
        }

        if (!compass_id) {
            compass_id = "Not provided";
        }

        newcell.querySelector(".user-id").innerHTML = `${userID}`
        newcell.querySelector(".user-first-name").innerHTML = `${fName}`
        newcell.querySelector(".user-last-name").innerHTML = ` ${lName}`
        newcell.querySelector(".user-email").innerHTML = `${email}`
        newcell.querySelector(".user-country").innerHTML = `${country}`
        newcell.querySelector(".user-reward-points").innerHTML = `${points}`
        newcell.querySelector(".user-age").innerHTML = `${age}`
        newcell.querySelector(".user-profile-icon").innerHTML = `${profile_icon}`
        newcell.querySelector(".user-compass-id").innerHTML = `${compass_id}`
        newcell.querySelector(".user-admin").innerHTML = `${is_admin}`
        newcell.querySelector(".user-delete").setAttribute("id", userID)

        if (mobile) {
            document.getElementById("user-collapsible-body").append(newcell)
        } else {
            document.getElementById("user-table-body").append(newcell);
        }
    });
    if (mobile) {
        allCollapsible = document.querySelectorAll(".collapsible-data-user")
        allCollapsible.forEach(collapsible => {
            collapsible.addEventListener("click", (event) => {
                event.target.classList.toggle("active");
                content = event.target.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = "90vh";
                }
            })
        })
    }
}

function processDeleteUser(data) {
    alert(`User ${data} has been deleted.`);
    location.reload();
}

function deleteUser() {
    $.ajax({
        url: 'https://sustainably-2800-202210-dtc15.herokuapp.com/deleteUser',
        type: "POST",
        data: {
            userIdToDelete: $(this).attr("id")
        },
        success: processDeleteUser
    })
}

// Function that populates the receipt table
function receipts_populate_table(data, mobile = false) {
    if (mobile) {
        var tableTemplate = document.getElementById("collapsible-template-receipts")
    } else {
        var tableTemplate = document.getElementById("table-template-receipt")
    }
    i = 1
    data.forEach(info => {
        receiptUser = info.user_id
        receipt = info.receipt_id
        imageFile = info.image_file
        receiptStatus = info.status
        receiptAdmin = info.admin
        let newcell = tableTemplate.content.cloneNode(true);

        if (mobile) {
            newcell.querySelector(".receipt-user-id").innerHTML = `${receiptUser}`
            newcell.querySelector(".receipt-id").innerHTML = `${receipt}`
            newcell.querySelector(".receipt-image-file").innerHTML = `${imageFile}`
            newcell.querySelector(".receipt-status").innerHTML = `${receiptStatus}`
            newcell.querySelector(".receipt-admin").innerHTML = `${receiptAdmin}`
            newcell.querySelector(".user-delete").setAttribute("id", receipt)
        } else {
            newcell.querySelector(".receipt-number").innerHTML = i
            newcell.querySelector(".receipt-user-id").innerHTML = `${receiptUser}`
            newcell.querySelector(".receipt-id").innerHTML = `${receipt}`
            newcell.querySelector(".receipt-image-file").innerHTML = `${imageFile}`
            newcell.querySelector(".receipt-status").innerHTML = `${receiptStatus}`
            newcell.querySelector(".receipt-admin").innerHTML = `${receiptAdmin}`
            newcell.querySelector(".user-delete").setAttribute("id", receipt)
        }

        if (mobile) {
            document.getElementById("receipt-collapsible-body").append(newcell)
        } else {
            document.getElementById("receipts-table-body").append(newcell);
            i++
        }
    })
    if (mobile) {
        allCollapsible = document.querySelectorAll(".collapsible-data-receipts")
        allCollapsible.forEach(collapsible => {
            collapsible.addEventListener("click", (event) => {
                event.target.classList.toggle("active");
                content = event.target.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = "40vh";
                }
            })
        })
    }
}

function setup() {
    requestUserData();
    $('body').on('click', '.user-delete', deleteUser);
}

$(document).ready(setup)