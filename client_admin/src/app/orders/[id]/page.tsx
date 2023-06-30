"use client";

import { Scroll } from "@/components";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { ArrowBackIcon, ShippingIcon } from "@/contexts/icons";
import statusToColor from "@/utils/statusColor";
import { AlertType } from "@/utils/types";
import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

type Props = {};

export default function page({}: Props) {
  const { id } = useParams();
  const [order, setOrder] = useState<Order>();
  const router = useRouter();
  // const { setShowAlert } = useGlobalContext();

  const fetchOrderDetail = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:8080/store/api/orders?orderId=${id}`
    );
    console.log(setOrder(data.order));
  }, []);

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  const handleApproveOrder = async (id: number) => {
    const { data } = await axios.put("http://localhost:8080/store/api/orders", {
      orderId: id,
    });
    // setShowAlert({
    //   status: true,
    //   type: data.isSuccess ? AlertType.success : AlertType.failure,
    //   message: data.message,
    // });
    fetchOrderDetail();
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between flex-col sm:flex-row sm:items-center mb-6">
        <div className="font-medium text-3xl">Orders</div>
        <div className="flex gap-3">
          {order?.status === "PROCESSING" && (
            <div
              className="text-white btn btn-primary text-center"
              onClick={() => {
                handleApproveOrder(order.id!);
              }}
            >
              <ShippingIcon />
              Approve Order
            </div>
          )}
          <Link href="/orders" className="btn btn-primary text-white">
            <ArrowBackIcon />
            <div className="ml-2">Back</div>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between text-2xl mb-2 font-medium">
        <div>
          Order ID: <span className="text-primary">#{id}</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9 grid grid-rows-3 grid-cols-2 grid-flow-col gap-4 bg-dvt-item rounded-md p-6">
          <div className="flex flex-col row-span-1">
            <div className="font-semibold mb-2 text-primary">Customer</div>
            <div>{order?.customer}</div>
          </div>
          <div className="flex flex-col row-span-1">
            <div className="font-semibold mb-2 text-primary">Receiver</div>
            <div>{order?.receiver}</div>
          </div>
          <div className="flex flex-col row-span-1">
            <div className="font-semibold mb-2 text-primary">Phone</div>
            <div>{order?.phone}</div>
          </div>
          <div className="flex flex-col row-span-1">
            <div className="font-semibold mb-2 text-primary">Date</div>
            <div>{order?.date}</div>
          </div>
          <div className="flex flex-col row-span-1">
            <div className="font-semibold mb-2 text-primary">Address</div>
            <div>{order?.address}</div>
          </div>

          <div className="flex flex-col row-span-1">
            <div className="font-semibold mb-2 text-primary">Status</div>
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

        <div className="flex flex-col p-6 bg-dvt-item rounded-md col-span-3">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-xl">Price</div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <div className="grid gap-2 grid-cols-2">
              <div className="col-span-1">Sub Total:</div>
              <div className="col-span-1">
                đ{Number(order?.totalMoney).toLocaleString()}
              </div>
            </div>
            <div className="grid gap-2 grid-cols-2">
              <div className="col-span-1">Shipping:</div>
              <div className="col-span-1">Free</div>
            </div>
            <div className="grid gap-2 grid-cols-2 font-semibold text-primary">
              <div className="col-span-1">Total:</div>
              <div className="col-span-1">
                đ{Number(order?.totalMoney).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-2xl mb-2 font-medium mt-6">
        Order Items
      </div>
      <Scroll>
        <table className="min-w-full border-spacing-y-3 border-separate whitespace-nowrap pb-24">
          <thead>
            <tr className="font-medium text-xs uppercase">
              <th className="pl-6 pr-4">NO.</th>
              <th className="px-4">Photo</th>
              <th className="px-4">Name</th>
              <th className="px-4">Quantity</th>
              <th className="px-4">Price</th>
            </tr>
          </thead>
          <tbody className="bg-dvt-item">
            {order?.orderProducts.map((orderProduct, index) => {
              return (
                <tr
                  key={orderProduct?.product?.id}
                  className="bg-dvt-item py-4 px-6 rounded-xl mb-2"
                >
                  <td className="text-primary pl-6 pr-4 rounded-l-xl font-bold">
                    {"#"}
                    {index + 1}
                  </td>
                  <td className="px-4">
                    <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden">
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
