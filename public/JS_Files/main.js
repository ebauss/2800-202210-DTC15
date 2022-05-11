news = [
    {
        id: "for the news",
        title:"News Title 1",
        author: 'that guy',
        photo: 'https://picsum.photos/200/300',
        article: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed sagittis enim, sit amet pretium neque. Sed in tempus ante. Suspendisse quis sem vitae urna interdum consequat vel vitae nibh. Maecenas vel diam et erat gravida vulputate ut eget arcu. Pellentesque ultricies convallis tincidunt. Vivamus et accumsan dui, eu dignissim ex. Suspendisse eu sem tristique, sagittis ligula nec, sollicitudin dui. Cras erat est, molestie vel orci eget, efficitur placerat nibh. Cras scelerisque sollicitudin elit, sed fringilla justo elementum vitae. Donec non libero euismod ex eleifend accumsan. Vivamus bibendum nulla sit amet lacus accumsan, sit amet viverra erat lacinia. Integer elementum, velit quis imperdiet consectetur, orci libero consequat odio, sit amet suscipit magna diam at augue. Pellentesque volutpat vulputate risus, id tempor urna dictum ac."
    }

]

game = [
    {
        id: "for the game",
        title:'game Title 2',
        creator: 'the company',
        photo: 'https://picsum.photos/200/300',
        
    }

]

walkthrough = [
    {
        id: "for the tips",
        title:'tips title2',
        author: 'that bick',
        photo: 'https://picsum.photos/200/300',
        article: "Pellentesque blandit id nunc sed pellentesque. Mauris at nibh eros. Integer venenatis porta metus, ut fermentum turpis porttitor vel. Maecenas id mauris ac odio interdum gravida. Phasellus et facilisis erat. Nam ac maximus mauris. Sed feugiat non leo et tincidunt. Donec facilisis lorem odio, sit amet vulputate nulla viverra sed. Suspendisse risus nunc, venenatis a erat quis, interdum accumsan mi. Vivamus pretium ante vel urna tincidunt fermentum vitae a leo. Nam dictum sed quam nec feugiat. Vestibulum at tincidunt dui. Curabitur id tortor varius, commodo enim ac, condimentum mauris. Nunc fermentum pellentesque suscipit. Etiam mattis accumsan orci, eu tempus eros fringilla auctor. Duis leo metus, hendrerit vel nibh eu, bibendum semper lacus."
    }

]

cardTag = ""



function LoadArticles() { 
    // console.log("I am Tips")
    for (i = 0; i < 12; i++){
        cardTag = //for id = "place category " //div href article needs to be <a> tag
        `<div class="Card-Information" id="tips"><a href="http://localhost:3000/main.html/${walkthrough[0].id}"><div class="Card-Title"><h2>${walkthrough[0].title}</h2></div></a></div>`
    }

    $("#walkthroughts").append(cardTag)

}

function LoadGames() { 
    // console.log("I am game")
    for (i = 0; i < 12; i++){
        cardTag = //for id = "place category " //div href article needs to be <a> tag
        `<div class="Card-Information" id="game"><a href="http://localhost:3000/main.html/${game[0].id}"><div class="Card-Title"><h2>${game[0].title}</h2></div></a></div>`
    }

    $("#game").append(cardTag)

}

function LoadNews() { 
    console.log("I am news")
    for (i = 0; i < 12; i++){
        cardTag = //for id = "place category " //div href article needs to be <a> tag
        `<div class="Card-Information" id="tips"><a href="http://localhost:3000/main.html/${news[0].id}"><div class="Card-Title"><h2>${news[0].title}</h2></div></div></div>`
    }

    $("#news").append(cardTag)

}

function setup() {
    LoadArticles();
    LoadGames();
    LoadNews();
}

$(document).ready(setup)