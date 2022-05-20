function requestUserData() {
    console.log("User data requested");
    $.ajax(
        {
            url: "http://localhost:3000/requestUserData",
            type: "GET",
            success: (data) => {
                populate_table(data)
                populate_table(data, true)
            }
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

                if (clickedBtnKey == "rewards"){
                    document.getElementById("new-rewards").style.display = "block"
                }
                
            } else {
                otherBtnKey = otherBtn.id.split("-")[0]
                otherBtn.classList.remove("activated-button")
                if (getComputedStyle(webTables).display == "block") {
                    document.getElementById(otherBtnKey + "-table").style.display = "none"
                } else {
                    document.getElementById(otherBtnKey + "-collapsible-body").style.display = "none"
                }
                document.getElementById("new-rewards").style.display = "none"
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
        userID = element.user_id;
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

        newcell.querySelector(".user-id").innerHTML = userID;
        newcell.querySelector(".user-first-name").innerHTML = fName;
        newcell.querySelector(".user-last-name").innerHTML = lName;
        newcell.querySelector(".user-email").innerHTML = email;
        newcell.querySelector(".user-country").innerHTML = country;
        newcell.querySelector(".user-reward-points").innerHTML = points;
        newcell.querySelector(".user-age").innerHTML = age;
        newcell.querySelector(".user-profile-icon").innerHTML = profile_icon;
        newcell.querySelector(".user-compass-id").innerHTML = compass_id;
        newcell.querySelector(".user-admin").innerHTML = is_admin;
        newcell.querySelector(".user-delete-btn").setAttribute("id", userID);

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

function requestUserDeletion() {
    $.ajax({
        url: 'http://localhost:3000/deleteUser',
        type: "POST",
        data: {
            userIdToDelete: $(this).attr("id")
        },
        success: processDeleteUser
    })
}

// Function that populates the reward table/collapsible-body
function rewards_populate_table(data, mobile = false) {
    if (mobile) {
        var tableTemplate = document.getElementById("collapsible-template-rewards")
    } else {
        var tableTemplate = document.getElementById("table-template-rewards")
    }
    data.forEach(info => {
        company = info.company
        description = info.description
        value = info.value
        points = info.points_cost
        picUrl = info.photo
        let newcell = tableTemplate.content.cloneNode(true);

        if (picUrl === null) {
            picUrl = "Not Provided"
        }

        newcell.querySelector(".rewards-company").innerHTML = company;
        newcell.querySelector(".rewards-description").innerHTML = description;
        newcell.querySelector(".rewards-value").innerHTML = value;
        newcell.querySelector(".rewards-points-cost").innerHTML = points;
        newcell.querySelector('.reward-delete-btn').id = info.reward_id;

        if (mobile) {
            document.getElementById("rewards-collapsible-body").append(newcell)
        } else {
            document.getElementById("rewards-table-body").append(newcell);
        }
    })
    if (mobile) {
        allCollapsible = document.querySelectorAll(".collapsible-data-rewards")
        allCollapsible.forEach(collapsible => {
            collapsible.addEventListener("click", (event) => {
                event.target.classList.toggle("active-collapsible");
                content = event.target.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = "50vh";
                }
            })
        })
    }
}

// Function that populates the receipt table. This function only runs once. Once it is run, it populates all the receipt data into the table.
function receipts_populate_table(data, mobile = false) {
    if (mobile) {
        var tableTemplate = document.getElementById("collapsible-template-receipts")
    } else {
        var tableTemplate = document.getElementById("table-template-receipt")
    }
    i = 1

    console.log(data)

    data.forEach((receipt) => {
        date = receipt.verified_date.split("T")[0];
        email = receipt.email;
        receiptId = receipt.receipt_id;
        receiptStatus = receipt.admin_email;
        let newcell = tableTemplate.content.cloneNode(true);

        if (receiptStatus === null) {
            receiptStatus = "Not Verified";
        }
        else {
            receiptStatus = `Verified by ${receipt.admin_email}`;
            newcell.querySelector(".verify-btn").innerHTML = "View";
        }

        newcell.querySelector(".receipt-date").innerHTML = date;
        newcell.querySelector(".receipt-user-email").innerHTML = email;
        newcell.querySelector(".receipt-admin").innerHTML = receiptStatus;
        newcell.querySelector(".verify-btn").setAttribute("href", `./verification.html?receiptid=${receiptId}`);
        newcell.querySelector(".delete-btn").setAttribute("id", receiptId);

        if (mobile) {
            document.getElementById("receipt-collapsible-body").append(newcell)
        } else {
            document.getElementById("receipts-table-body").append(newcell);
        }
    })
    if (mobile) {
        allCollapsible = document.querySelectorAll(".collapsible-data-receipts");
        allCollapsible.forEach(collapsible => {
            collapsible.addEventListener("click", (event) => {
                event.target.classList.toggle("active-collapsible");
                content = event.target.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = "30vh";
                }
            })
        })
    }
}

function requestReceiptData() {
    $.ajax({
        url: "http://localhost:3000/getReceiptData",
        type: "GET",
        success: (data) => {
            receipts_populate_table(data);
            receipts_populate_table(data, true);
        }
    })
}

// redirects the user to main if they are not logged in or not an admin
function redirectToMain(data) {
    if (data[0] == undefined || !data[0].is_admin) {
        alert("You do not have permission to access this page.");
        window.location.href = './main.html';
    }
    else {
        // populates user data in table
        requestUserData();
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

function processReceiptDeletion(data) {
    if (data) {
        alert("Receipt was deleted.");
    }
}

function requestReceiptDeletion() {
    $.ajax({
        url: "http://localhost:3000/deleteReceipt",
        type: "POST",
        data: {
            receipt_id: $(this).attr("id")
        },
        success: processReceiptDeletion
    })
}

function requestRewards() {
    $.ajax({
        url: 'http://localhost:3000/requestAllRewards',
        type: 'POST',
        data: {
            criteria: "company",
            order: "ASC"
        },
        success: (data) => {
            rewards_populate_table(data);
            rewards_populate_table(data, true);
        }
    })
}

function requestRewardDeletion() {
    $.ajax({
        url: "http://localhost:3000/deleteReward",
        type: "POST",
        data: {
            reward_id: $(this).attr("id")
        },
        success: processRewardDeletion
    })
}

function processRewardDeletion(data) {
    if (data) {
        alert("Reward was deleted.");
    }
}

function setup() {
    verifyAdmin();
    requestReceiptData();
    requestRewards();
    $('body').on('click', '.user-delete-btn', requestUserDeletion);
    $('body').on('click', '.receipt-delete-btn', requestReceiptDeletion);
    $('body').on('click', '.reward-delete-btn', requestRewardDeletion);
}

$(document).ready(setup)