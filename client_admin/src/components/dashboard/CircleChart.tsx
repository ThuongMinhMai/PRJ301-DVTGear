"use client";
import React from "react";
import {Doughnut} from "react-chartjs-2";

interface CircleChartProps {
  totalProducts: number[];
  items: string[];
  title: string;
}

const CircleChart = ({totalProducts, items, title}: CircleChartProps) => {
  // Define the color you want for the text labels
  const labelColor = "#C2D0EA";

  // Define the Chart.js data object
  const chartData = {
    labels: items,
    datasets: [
      {
        data: totalProducts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#33FF99",
          "#CC66FF",
          "#FF8C1A",
          "#1A8CFF",
          "#FF1A8C",
          "#FF99CC",
          "#99CCFF",
          "#FFFF99",
          "#99FF99",
          "#9966CC",
          "#FF9933",
          "#3399FF",
        ], // You can customize the colors here
      },
    ],
  };

  // Define the Chart.js options object
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: labelColor,
        },
      },
      title: {
        display: true,
        text: title,
        color: labelColor,
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
};

export default CircleChart;
