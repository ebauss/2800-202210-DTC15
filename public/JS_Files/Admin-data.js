dummy_data = [
    {
     "user_id": 0,
     "password": 23131232132132,
     "firstname": "Jake",
     "lastname": "Hell",
     "email": "HellJake@Glassballoon.py",
     "country": "Canada",
     "age": 0,
     "profile_icon": "htpps/",
     "reward_points": 200,
     "compass_id": "2312321",
     "is_admin": true
    }
]

function populate_table(data){
    let tableTemplate = document.getElementById("table-template")
    data.forEach(element => {
        userID = element.user_id; 
        password = element.password;
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
        newcell.querySelector(".user-password").innerHTML = `${password}`
        newcell.querySelector(".user-email").innerHTML = `${email}`
        newcell.querySelector(".user-country").innerHTML = `${country}`
        newcell.querySelector(".user-points").innerHTML = `${points}`
        newcell.querySelector(".user-age").innerHTML = `${age}`
        newcell.querySelector(".user-profile-icon").innerHTML = `${profile_icon}`
        newcell.querySelector(".user-compass-id").innerHTML = `${compass_id}`
        newcell.querySelector(".user-admin").innerHTML = `${is_admin}`

        document.getElementById("table-body").append(newcell);
    });
}

function setup(){
    populate_table(dummy_data)
}

$(document).ready(setup)