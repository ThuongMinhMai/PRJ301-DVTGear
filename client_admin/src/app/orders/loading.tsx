import {SearchOrders, Skeleton} from "@/components";
import React from "react";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between gap-6 mb-6 sm:flex-row sm:items-center">
        <div className="text-3xl font-medium">Orders</div>

        <SearchOrders disable />
      </div>

      <div className="min-w-full">
        <div className="flex items-center justify-between mb-3 text-xs font-medium uppercase">
          <div className="pl-6 pr-4">ID</div>
          <div className="px-4">Customer</div>
          <div className="px-4">Receiver</div>
          <div className="px-4">Phone</div>
          <div className="px-4">TOTAL</div>
          <div className="px-4">STATUS</div>
          <div className="pl-4 pr-8 text-end">Actions</div>
        </div>

        <div className="flex flex-col">
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
