/*
    Demonstrate how to create a line chart
*/

async function getData(){
    const response = await fetch("../data/avgChangeAngle.csv")
    const data = await response.text() // CSV is in text format
    console.log(data)

    const xYears = []       // x-axis labels = years values
    const yTemps = []       // y-axis global temp values
    const yNHTemps = []     // y-axis NH temp values
    const ySHTemps = []     // y-axis SH temp values
    // split("\n") will separate table into an array of indiv. rows
    // slice(start, end) - return a new array starting at index start up to but not including index end
    const table = data.split("\n").slice(1)
    console.log(table)

    table.forEach(row => {
        const columns = row.split(",")  // split each row on the commas (give series of values from that row)
        const year = columns[0]         // assign that year value to the var
        xYears.push(year)               // push the year values to year array

        const temp = parseFloat(columns[1])
        yTemps.push(temp + 14)          // push temp values + 14 to store temp values (14 is to shift the values up to be visible)

        const nhTemp = parseFloat(columns[2])
        yNHTemps.push(nhTemp + 14)
        const shTemp = parseFloat(columns[3])
        ySHTemps.push(shTemp + 14)

        /* console.log(year, temp, nhTemp, shTemp) */
    })
    return{xYears, yTemps, yNHTemps, ySHTemps}
}

async function createChart(){
    const data = await getData() // Create chart will wait until getData() is finished
    const ctx = document.getElementById("myChart")
    const degSys = String.fromCharCode(176)

    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data.xYears,
            datasets: [
                {
                    label: `Combined Global Land-Surface Air and Sea-Surface water Temperature in ${degSys}C`,
                    data: data.yTemps,
                    fill: false,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 0.5)",
                    borderWidth: 1,
                },
                {
                    label: `Combined N.H. Land-Surface Air and Sea-Surface water Temperature in ${degSys}C`,
                    data: data.yNHTemps,
                    fill: false,
                    backgroundColor: "rgba(0, 102, 255, 0.2)",
                    borderColor: "rgba(0, 102, 255, 0.5)",
                    borderWidth: 1,
                },
                {
                    label: `Combined S.H. Land-Surface Air and Sea-Surface water Temperature in ${degSys}C`,
                    data: data.ySHTemps,
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
                        text: "Year", // x-axis title
                        font: {
                            size: 20,
                        },
                    },
                    ticks: {
                        callback: function(val, index){
                            // labeling of tick marks can be controlled by code
                            return index % 5 === 0 ? this.getLabelForValue(val) : ""
                        },
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: `Global Mean Temperatures (${degSys}C)`, // x-axis title
                        font: {
                            size: 20,
                        },
                    },
                    ticks: {
                        maxTicksLimit: data.yTemps.length/10,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: { // Display options
                title: {
                    display: true,
                    text: "Global Mean Temperature vs. Year (since 1880)",
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