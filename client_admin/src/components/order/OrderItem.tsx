"use client";

import statusToColor from "@/utils/statusColor";
import clsx from "clsx";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React from "react";
import ApproveButton from "./ApproveButton";

type Props = {
  order: Order;
};

export default function OrderItem({order}: Props) {
  const router = useRouter();

  return (
    <tr key={order.id} className="px-6 py-4 mb-2 bg-black-2 rounded-xl">
      <td className="pl-6 pr-4 font-bold rounded-l-xl">
        {"#"}
        {order.id}
      </td>
      <td className="px-4">{order.customer}</td>
      <td className="px-4">{order.receiver}</td>
      <td className="px-4">{order.phone}</td>
      <td className="px-4">{order.date}</td>
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
          <label tabIndex={0} className="m-1 text-white btn btn-primary">
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
            <li>
              <ApproveButton
                className="justify-start overflow-hidden font-normal normal-case border-none outline-none hover:bg-primary"
                orderId={order.id!}
              />
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}
