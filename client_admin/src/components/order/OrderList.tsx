"use client";

import axios from "axios";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Loader, Scroll} from "..";
import clsx from "clsx";
import statusToColor from "@/utils/statusColor";
import Image from "next/image";
import _ from "lodash"; // Import Lodash library

type Props = {
  firstOrders: Order[];
};

const OrderList = ({firstOrders}: Props) => {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(2);
  const [totalOrders, setTotalOrders] = useState(0);
  const router = useRouter();
  const searchQuery = useSearchParams()?.get("searchQuery");
  const searchType = useSearchParams()?.get("searchType");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/store/api/orders?page=${pageNum}&pageSize=10&searchQuery=${
          searchQuery || ""
        }&searchType=${searchType || ""}`
      )
      .then((res) => res.data)
      .then((data) => {
        const mergedOrders = [...orderList, ...data.orders];
        const uniqueOrders = _.uniqWith(mergedOrders, _.isEqual); // Use uniqWith() from Lodash
        setOrderList(uniqueOrders);
        setTotalOrders(data.totalCount);
        setIsLoading(false);
      });
  }, [pageNum]);

  useEffect(() => {
    setOrderList([]);
    setPageNum(2);
  }, [searchQuery]);

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
        <table className="w-full border-separate border-spacing-y-3 pb-36">
          <thead>
            <tr className="text-xs font-medium uppercase">
              <th className="pl-6 pr-4">ID</th>
              <th className="px-4">Customer</th>
              <th className="px-4">Receiver</th>
              <th className="px-4">Phone</th>
              <th className="px-4">TOTAL</th>
              <th className="px-4">STATUS</th>
              <th className="pl-4 pr-8 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...firstOrders, ...orderList]?.map((order) => {
              return (
                <tr
                  key={order.id}
                  className="px-6 py-4 mb-2 bg-black-2 rounded-xl"
                >
                  <td className="pl-6 pr-4 font-bold rounded-l-xl">
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
                        "badge badge-lg font-medium text-white",
                        statusToColor[order.status as Status]
                      )}
                    >
                      {order.status}
                    </div>
                  </td>
                  <td className="pl-4 pr-6 text-white text-end rounded-r-xl">
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="m-1 text-white btn btn-primary"
                      >
                        <Image
                          width={24}
                          height={24}
                          alt="more"
                          src="/more.svg"
                          className="filter invert"
                        />
                      </label>
                      <ul
                        tabIndex={0}
                        className="p-2 shadow dropdown-content menu bg-primary rounded-box w-52"
                      >
                        <li
                          onClick={() => {
                            router.push(`/orders/${order.id}`);
                          }}
                        >
                          <a>
                            <Image
                              width={24}
                              height={24}
                              alt="detail"
                              src="/detail.svg"
                              className="filter invert"
                            />
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
export default OrderList;
