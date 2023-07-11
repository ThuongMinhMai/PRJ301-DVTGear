import React from "react";
import Link from "next/link";
import {ProductList, SearchProducts} from "@/components";
import AddIcon from "@/assets/AddIcon";
import {getProducts} from "../_actions/products";

type SearchParams = {
  searchQuery: string;
};

type Props = {
  searchParams?: SearchParams;
};

export const revalidate = 0;

export default async function ProductsPage({searchParams}: Props) {
  const firstProducts = await getProducts(searchParams?.searchQuery || "");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between gap-6 mb-6 sm:flex-row sm:items-center">
        <div className="text-3xl font-medium">Products</div>

        <SearchProducts />

        <Link href="/products/new" className="text-white btn btn-primary w-fit">
          <AddIcon className="w-6 h-6" />
          <div className="ml-2">Add Product</div>
        </Link>
      </div>

      {/* fetch some products at server and do infinity scrolling at client */}
      <ProductList firstProducts={firstProducts} />
    </div>
  );
}
