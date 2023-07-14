"use client";

import axios from "axios";
import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {Loader} from "@/components";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Chart,
  Tooltip,
} from "chart.js";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Tooltip);

interface DayData {
  timestamp: string;
  revenue: number;
}

export default function LineChart(props: any) {
  const [chartData, setChartData] = useState<DayData[] | null>(null);
  const [days, setDays] = useState<number>(7);

  useEffect(() => {
    async function getChartData() {
      const response = await axios.get(
        `http://localhost:8080/store/api/statistical?historicalChartDays=${days}`
      );
      setChartData(response.data.historicalChart);
    }
    getChartData();
  }, [days]);

  function handleChangeDays(event: React.ChangeEvent<HTMLSelectElement>) {
    setChartData(null);
    const selectedDays = parseInt(event.target.value);
    setDays(selectedDays);
  }

  function getRadius(): number {
    const minRadius = 5;
    const maxRadius = 10;

    const range = maxRadius - minRadius;
    const normalizedDays = Math.max(1, Math.min(365, days)) / 365;

    return maxRadius - normalizedDays * range;
  }

  return (
    <div className="">
      <select
        className="select select-bordered w-full max-w-[200px] bg-black-2 text-white"
        value={days}
        onChange={handleChangeDays}
      >
        <option value={7}>1 Week</option>
        <option value={30}>1 Month</option>
        <option value={90}>3 Months</option>
        <option value={180}>6 Months</option>
        <option value={365}>1 Year</option>
      </select>

      {chartData ? (
        <div>
          <div className="text-xl font-semibold text-center">
            Revenue (Past {days} days) in VNĐ
          </div>
          <Line
            data={{
              labels: chartData?.map((day) => {
                const date = new Date(day?.timestamp);
                return date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: chartData?.map((day) => day?.revenue),
                  borderColor: "#ea1c00",
                  label: "Revenue",
                },
              ],
            }}
            options={{
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
                },
              },
              elements: {
                point: {
                  radius: getRadius(),
                },
              },
              plugins: {
                tooltip: {
                  bodyFont: {size: 16},
                  callbacks: {
                    label: function (context: any) {
                      const label = `${Number(
                        context.parsed.y
                      ).toLocaleString()}VNĐ`;
                      return label;
                    },
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="w-full aspect-[2/1] flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
