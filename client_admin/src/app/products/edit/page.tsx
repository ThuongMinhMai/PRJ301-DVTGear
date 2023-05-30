"use client";

import { ProductForm } from "@/components";
import { ArrowBackIcon } from "@/contexts/icons";
import Link from "next/link";
import React from "react";

type Props = {};

export default function EditProductPage({}: Props) {
  const handleSubmit = (form: Product) => {
    console.log(form);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="font-medium text-3xl">Edit Product</div>
        <Link href="/products" className="btn btn-primary mb-6 text-white">
          <ArrowBackIcon />
          <div className="ml-2">Back</div>
        </Link>
      </div>

      <ProductForm edit handleSubmit={handleSubmit} />
    </div>
  );
}
