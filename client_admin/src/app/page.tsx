import {LineChart, BarChart} from "@/components";
import {getStatistical} from "./_actions/statistical";

type RevenueDataType = {
  revenueThisWeek: number;
  revenueThisMonth: number;
  revenueThisYear: number;
  totalProductsSoldByCategory: {category: string; totalProducts: number}[];
  totalProductsSoldByBrand: {brand: string; totalProducts: number}[];
};

export default async function Home() {
  const statisticalData: RevenueDataType = await getStatistical();

  return (
    <div>
      <div className="mb-4 text-3xl font-medium">Revenue</div>
      <div className="flex flex-col gap-4 mb-8 sm:flex-row">
        <div className="flex flex-col items-center flex-1 p-2 rounded-lg shadow-xl bg-black-2">
          <div className="text-base font-bold md:text-xl">WEEK</div>
          <div className="my-2 text-base font-bold md:text-2xl text-primary">
            {statisticalData?.revenueThisWeek.toLocaleString()}VNĐ
          </div>
          <div className="text-xs md:text-base">
            {statisticalData?.revenueThisWeek.toLocaleString()}VNĐ week
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 p-2 rounded-lg shadow-xl bg-black-2">
          <div className="text-base font-bold md:text-xl">THIS MONTH</div>
          <div className="my-2 text-base font-bold md:text-2xl text-primary">
            {statisticalData?.revenueThisMonth.toLocaleString()}VNĐ
          </div>
          <div className="text-xs md:text-base">
            {statisticalData?.revenueThisMonth.toLocaleString()}VNĐ this month
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 p-2 rounded-lg shadow-xl bg-black-2">
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
