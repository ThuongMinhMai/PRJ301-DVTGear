"use client";

import { Loader, Scroll } from "@/components";
import { DetailsIcon, MoreHorizIcon } from "@/contexts/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import statusToColor from "@/utils/statusColor";

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

const OrderList = () => {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/store/api/orders?page=${pageNum}&pageSize=20`)
      .then((res) => res.data)
      .then((data) => {
        setOrderList((prev) => [...prev, ...data.orders]);
        setTotalOrders(data.totalCount);
        setIsLoading(false);
      });
  }, [pageNum]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPageNum((prev) => prev + 1);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (pageNum * 20 >= Number(totalOrders) && totalOrders > 0) {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageNum]);

  return (
    <>
      <Scroll>
        <table className="border-spacing-y-3 border-separate pb-36 w-full">
          <thead>
            <tr className="font-medium text-xs uppercase">
              <th className="pl-6 pr-4">ID</th>
              <th className="px-4">Customer</th>
              <th className="px-4">Receiver</th>
              <th className="px-4">Phone</th>
              <th className="px-4">TOTAL</th>
              <th className="px-4">STATUS</th>
              <th className="text-end pr-8 pl-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList?.map((order) => {
              return (
                <tr
                  key={order.id}
                  className="bg-dvt-item py-4 px-6 rounded-xl mb-2"
                >
                  <td className="text-primary pl-6 pr-4 rounded-l-xl font-bold">
                    {"#"}
                    {order.id}
                  </td>
                  <td className="px-4">{order.customer}</td>
                  <td className="px-4">{order.receiver}</td>
                  <td className="px-4">{order.phone}</td>
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
                        <li
                          onClick={() => {
                            router.push(`/orders/${order.id}`);
                          }}
                        >
                          <a>
                            <DetailsIcon />
                            Detail
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
      {isLoading && <Loader />}
    </>
  );
};
