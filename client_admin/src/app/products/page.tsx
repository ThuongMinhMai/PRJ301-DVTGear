import React from "react";
import Link from "next/link";
import { ProductList } from "@/components";
import AddIcon from "@/assets/AddIcon";
import getProducts from "@/services/getProducts";
import SearchProducts from "@/components/SearchProducts";

type SearchParams = {
  searchQuery: string;
};

type Props = {
  searchParams?: SearchParams;
};

export const revalidate = 0;

export default async function ProductsPage({ searchParams }: Props) {
  const firstProducts = (await getProducts(searchParams?.searchQuery || ""))
    .products;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between flex-col sm:flex-row sm:items-center mb-6 gap-6">
        <div className="font-medium text-3xl">Products</div>

        <SearchProducts />

        <Link href="/products/new" className="btn btn-primary text-white w-fit">
          <AddIcon className="w-6 h-6" />
          <div className="ml-2">Add Product</div>
        </Link>
      </div>

      {/* fetch some products at server and do infinity scrolling at client */}
      <ProductList firstProducts={firstProducts} />
    </div>
  );
}
