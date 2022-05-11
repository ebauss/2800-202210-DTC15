rewards = [
    {
        id: "rewards number 0001",
        title:"Get this Discount Reward Title",
        author: "sponsor for this discount goes here",
        photo: 'https://picsum.photos/200/200',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed sagittis enim, sit amet pretium neque. Sed in tempus ante. Suspendisse quis sem vitae urna interdum consequat vel vitae nibh.",
        cost: 50
    },
    {
        id: "rewards number 0002",
        title:"Another Discount Reward Title",
        author: "sponsor for this discount goes here too",
        photo: 'https://picsum.photos/200/200',
        description:
        "Maecenas vel diam et erat gravida vulputate ut eget arcu. Pellentesque ultricies convallis tincidunt. Vivamus et accumsan dui, eu dignissim ex. Suspendisse eu sem tristique, sagittis ligula nec, sollicitudin dui.",
        cost: 100
    },
    {
        id: "rewards number 0003",
        title:"Again Discount Reward Title",
        author: "sponsor for this discount goes here as well",
        photo: 'https://picsum.photos/200/200',
        description:
        "Maecenas vel diam et erat gravida vulputate ut eget arcu. Pellentesque ultricies convallis tincidunt. Vivamus et accumsan dui, eu dignissim ex. Suspendisse eu sem tristique, sagittis ligula nec, sollicitudin dui.",
        cost: 1500
    }
    

]



cardTag = ""

function LoadRewards() { 
    // console.log("I am Rewards")
    for (i = 0; i < 12; i++){
        // console.log(rewards)
        
        //for id = "place category " 
        //img is from database link
        // cost is out points, 

        cardTag =
        `<br>
        <a href="http://localhost:3000/main.html/${rewards[0].id}">
        <div class="rewards-container" id="?">
        <div class="image-container">
        <img src="https://picsum.photos/200/200">
        </div>
        <div class="rewards-title">
        <h2>${rewards[0].title}</h2>
        </div>
        <div class="rewards-info">
        <p>${rewards[0].description}</p>
        </div>
        <div class="cost">
        ${rewards[0].cost} points
        </div>
        </div>
        </a>`
        
    }

    $("#rewards").append(cardTag)

}

function setup() {
    LoadRewards();
}

$(document).ready(setup)