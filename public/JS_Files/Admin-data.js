function showTable() {
    $("#main-table").empty()
    if ($(window).width() <= 1100) {
        $("#main-table").load("./Admin-Skeleton/mobile-page.html")
    } else {
        $("#main-table").load("./Admin-Skeleton/web-page.html")
    }
}

$("button").on("click", (event) => {
    document.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("activated-button")
    })
    event.target.classList.add("activated-button")

    key = event.target.id.split("-")[0]

    document.querySelectorAll(".content-table").forEach(table => {
        if (table.id.split("-")[0] == key) {
            document.getElementById(table.id).style.display = "table"
        } else {
            document.getElementById(table.id).style.display = "none"
        }
    })
})

$(window).resize(() => {
    showTable()
})

function setup() {
    showTable()
}

$(document).ready(setup)