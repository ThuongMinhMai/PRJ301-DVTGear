"use client";

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
                backgroundColor: ["rgba(234, 28, 0, 0.1)"],
                borderColor: ["#ea1c00"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                ticks: {
                  color: "#ea1c00",
                },
              },
              y: {
                ticks: {
                  color: "#ea1c00",
                },
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
