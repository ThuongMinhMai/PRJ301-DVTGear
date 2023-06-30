"use client";

import React from "react";
import Link from "next/link";
import { AddCircleIcon } from "@/contexts/icons";
import { ProductList } from "@/components";

type Props = {};

export default function ProductsPage({}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between flex-col sm:flex-row sm:items-center mb-6">
        <div className="font-medium text-3xl">Products</div>
        <Link
          href="/products/new"
          className="btn btn-primary text-white w-fit mt-3"
        >
          <AddCircleIcon />
          <div className="ml-2">Add Product</div>
        </Link>
      </div>

      <ProductList />
    </div>
  );
}
