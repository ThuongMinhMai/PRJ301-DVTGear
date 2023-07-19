import {LineChart, CircleChart, Scroll} from "@/components";
import {getStatistical} from "./_actions/statistical";
import Image from "next/image";
import {cookies} from "next/headers";

type RevenueDataType = {
  revenueThisWeek: number;
  revenueThisMonth: number;
  revenueThisYear: number;
  totalProductsSoldByCategory: {category: string; totalProducts: number}[];
  totalProductsSoldByBrand: {brand: string; totalProducts: number}[];
  top5BestSellers: Product[];
  numberOfProcessingOrders: number;
  numberOfDeliveringOrders: number;
};

export default async function Home() {
  const statisticalData: RevenueDataType = await getStatistical();
  const adminName = JSON.parse(
    (await cookies().get("current-admin")?.value) || "{}"
  ).name;

  return (
    <div>
      <div className="mb-2 text-3xl font-medium line-clamp-1">
        Welcome back, {adminName}
      </div>
      <div className="mb-8 text-slate-50/50">
        Here's what's happening with your store.
      </div>
      <div className="flex flex-col gap-6 mb-6 sm:flex-row">
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

      <div className="grid grid-cols-12 gap-6">
        <div className="flex flex-col h-full col-span-8 gap-6">
          <div className="p-4 rounded-lg bg-black-2">
            <LineChart />
          </div>

          <BestSeller top5BestSellers={statisticalData?.top5BestSellers} />
        </div>

        <div className="flex flex-col col-span-4 gap-6">
          <div className="p-4 rounded-lg bg-black-2 shrink-0">
            <CircleChart
              title="Sales by category"
              items={statisticalData?.totalProductsSoldByCategory.map(
                (item) => item.category
              )}
              totalProducts={statisticalData?.totalProductsSoldByCategory.map(
                (item) => item.totalProducts
              )}
            />
          </div>
          <div className="p-4 rounded-lg bg-black-2 shrink-0">
            <CircleChart
              title="Sales by brand"
              items={statisticalData?.totalProductsSoldByBrand.map(
                (item) => item.brand
              )}
              totalProducts={statisticalData?.totalProductsSoldByBrand.map(
                (item) => item.totalProducts
              )}
            />
          </div>

          <div className="flex flex-col justify-around flex-1 w-full h-full gap-4 p-4 rounded-lg bg-black-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center p-3 rounded-full bg-warning">
                <Image
                  alt="processing"
                  src="/warning.svg"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <div className="flex flex-col">
                  <div className="text-xl font-semibold">Processing Orders</div>
                  <div className="text-3xl font-bold text-warning">
                    {statisticalData.numberOfProcessingOrders}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center p-3 rounded-full bg-info">
                <Image
                  alt="delivering"
                  src="/shipping.svg"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <div className="flex flex-col">
                  <div className="text-xl font-semibold">Delivering Orders</div>
                  <div className="text-3xl font-bold text-info">
                    {statisticalData.numberOfDeliveringOrders}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type BestSellerProps = {
  top5BestSellers: Product[] | undefined;
};

const BestSeller = ({top5BestSellers}: BestSellerProps) => {
  return (
    <div className="flex flex-col h-full px-4 pt-6 pb-2 rounded-lg bg-black-2">
      <div className="mb-4 text-xl font-semibold">
        Top 5 products best seller
      </div>
      <Scroll>
        <table className="min-w-full border-separate border-spacing-y-3 whitespace-nowrap">
          <thead>
            <tr className="text-xs font-medium uppercase">
              <th className="pl-6 pr-4">ID</th>
              <th className="px-4">Photo</th>
              <th className="px-4">Name</th>
              <th className="px-4">Category</th>
              <th className="px-4">Brand</th>
              <th className="px-4">Price</th>
              <th className="px-4">Storage</th>
            </tr>
          </thead>
          <tbody className="bg-black-2">
            {top5BestSellers?.map((product) => {
              return (
                <tr
                  key={product.id}
                  className="px-6 py-4 mb-2 text-xs rounded-sm bg-black-1"
                >
                  <td className="pl-6 pr-4 font-bold rounded-l-xl">
                    {"#"}
                    {product.id}
                  </td>
                  <td className="px-4">
                    <div className="relative w-10 h-10 overflow-hidden bg-white rounded-lg">
                      <Image
                        fill
                        alt="product"
                        src={JSON.parse(product.images)[0]}
                      />
                    </div>
                  </td>
                  <td className="px-4">{product.name}</td>
                  <td className="px-4">{product.category.name}</td>
                  <td className="px-4">{product.brand.name}</td>
                  <td className="px-4">
                    đ{Number(product.price).toLocaleString()}
                  </td>
                  <td className="px-4 rounded-r-lg">
                    {Number(product.storage).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Scroll>
    </div>
  );
};
