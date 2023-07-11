"use client";

import {updateProduct} from "@/app/_actions/products";
import {Loader, ProductForm} from "@/components";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useTransition} from "react";

type Props = {};

export default function EditProductPage({}: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (form: Product) => {
    startTransition(async () => {
      await updateProduct(form);

      router.push("/products");
      router.refresh(); //to get updated data
    });
  };

  if (isPending) {
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
        <div className="text-3xl font-medium">Edit Product</div>
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

      <ProductForm edit handleSubmit={handleSubmit} />
    </div>
  );
}
