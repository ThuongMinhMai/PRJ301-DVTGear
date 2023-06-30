"use client";

import { LineChart, Loader } from "@/components";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type RevenueDataType = {
  revenueThisWeek: number;
  revenueThisMonth: number;
  revenueThisYear: number;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<RevenueDataType>();
  useEffect(() => {
    async function getChartData() {
      const response = await axios.get(
        "http://localhost:8080/store/api/statistical"
      );
      setRevenueData(response.data);
      setIsLoading(false);
    }
    getChartData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mb-4 font-medium text-3xl">Revenue</div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">WEEK</div>
          <div className="md:text-2xl text-primary font-bold my-2 text-base">
            {revenueData?.revenueThisWeek.toLocaleString()}VNĐ
          </div>
          <div className="md:text-base text-xs">
            {revenueData?.revenueThisWeek.toLocaleString()}VNĐ week
          </div>
        </div>

        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">THIS MONTH</div>
          <div className="md:text-2xl text-primary font-bold my-2 text-base">
            {revenueData?.revenueThisMonth.toLocaleString()}VNĐ
          </div>
          <div className="md:text-base text-xs">
            {revenueData?.revenueThisMonth.toLocaleString()}VNĐ this month
          </div>
        </div>

        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">THIS YEAR</div>
          <div className="md:text-2xl text-primary font-bold my-2 text-base">
            {revenueData?.revenueThisYear.toLocaleString()}VNĐ
          </div>
          <div className="md:text-base text-xs">
            {" "}
            {revenueData?.revenueThisYear.toLocaleString()}VNĐ this year
          </div>
        </div>
      </div>

      <div>
        <LineChart />
      </div>

      <div className="mb-4 font-medium text-3xl">Orders</div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">TODAY</div>
          <div className="md:text-2xl text-primary font-bold my-2 text-base">
            2
          </div>
          <div className="md:text-base text-xs">2 orders today</div>
        </div>

        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">THIS WEEK</div>
          <div className="md:text-2xl text-primary font-bold my-2 text-base">
            25
          </div>
          <div className="md:text-base text-xs">25 orders this weak</div>
        </div>

        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">THIS MONTH</div>
          <div className="md:text-2xl text-primary font-bold my-2 text-base">
            32
          </div>
          <div className="md:text-base text-xs">32 orders this month</div>
        </div>
      </div>
    </div>
  );
}
