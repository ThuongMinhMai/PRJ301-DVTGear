"use client";

import {approveOrder} from "@/app/_actions/orders";
import {Scroll} from "@/components";
import {useAlertStore} from "@/store";
import statusToColor from "@/utils/statusColor";
import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function page({params: {id}}: Props) {
  const [order, setOrder] = useState<Order>();

  const fetchOrderDetail = async () => {
    const {data} = await axios.get(
      `http://localhost:8080/store/api/orders?orderId=${id}`
    );
    setOrder(data.order);
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  const handleApproveOrder = async (id: number) => {
    const {isSuccess, message} = await approveOrder(id);
    useAlertStore.getState().setShowAlert({
      status: true,
      type: isSuccess ? "success" : "failure",
      message: message,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between mb-6 sm:flex-row sm:items-center">
        <div className="text-3xl font-medium">Orders</div>
        <div className="flex gap-3">
          {order?.status === "PROCESSING" && (
            <button
              onClick={() => {
                handleApproveOrder(order.id!);
              }}
              type="submit"
              className="text-center text-white btn btn-primary"
            >
              <Image
                width={24}
                height={24}
                alt="shipping"
                src="/shipping.svg"
                className="filter invert"
              />
              Approve Order
            </button>
          )}
          <Link href="/orders" className="text-white btn btn-primary">
            <Image
              width={24}
              height={24}
              alt="back"
              src="/arrow-back.svg"
              className="filter invert"
            />
            <div className="ml-2">Back</div>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2 text-2xl font-medium">
        <div>
          Order ID: <span className="text-primary">#{id}</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="grid grid-flow-col grid-cols-2 col-span-9 grid-rows-3 gap-4 p-6 rounded-md bg-black-2">
          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Customer</div>
            <div>{order?.customer}</div>
          </div>
          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Receiver</div>
            <div>{order?.receiver}</div>
          </div>
          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Phone</div>
            <div>{order?.phone}</div>
          </div>
          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Date</div>
            <div>{order?.date}</div>
          </div>
          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Address</div>
            <div>{order?.address}</div>
          </div>

          <div className="flex flex-col row-span-1">
            <div className="mb-2 font-semibold text-primary">Status</div>
            <div
              className={clsx(
                "badge badge-lg text-lg font-medium text-white",
                statusToColor[order?.status as Status]
              )}
            >
              {order?.status}
            </div>
          </div>
        </div>

        <div className="flex flex-col col-span-3 p-6 rounded-md bg-black-2">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">Price</div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">Sub Total:</div>
              <div className="col-span-1">
                đ{Number(order?.totalMoney).toLocaleString()}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">Shipping:</div>
              <div className="col-span-1">Free</div>
            </div>
            <div className="grid grid-cols-2 gap-2 font-semibold text-primary">
              <div className="col-span-1">Total:</div>
              <div className="col-span-1">
                đ{Number(order?.totalMoney).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 mb-2 text-2xl font-medium">
        Order Items
      </div>
      <Scroll>
        <table className="min-w-full pb-24 border-separate border-spacing-y-3 whitespace-nowrap">
          <thead>
            <tr className="text-xs font-medium uppercase">
              <th className="pl-6 pr-4">NO.</th>
              <th className="px-4">Photo</th>
              <th className="px-4">Name</th>
              <th className="px-4">Quantity</th>
              <th className="px-4">Price</th>
            </tr>
          </thead>
          <tbody className="bg-black-2">
            {order?.orderProducts.map((orderProduct, index) => {
              return (
                <tr
                  key={orderProduct?.product?.id}
                  className="px-6 py-4 mb-2 bg-black-2 rounded-xl"
                >
                  <td className="pl-6 pr-4 font-bold text-primary rounded-l-xl">
                    {"#"}
                    {index + 1}
                  </td>
                  <td className="px-4">
                    <div className="relative w-10 h-10 overflow-hidden bg-white rounded-lg">
                      <Image
                        fill
                        alt="product"
                        src={JSON.parse(orderProduct?.product?.images)[0]}
                      />
                    </div>
                  </td>
                  <td className="px-4">{orderProduct.product.name}</td>
                  <td className="px-4">{orderProduct.quantity}</td>
                  <td className="px-4">
                    đ{Number(orderProduct.price).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Scroll>
    </div>
  );
}
