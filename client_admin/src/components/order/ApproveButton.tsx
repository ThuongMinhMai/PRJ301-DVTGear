"use client";

import {approveOrder} from "@/app/_actions/orders";
import {useAlertStore} from "@/store";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

type Props = {orderId: number; className?: string};

export default function ApproveButton({orderId, className}: Props) {
  const handleApproveOrder = async (id: number) => {
    const {isSuccess, message} = await approveOrder(id);
    if (isSuccess) {
    }
    useAlertStore.getState().setShowAlert({
      status: true,
      type: isSuccess ? "success" : "failure",
      message: message,
    });
  };

  return (
    <button
      onClick={() => {
        handleApproveOrder(orderId);
      }}
      type="submit"
      className={clsx("text-center text-white btn btn-primary", className)}
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
  );
}
