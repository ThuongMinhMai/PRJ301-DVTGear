'use client'

import { useParams } from "next/navigation";
import React from "react";

type Props = {};

export default function page({}: Props) {
  const { id } = useParams();

  const fetchOrderDetail = ()=>{
    
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between flex-col sm:flex-row sm:items-center mb-6">
        <div className="font-medium text-3xl">Orders</div>
      </div>

      <div className="flex items-center">
        Order ID: #{id}
        </div>
    </div>
  );
}
