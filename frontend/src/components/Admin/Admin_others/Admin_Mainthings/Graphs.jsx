import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const Graphs = React.memo((props) => {
    // console.log(props.data1)
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
              label: "Month Before Last Mon",
              data: props.data3,
              fill: false,
              backgroundColor: "rgba(111, 237, 214, 0.16)",
              borderColor: "#6FEDD6",
              pointRadius: 3,
              pointHoverRadius: 1,
            },
            {
              label: "Last Mon",
              data: props.data2,
              fill: false,
              backgroundColor: "rgba(214, 28, 78, 0.16)",
              borderColor: "#D61C4E",
              pointRadius: 3,
              pointHoverRadius: 1,
            },
            {
              label: "This Mon",
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
