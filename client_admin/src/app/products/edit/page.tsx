"use client";

import { Loader, ProductForm } from "@/components";
import { ArrowBackIcon } from "@/contexts/icons";
import updateProduct from "@/services/updateProduct";
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

    await updateProduct(form);

    //router push tự động cache dữ liệu và không lấy dữ liệu mới sau khi update. Chưa tìm được cách giải quyết. tạm thời chơi kiểu truyền thống
    // router.push("/products");
    window.location.href = "http://localhost:3000/products";
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
