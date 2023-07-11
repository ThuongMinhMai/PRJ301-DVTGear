"use client";

import {LineChart, Loader} from "@/components";
import BarChart from "@/components/BarChart";
import axios from "axios";
import Image from "next/image";
import {useEffect, useState} from "react";

type RevenueDataType = {
  revenueThisWeek: number;
  revenueThisMonth: number;
  revenueThisYear: number;
  totalProductsSoldByCategory: {category: string; totalProducts: number}[];
  totalProductsSoldByBrand: {brand: string; totalProducts: number}[];
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [statisticalData, setRevenueData] = useState<RevenueDataType>();
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
      <div className="mb-4 text-3xl font-medium">Revenue</div>
      <div className="flex flex-col gap-4 mb-8 sm:flex-row">
        <div className="flex flex-col items-center flex-1 p-2 rounded-lg shadow-xl bg-dvt-item">
          <div className="text-base font-bold md:text-xl">WEEK</div>
          <div className="my-2 text-base font-bold md:text-2xl text-primary">
            {statisticalData?.revenueThisWeek.toLocaleString()}VNĐ
          </div>
          <div className="text-xs md:text-base">
            {statisticalData?.revenueThisWeek.toLocaleString()}VNĐ week
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 p-2 rounded-lg shadow-xl bg-dvt-item">
          <div className="text-base font-bold md:text-xl">THIS MONTH</div>
          <div className="my-2 text-base font-bold md:text-2xl text-primary">
            {statisticalData?.revenueThisMonth.toLocaleString()}VNĐ
          </div>
          <div className="text-xs md:text-base">
            {statisticalData?.revenueThisMonth.toLocaleString()}VNĐ this month
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 p-2 rounded-lg shadow-xl bg-dvt-item">
          <div className="text-base font-bold md:text-xl">THIS YEAR</div>
          <div className="my-2 text-base font-bold md:text-2xl text-primary">
            {statisticalData?.revenueThisYear.toLocaleString()}VNĐ
          </div>
          <div className="text-xs md:text-base">
            {" "}
            {statisticalData?.revenueThisYear.toLocaleString()}VNĐ this year
          </div>
        </div>
      </div>

      <div>
        <LineChart />
      </div>

      <div className="mt-8 mb-4 text-3xl font-medium">
        Total Products Sold by Category and Brand
      </div>

      <div className="grid grid-cols-12 gap-6 mt-4">
        <BarChart
          labels={
            statisticalData?.totalProductsSoldByCategory.map(
              (items) => items.category
            ) || []
          }
          data={
            statisticalData?.totalProductsSoldByCategory.map(
              (items) => items.totalProducts
            ) || []
          }
          className="col-span-6"
        />
        <BarChart
          labels={
            statisticalData?.totalProductsSoldByBrand.map(
              (items) => items.brand
            ) || []
          }
          data={
            statisticalData?.totalProductsSoldByBrand.map(
              (items) => items.totalProducts
            ) || []
          }
          className="col-span-6"
        />
      </div>
    </div>
  );
}
