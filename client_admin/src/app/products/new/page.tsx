"use client";

import { Loader, ProductForm } from "@/components";
import { ArrowBackIcon } from "@/contexts/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

export default function AddProductPage({}: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (form: Product) => {
    setIsCreating(true);
    await axios.post("http://localhost:8080/api/products", {
      ...form,
      category: Number(form.category),
      brand: Number(form.brand),
      images: JSON.parse(form.images),
    });
    router.push("/products");
  };

  if (isCreating) {
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
        <div className="font-medium text-3xl">Add Product</div>
        <Link href="/products" className="btn btn-primary mb-6 text-white">
          <ArrowBackIcon />
          <div className="ml-2">Back</div>
        </Link>
      </div>

      <ProductForm handleSubmit={handleSubmit} />
    </div>
  );
}
