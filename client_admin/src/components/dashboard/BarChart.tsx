'use client'

import {Chart as ChartJS, registerables, ChartItem} from "chart.js";
import React, {useEffect, useRef} from "react";

type Props = {
  labels: string[];
  data: number[];
  className?: string;
};

ChartJS.register(...registerables);

export default function BarChart({className, labels, data}: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let myChart: ChartJS | null = null;

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        myChart = new ChartJS(ctx as ChartItem, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Total Products",
                data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  // Rest of the colors...
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  // Rest of the colors...
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [labels, data]);

  return (
    <div className={className}>
      <canvas ref={chartRef} />
    </div>
  );
}
