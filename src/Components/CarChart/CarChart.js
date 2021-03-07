import React from "react"
import { Bar as BarChart } from "react-chartjs-2"

export const CarChart = ({ trips }) => {
  // formula copied from https://www.tutorialspoint.com/how-to-count-number-of-occurrences-of-repeated-names-in-an-array-javascript
  const count = Object.values(
    trips.reduce((obj, { car_id }) => {
      if (obj[car_id] === undefined)
        obj[car_id] = { car_id: car_id, occurrences: 1 }
      else obj[car_id].occurrences++
      return obj
    }, {})
  )
  //console.log(count)

  const labels = count.map((a) => a.car_id)
  const data = count.map((a) => a.occurrences)

  const specs = {
    labels,
    datasets: [
      {
        label: "# of trips",
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ],
    options: {
      scales: {
          yAces: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
  }

  return (
    <>
      <BarChart data={specs} width={600} height={350} />
    </>
  )
}

export default CarChart
