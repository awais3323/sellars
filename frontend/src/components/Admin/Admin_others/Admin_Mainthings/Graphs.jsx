import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const Graphs = React.memo((props) => {
  let months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
  
  return (
    <>
      <Line
        className="Line"
        data={{
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
          ],
          datasets: [
            {
              label: `2 Months before (${props.date <=2 ? months[12-1] :months[(props.date[1])-3]} ${props.date[2]})`,
              data: props.data3,
              fill: false,
              backgroundColor: "rgba(111, 237, 214, 0.16)",
              borderColor: "#6FEDD6",
              pointRadius: 3,
              pointHoverRadius: 1,
            },
            {
              label: `1 Month before (${props.date <=1 ? months[12] :months[(props.date[1])-2]} ${props.date[2]})`,
              data: props.data2,
              fill: false,
              backgroundColor: "rgba(214, 28, 78, 0.16)",
              borderColor: "#D61C4E",
              pointRadius: 3,
              pointHoverRadius: 1,
            },
            {
              label:`Last Month (${months[(props.date[1])-1]} ${props.date[2]})`,
              data: props.data1,
              fill: true,
              backgroundColor: "rgba(255, 140, 50, 0.1)",
              borderColor: "#FF8C32",
              pointRadius: 3,
              pointHoverRadius: 1,
              color: "red",
              tension: 0.1,
            },
          ],
        }}
        options={{
          responsive: true,
          elements: {
            hoverRadius: 5,
            hoverBorderWidth: 10,
          },
          scales: {
            y: {
              ticks: {
                color: "#ff8c32",
                beginAtZero: true,
                font: {
                  size: 16,
                  family: "poppins",
                },
              },
            },
            x: {
              ticks: {
                color: "#ff8c32",
                beginAtZero: true,
                font: {
                  size: 16,
                  family: "poppins",
                },
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                // This more specific font property overrides the global property
                color: "#ff8c32",
                font: {
                  size: 16,
                },
                // color:"blue"
              },
            },
          },
        }}
      />
    </>
  );
});
export default Graphs;
