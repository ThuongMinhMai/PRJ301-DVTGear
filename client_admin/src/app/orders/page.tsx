import { OrderList, SearchOrders } from "@/components";
import getOrders from "@/services/getOrders";
import React from "react";

type SearchParams = {
  searchQuery?: string;
};

type Props = {
  searchParams: SearchParams;
};

export default async function OrdersPage({ searchParams }: Props) {
  const firstOrders = await getOrders(searchParams?.searchQuery || "");

  return (
    <div className="flex flex-col">
      <div className="flex justify-between flex-col sm:flex-row sm:items-center mb-6 gap-6">
        <div className="font-medium text-3xl">Orders</div>

        <SearchOrders />
      </div>

      {/* fetch some orders at server and do infinity scrolling at client */}
      <OrderList firstOrders={firstOrders} />
    </div>
  );
}
