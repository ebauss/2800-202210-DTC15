function requestUserData() {
    console.log("User data requested");
    $.ajax(
        {
            url: "http://localhost:3000/requestUserData",
            type: "GET",
            success: populate_table
        }
    )
}

function populate_table(data) {
    var i = 0
    let tableTemplate = document.getElementById("table-template")
    data.forEach(element => {
        userID = element.user_id;
        password = element.password;
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
        newcell.querySelector(".user-id").innerHTML = `${userID}`
        newcell.querySelector(".user-first-name").innerHTML = `${fName}`
        newcell.querySelector(".user-last-name").innerHTML = `${lName}`
        newcell.querySelector(".user-password").innerHTML = `Password: ${password}`
        newcell.querySelector(".user-email").innerHTML = `Email: ${email}`
        newcell.querySelector(".user-country").innerHTML = `Country: ${country}`
        newcell.querySelector(".user-points").innerHTML = `Reward-Points: ${points}`
        newcell.querySelector(".user-age").innerHTML = `Age: ${age}`
        newcell.querySelector(".user-profile-icon").innerHTML = `Profile Icon: ${profile_icon}`
        newcell.querySelector(".user-compass-id").innerHTML = `CompassID: ${compass_id}`
        newcell.querySelector(".user-admin").innerHTML = `Admin: ${is_admin}`
        newcell.querySelector(".cell-dropdown-icon").setAttribute("id", i)

        document.getElementById("table-body").append(newcell);
        i++;
    });
    dropdown();
}

function dropdown() {
    // Cell-DropDownMenu Functions
    var new_selected_dropdown;
    const dropdown_icon = document.querySelectorAll(".cell-dropdown-icon"); //
    const cellMenu = document.querySelectorAll(".cell-menu");
    

    dropdown_icon.forEach(dropdown => dropdown.addEventListener("click", () => {
        new_selected_dropdown = parseInt(dropdown.getAttribute("id"))
        dropdown_icon[new_selected_dropdown].classList.toggle("active")
        cellMenu[new_selected_dropdown].classList.toggle("active")
    }))
}

function setup() {
    requestUserData();
}

$(document).ready(setup)