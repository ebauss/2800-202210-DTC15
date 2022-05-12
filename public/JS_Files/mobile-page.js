// dummy_user = [
//     {
//         user_id: "sdasdasdasdasdaqwe",
//         firstName: "Jake",
//         lastname: "Navarro",
//         email: "Hell_Card@gmail.com",
//         country: "CA",
//         age: 12,
//         profile_icon: "",
//         points: 1230,
//         compass_id: 2314324241,
//         is_admin: true

//     },
//     {
//         user_id: "sdasdasdasdasdaqwe",
//         firstName: "Jake",
//         lastname: "Navarro",
//         email: "Hell_Card@gmail.com",
//         country: "CA",
//         age: 12,
//         profile_icon: "",
//         points: 1230,
//         compass_id: 2314324241,
//         is_admin: true

//     },
//     {
//         user_id: "sdasdasdasdasdaqwe",
//         firstName: "Jake",
//         lastname: "Navarro",
//         email: "Hell_Card@gmail.com",
//         country: "CA",
//         age: 12,
//         profile_icon: "",
//         points: 1230,
//         compass_id: 2314324241,
//         is_admin: true

//     },
// ]

// // Function that populates the user's table
// async function user_populate_table(data) {
//     let tableTemplate = document.getElementById("table-template-users")
//     await data.forEach(element => {
//         userID = element.user_id;
//         fName = element.firstname;
//         lName = element.lastname;
//         email = element.email;
//         country = element.country;
//         age = element.age;
//         profile_icon = element.profile_icon;
//         points = element.reward_points;
//         compass_id = element.compass_id;
//         is_admin = element.is_admin;

//         let newcell = tableTemplate.content.cloneNode(true);
//         newcell.querySelector(".user-id").innerHTML = `${userID}`
//         newcell.querySelector(".user-first-name").innerHTML = `${fName}`
//         newcell.querySelector(".user-last-name").innerHTML = `${lName}`
//         newcell.querySelector(".user-email").innerHTML = `${email}`
//         newcell.querySelector(".user-country").innerHTML = `${country}`
//         newcell.querySelector(".user-reward-points").innerHTML = `${points}`
//         newcell.querySelector(".user-age").innerHTML = `${age}`
//         newcell.querySelector(".user-profile-icon").innerHTML = `${profile_icon}`
//         newcell.querySelector(".user-compass-id").innerHTML = `${compass_id}`
//         newcell.querySelector(".user-admin").innerHTML = `${is_admin}`

//         document.getElementById("user-table-body").append(newcell);
//     })
//     allCollapsible = document.querySelectorAll(".collapsible-data")
//     allCollapsible.forEach(collapsible => {
//         collapsible.addEventListener("click", (event) => {
//             event.target.classList.toggle("active");
//             content = event.target.nextElementSibling;
//             if (content.style.maxHeight) {
//                 content.style.maxHeight = null;
//             } else {
//                 content.style.maxHeight = content.scrollHeight + "px";
//             }
//         })
//     })
// }

// function setup() {
//     user_populate_table(dummy_user)
// }

// $(document).ready(setup)