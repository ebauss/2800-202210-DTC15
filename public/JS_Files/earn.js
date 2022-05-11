// Mock Data
current = 100

// goal -= current
goal = 0

function createChart(current_points, goal_points) {
    new Chart("doughnut-rewards-chart", {
        type: "doughnut",
        data: {
            labels: ["Your Current Points", "Goal Points"],
            datasets: [{
                backgroundColor: ["#228B22", "#DCDCDC"],
                data: [current_points, goal_points]
            }]
        },
        options: {
            title: {
                display: true,
                text: "My Current Points"
            }
        }
    })
}


function currentMonth(){
    const month = new Date().toLocaleString("default", {
        month: "long"})

        document.getElementById("display-month").innerHTML = month
}

function setup(){
    currentMonth()
    createChart(current, goal)
}

$(document).ready(setup)