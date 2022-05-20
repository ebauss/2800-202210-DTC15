// --------------------------------------------------------------- //
// ------ All functions and codes that interacts with MYSQL ------ //
// --------------------------------------------------------------- //

// requests all users' information to populate the users table
function requestUserData() {
    console.log('User data requested');
    $.ajax(
        {
            url: 'http://localhost:3000/requestUserData',
            type: 'GET',
            success: (data) => {
                populate_table(data)
                populate_table(data, true)
            }
        }
    )
}

// Function that populates the rewards table/collapsible-body
function getUserEmailByUserId(data) {
    $.ajax({
        url: `http://localhost:3000/checkProfile/id/${data}`,
        type: 'GET',
        success: (data) => {
        }
    })
}

// inform user that deletion was successful
function processDeleteUser(data) {
    alert(`User ${data} has been deleted.`);
    location.reload();
}

// request server to delete a specific user
function requestUserDeletion() {
    $.ajax({
        url: 'http://localhost:3000/deleteUser',
        type: 'POST',
        data: {
            userIdToDelete: $(this).attr('id')
        },
        success: processDeleteUser
    })
}

function requestReceiptData() {
    $.ajax({
        url: 'http://localhost:3000/getAllReceiptData',
        type: 'GET',
        success: (data) => {
            receipts_populate_table(data);
            receipts_populate_table(data, true);
        }
    })
}

// redirects the user to main if they are not logged in or not an admin
function redirectToMain(data) {
    if (data[0] == undefined || !data[0].is_admin) {
        alert('You do not have permission to access this page.');
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
        url: 'http://localhost:3000/checkProfile',
        type: 'GET',
        success: redirectToMain
    })
}

// inform user receipt deletion was successful
function processReceiptDeletion(data) {
    if (data) {
        alert('Receipt was deleted.');
    }
}

// request server to delete a specific receipt
function requestReceiptDeletion() {
    $.ajax({
        url: 'http://localhost:3000/deleteReceipt',
        type: 'POST',
        data: {
            receipt_id: $(this).attr('id')
        },
        success: processReceiptDeletion
    })
}

// request all rewards to populate rewards table
function requestRewards() {
    $.ajax({
        url: 'http://localhost:3000/requestAllRewards',
        type: 'POST',
        data: {
            criteria: 'company',
            order: 'ASC'
        },
        success: (data) => {
            rewards_populate_table(data);
            rewards_populate_table(data, true);
        }
    })
}

// inform user reward deletion was successful
function processRewardDeletion(data) {
    if (data) {
        alert('Reward was deleted.');
    }
}

// request a specific reward to be deleted
function requestRewardDeletion() {
    $.ajax({
        url: 'http://localhost:3000/deleteReward',
        type: 'POST',
        data: {
            reward_id: $(this).attr('id')
        },
        success: processRewardDeletion
    })
}

function processRewardDeletion(data) {
    if (data) {
        alert("Reward was deleted.");
    }
}

// ------------------------------------------------------------------------------------------------------------ //
// ---- All functionalities and code to change table displayed when admin clicked on the button the header ---- //
// ------------------------------------------------------------------------------------------------------------ //

// ------ Important variables ------- // 
headerBtns = document.querySelectorAll(".header-btn")
webTables = document.querySelector(".web-page")

// ------ An event listener when users clicked on the one of the button on the header ------ //
headerBtns.forEach((btn) => {
    // ---- Applies an event listener to all the button ---- //
    btn.addEventListener("click", (clickedBtn) => {
        headerBtns.forEach(otherBtn => {
            // Checks if the button is the one that is clicked
            if (otherBtn == clickedBtn.target) {
                // if button is indeed clicked,
                // it will add a class called activat-button
                clickedBtn.target.classList.add("activated-button")
                // it will takes its name tag - either, users, receipts or rewards
                clickedBtnKey = clickedBtn.target.id.split("-")[0]
                // Checks which screen the user is using -> either web or mobile
                if (getComputedStyle(webTables).display === "block") {
                    // if user is accessing the app through web
                    // displays the table
                    document.getElementById(clickedBtnKey + "-table").style.display = "table"
                } else {
                    // if user is accessing the app through mobile
                    // displays the collapsible cards
                    document.getElementById(clickedBtnKey + "-collapsible-body").style.display = "block"
                } 
                // If the  button clicked is rewards section 
                // then the css will display a tag where users can submit new rewards
                if (clickedBtnKey == "rewards"){
                    document.getElementById("new-rewards").style.display = "block"
                }
            // if button is not clicked or other button is clicked
            } else {
                // It will remove the class: activated-button on the previously clicked button
                otherBtnKey = otherBtn.id.split("-")[0]
                otherBtn.classList.remove("activated-button")

                // checks if user is using web or mobile either way, this will make sure the previously
                // clicked button is hidden and not displayed
                if (getComputedStyle(webTables).display == "block") {
                    document.getElementById(otherBtnKey + "-table").style.display = "none"
                } else {
                    document.getElementById(otherBtnKey + "-collapsible-body").style.display = "none"
                }
                // hides the add-rewards button
                document.getElementById("new-rewards").style.display = "none"
            }
        })
    })
})


// --------------------------------------------------------------------------------- //
// ------ All functions and codes responsible for populating the tables/cards ------ //
// --------------------------------------------------------------------------------- //

// Function that populates the user's table
function populate_table(data, mobile = false) {
    if (mobile) {
        var tableTemplate = document.getElementById("collapsible-template-users")
    } else {
        var tableTemplate = document.getElementById("table-template-users")
    }
    data.forEach(element => {
        // Gets the data
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

        // Modifies the value into a more user-friendly jargon
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

        // shows the data into its rightful tag
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

        // populates the mobile and the web containers
        if (mobile) {
            document.getElementById("user-collapsible-body").append(newcell)
        } else {
            document.getElementById("user-table-body").append(newcell);
        }
    });
    // Adds an event listener for all the collapsible card
    // so that when clicked the card will collapse
    if (mobile) {

        // code is from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible
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

function setup() {
    verifyAdmin();
    requestReceiptData();
    requestRewards();
    $('body').on('click', '.user-delete-btn', requestUserDeletion);
    $('body').on('click', '.receipt-delete-btn', requestReceiptDeletion);
    $('body').on('click', '.reward-delete-btn', requestRewardDeletion);
}

$(document).ready(setup)