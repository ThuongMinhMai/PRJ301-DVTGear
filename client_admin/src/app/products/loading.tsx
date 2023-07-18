import {Scroll, SearchProducts, Skeleton} from "@/components";
import Image from "next/image";
import React from "react";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between gap-6 mb-6 sm:flex-row sm:items-center">
        <div className="text-3xl font-medium">Products</div>

        <SearchProducts disable />

        <div className="flex items-center justify-center gap-2 text-white btn-disabled btn-primary w-fit">
          <Image
            src="/add-icon.svg"
            alt="add"
            width={24}
            height={24}
            className="filter invert"
          />
          <div className="ml-2">Add Product</div>
        </div>
      </div>

      <div className="min-w-full">
        <div className="flex items-center justify-between mb-3 text-xs font-medium uppercase">
          <div className="pl-6 pr-4">ID</div>
          <div className="px-4">Photo</div>
          <div className="px-4">Name</div>
          <div className="px-4">Category</div>
          <div className="px-4">Brand</div>
          <div className="px-4">Price</div>
          <div className="px-4">Storage</div>
          <div className="px-4">Status</div>
          <div className="pl-4 pr-8 text-end">Actions</div>
        </div>

        <div className="flex flex-col">
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
          <Skeleton className="w-full mb-2 h-[88px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
