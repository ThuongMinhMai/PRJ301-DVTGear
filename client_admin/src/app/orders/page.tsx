"use client";

import { Loader, Scroll } from "@/components";
import { DeleteIcon, MoreHorizIcon, ShippingIcon } from "@/contexts/icons";
import formattedDate from "@/utils/formattedDate";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
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
  COMPLETE: "badge-success",
  PROCESSING: "badge-warning",
  DELIVERING: "badge-info",
  CANCELLED: "badge-error",
};

const OrderList = () => {
  const [orderList, setOrderList] = useState<Order[]>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    const { data } = await axios.get("http://localhost:8080/store/api/orders");
    console.log(data.orders);
    setOrderList(data.orders);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleApproveOrder = async (id: number) => {
    await axios.put("http://localhost:8080/store/api/orders", {
      orderId: id,
    });
    alert("");
    fetchOrders();
  };

  return (
    <Scroll>
      <table className="min-w-full border-spacing-y-3 border-separate pb-24">
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
          {orderList?.map((order, index) => {
            return (
              <tr
                key={order.id}
                className="bg-dvt-item py-4 px-6 rounded-xl mb-2"
              >
                <td className="text-primary pl-6 pr-4 rounded-l-xl font-bold">
                  {"#"}
                  {index + 1}
                </td>
                <td className="px-4">{order.username}</td>
                <td className="px-4">{order.date}</td>
                <td className="px-4">đ{order.totalMoney.toLocaleString()}</td>
                <td className="px-4">
                  <div
                    className={clsx(
                      "badge badge-lg text-lg font-medium text-white",
                      statusToColor[order.status as Status]
                    )}
                  >
                    {order.status}
                  </div>
                </td>
                <td className="text-end pr-6 pl-4 rounded-r-xl text-white">
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-primary m-1 text-white"
                    >
                      <MoreHorizIcon />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52"
                    >
                      {order.status === "PROCESSING" && (
                        <li
                          onClick={() => {
                            handleApproveOrder(order.id!);
                          }}
                        >
                          <a>
                            <ShippingIcon />
                            Approve Order
                          </a>
                        </li>
                      )}
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
