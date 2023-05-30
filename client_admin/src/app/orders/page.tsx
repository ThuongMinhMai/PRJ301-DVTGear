"use client";

import { Loader, Scroll } from "@/components";
import { DeleteIcon, MoreHorizIcon } from "@/contexts/icons";
import formattedDate from "@/utils/formattedDate";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

type Props = {};

export default function OrdersPage({}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between flex-col sm:flex-row sm:items-center mb-6">
        <div className="font-medium text-3xl">Orders</div>
      </div>

      <OrderList />
    </div>
  );
}

const statusToColor: Record<Status, string> = {
  Complete: "badge-success",
  Processing: "badge-warning",
  Cancelled: "badge-error",
};

const OrderList = () => {
  const [orderList, setOrderList] = useState<Order[]>([
    {
      id: 1,
      name: "King Chen",
      date: new Date(),
      total: 69.96,
      status: "Complete",
    },
    {
      id: 2,
      name: "King Chen",
      date: new Date(),
      total: 69.96,
      status: "Processing",
    },
    {
      id: 3,
      name: "King Chen",
      date: new Date(),
      total: 69.96,
      status: "Cancelled",
    },
    {
      id: 4,
      name: "King Chen",
      date: new Date(),
      total: 69.96,
      status: "Processing",
    },
  ]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     const { data } = await axios.get("http://localhost:8080/api/orders");
  //     setOrderList(data.orders);
  //     setIsLoading(false);
  //   };
  //   fetchOrders();
  // }, []);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <Scroll>
      <table className="min-w-full border-spacing-y-3 border-separate">
        <thead>
          <tr className="font-medium text-xs uppercase">
            <th className="pl-6 pr-4">ID</th>
            <th className="px-4">Name</th>
            <th className="px-4">DATE</th>
            <th className="px-4">TOTAL</th>
            <th className="px-4">STATUS</th>
            <th className="text-end pr-8 pl-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order, index) => {
            return (
              <tr
                key={order.id}
                className="bg-dvt-item py-4 px-6 rounded-xl mb-2"
              >
                <td className="text-primary pl-6 pr-4 rounded-l-xl font-bold">
                  {"#"}
                  {index + 1}
                </td>
                <td className="px-4">{order.name}</td>
                <td className="px-4">{formattedDate(order.date)}</td>
                <td className="px-4">đ{order.total.toFixed(3)}</td>
                <td className="px-4">
                  <div
                    className={clsx(
                      "badge badge-lg text-lg font-medium text-white",
                      statusToColor[order.status]
                    )}
                  >
                    {order.status}
                  </div>
                </td>
                <td className="text-end pr-6 pl-4 rounded-r-xl text-white">
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-primary m-1 text-white">
                      <MoreHorizIcon />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52"
                    >
                      <li>
                        <a>
                          <DeleteIcon />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Scroll>
  );
};
