"use client";

import { Loader, ProductForm } from "@/components";
import { ArrowBackIcon } from "@/contexts/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

export default function EditProductPage({}: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (form: Product) => {
    setIsUpdating(true);
    await axios.put("http://localhost:8080/store/api/products", {
      ...form,
      images: JSON.parse(form.images),
    });
    router.push("/products");
  };

  if (isUpdating) {
    return (
      <div>
        <div>Please wait for adding new product...</div>
        <Loader />
      </div>
    );
  }

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
