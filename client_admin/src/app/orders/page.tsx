import {Pagination, Scroll, SearchOrders, OrderItem} from "@/components";
import React from "react";
import {getOrders} from "../_actions/orders";

type SearchParams = {
  searchQuery?: string;
  searchType?: string;
  page?: number;
};

type Props = {
  searchParams: SearchParams;
};

export default async function OrdersPage({searchParams}: Props) {
  const currentPage = searchParams?.page || 1;
  const searchQuery = searchParams?.searchQuery || "";
  const searchType = searchParams?.searchType || "";
  const pageSize = 10;
  const {orders, itemsCount} = await getOrders(
    searchQuery,
    searchType,
    currentPage,
    pageSize
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between gap-6 mb-6 sm:flex-row sm:items-center">
        <div className="text-3xl font-medium">Orders</div>

        <SearchOrders />
      </div>

      <Scroll>
        <table className="w-full pb-12 border-separate border-spacing-y-3">
          <thead>
            <tr className="text-xs font-medium uppercase">
              <th className="pl-6 pr-4">ID</th>
              <th className="px-4">Customer</th>
              <th className="px-4">Receiver</th>
              <th className="px-4">Phone</th>
              <th className="px-4">DATE</th>
              <th className="px-4">STATUS</th>
              <th className="pl-4 pr-8 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => {
              return <OrderItem order={order} />;
            })}
          </tbody>
        </table>
      </Scroll>

      <Pagination
        path={`/orders?searchQuery=${searchQuery}&searchType=${searchType}`}
        pageSize={pageSize}
        totalItems={itemsCount}
      />
    </div>
  );
}

