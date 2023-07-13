import {OrderList, SearchOrders} from "@/components";
import React from "react";
import {getOrders} from "../_actions/orders";

type SearchParams = {
  searchQuery?: string;
};

type Props = {
  searchParams: SearchParams;
};

export default async function OrdersPage({searchParams}: Props) {
  const firstOrders = await getOrders(searchParams?.searchQuery || "");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between gap-6 mb-6 sm:flex-row sm:items-center">
        <div className="text-3xl font-medium">Orders</div>

        <SearchOrders />
      </div>

      {/* fetch some orders at server and do infinity scrolling at client */}
      <OrderList firstOrders={firstOrders} />
    </div>
  );
}




