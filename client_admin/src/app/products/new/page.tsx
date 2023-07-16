"use client";

import {Loader, ProductForm} from "@/components";
import {useAlertStore} from "@/store";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

type Props = {};

export default function AddProductPage({}: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (form: Product) => {
    setIsCreating(true);
    await axios.post("http://localhost:8080/store/api/products", {
      ...form,
      category: Number(form.category),
      brand: Number(form.brand),
      images: JSON.parse(form.images),
      disable: false,
    });
    router.push("/products");
    router.refresh();
    useAlertStore.getState().setShowAlert({
      status: true,
      type: "success",
      message: "Add product successfully",
    });
  };

  if (isCreating) {
    return (
      <div className="flex items-center justify-center">
        <div>Please wait for adding new product...</div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="text-3xl font-medium">Add Product</div>
        <Link href="/products" className="mb-6 text-white btn btn-primary">
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

      <ProductForm handleSubmit={handleSubmit} />
    </div>
  );
}
