/*
    Demonstrate how to create a line chart
*/

async function getData(){
    const response = await fetch("data/avg-change-angle.csv")
    const data = await response.text() // CSV is in text format
    console.log(data)

    const xTime = []        // x-axis labels = time interval values
    const yControl = []     // y-axis control angles
    const y250mg = []       // y-axis 250 mg angles
    const y500mg = []       // y-axis 500 mg angles
    // split("\n") will separate table into an array of indiv. rows
    // slice(start, end) - return a new array starting at index start up to but not including index end
    const table = data.split("\n").slice(1)
    console.log(table)

    table.forEach(row => {
        const columns = row.split(",")
        const time = columns[0]
        xTime.push(time)

        const control = parseFloat(columns[1])
        yControl.push(control)

        const mg250 = parseFloat(columns[2])
        y250mg.push(mg250)
        const mg500 = parseFloat(columns[3])
        y500mg.push(mg500)
    })
    //console.log(xTime + "\n\n" + yControl + "\n\n" + y250mg + "\n\n" + y500mg)
    return {xTime, yControl, y250mg, y500mg}
}

async function createChart(){
    const data = await getData() // Create chart will wait until getData() is finished
    const ctx = document.getElementById("myChart")
    const degSys = String.fromCharCode(176)

    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.xTime,
            datasets: [
                {
                    label: `Average Change in Angle for the Control (0mg) Group in ${degSys}`,
                    data: data.yControl,
                    fill: false,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 0.5)",
                    borderWidth: 1,
                },
                {
                    label: `Average Change in Angle for the 250mg Group in ${degSys}`,
                    data: data.y250mg,
                    fill: false,
                    backgroundColor: "rgba(0, 102, 255, 0.2)",
                    borderColor: "rgba(0, 102, 255, 0.5)",
                    borderWidth: 1,
                },
                {
                    label: `Average Change in Angle for the 500mg Group in ${degSys}`,
                    data: data.y500mg,
                    fill: false,
                    backgroundColor: "rgba(0, 153, 51, 0.2)",
                    borderColor: "rgba(0, 153, 51, 0.5)",
                    borderWidth: 1,
                },
            ]
        },
        options: {
            responsive: true, // resize based on screen size
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Time (Minutes)", // x-axis title
                        font: {
                            size: 20,
                        },
                    },
                    ticks: {
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: `Average Change in Angle (${degSys})`, // x-axis title
                        font: {
                            size: 20,
                        },
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: { // Display options
                title: {
                    display: true,
                    text: "Average Change in Angle Over Time Between Control Group, 250mg Group, and 500mg Group in a One Hour Period",
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 30,
                        bottom: 30,
                    }
                },
                legend: {
                    align: "start",
                    position: "bottom",
                }
            }
        },
    })
}
createChart()