rewards = [
    {
        id: "rewards number 0001",
        title:"Get this Discount Reward Title 1",
        author: "sponsor for this discount goes here",
        photo: 'https://picsum.photos/id/237/200',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed sagittis enim, sit amet pretium neque. Sed in tempus ante.",
        cost: 50
    },
    {
        id: "rewards number 0002",
        title:"Another Discount Reward Title2",
        author: "sponsor for this discount goes here too",
        photo: 'https://picsum.photos/id/238/200',
        description:
        "Maecenas vel diam et erat gravida vulputate ut eget arcu. Pellentesque ultricies convallis tincidunt. Vivamus et accumsan dui, eu dignissim ex.",
        cost: 100
    },
    {
        id: "rewards number 0003",
        title:"Again Discount Reward Title",
        author: "sponsor for this discount goes here as well",
        photo: 'https://picsum.photos/id/239/200',
        description:
        "Pellentesque ultricies convallis tincidunt. Vivamus et accumsan dui, eu dignissim ex. Suspendisse eu sem tristique, sagittis ligula nec, sollicitudin dui.",
        cost: 1500
    }
    

]

function processRewards(data) {
    console.log(data);

    data.forEach((reward) => {
        let cardTag =
            `<br>
        <div class="rewards-container" id="?">      
        <div class="image-container">
        <img src="${reward.photo}">
        </div>
        <div class="rewards-title">
        <h2>${reward.company} - $${reward.value}</h2>
        </div>
        <div class="rewards-info">
        <p>${reward.description}</p>
        </div>
        <div class="cost">
        ${reward.points_cost} points
        <button class="redeem-points">Redeem</button>
        </div>
        </div>`

        $("#rewards").append(cardTag);
    })
}

function loadRewards() { 
    //for id = "place category " 
    //img is from database link
    // cost is out points, 

    rewards.map(data => {
        cardTag =
        `<br>
        <div class="rewards-container" id="?">      
        <div class="image-container">
        <img src="${data.photo}">
        </div>
        <div class="rewards-title">
        <small class="rewards-code">${data.id}</small><br>
        <h2>${data.title}</h2>
        </div>
        <div class="rewards-info">
        <p>${data.description}</p>
        </div>
        <div class="cost">
        ${data.cost} points
        <button class="redeem-points">Reedeem</button>
        </div>
        </div>`

        $("#rewards").append(cardTag)
    })
}

function makeRequest() {
    $.ajax({
        url: "http://localhost:3000/requestAllRewards",
        type: "GET",
        success: processRewards
    })
}

function setup() {
    makeRequest();
    // loadRewards();    
}

$(document).ready(setup)