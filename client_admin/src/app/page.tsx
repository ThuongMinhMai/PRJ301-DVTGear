import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="mb-4 font-medium text-3xl">Orders</div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">TODAY</div>
          <div className="md:text-4xl text-primary font-bold my-2 text-xl">2</div>
          <div className="md:text-xl text-sm">2 orders today</div>
        </div>

        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">THIS WEEK</div>
          <div className="md:text-4xl text-primary font-bold my-2 text-xl">25</div>
          <div className="md:text-xl text-sm">25 orders this weak</div>
        </div>

        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">THIS MONTH</div>
          <div className="md:text-4xl text-primary font-bold my-2 text-xl">32</div>
          <div className="md:text-xl text-sm">32 orders this month</div>
        </div>
      </div>

      <div className="mb-4 font-medium text-3xl">Revenue</div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">TODAY</div>
          <div className="md:text-4xl text-primary font-bold my-2 text-xl">$ 85765</div>
          <div className="md:text-xl text-sm">$ 85765 today</div>
        </div>

        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">THIS WEEK</div>
          <div className="md:text-4xl text-primary font-bold my-2 text-xl">$ 226600</div>
          <div className="md:text-xl text-sm">$ 226600 this weak</div>
        </div>

        <div className="flex-1 p-2 bg-dvt-item rounded-lg flex flex-col items-center shadow-xl">
          <div className="md:text-xl font-bold text-base">THIS MONTH</div>
          <div className="md:text-4xl text-primary font-bold my-2 text-xl">$ 230093</div>
          <div className="md:text-xl text-sm">$ 230093 this month</div>
        </div>
      </div>
    </div>
  );
}
