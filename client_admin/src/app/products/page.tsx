import React from "react";
import Link from "next/link";
import {Pagination, ProductItem, Scroll, SearchProducts} from "@/components";
import {getProducts} from "../_actions/products";
import Image from "next/image";

type SearchParams = {
  searchQuery?: string;
  page?: number;
};

type Props = {
  searchParams?: SearchParams;
};

export const revalidate = 0;

export default async function ProductsPage({searchParams}: Props) {
  const currentPage = searchParams?.page || 1;
  const searchQuery = searchParams?.searchQuery || "";
  const pageSize = 10;
  const {products, totalCount} = await getProducts(
    searchQuery,
    currentPage,
    pageSize
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between gap-6 mb-6 sm:flex-row sm:items-center">
        <div className="text-3xl font-medium">Products</div>

        <SearchProducts />

        <Link href="/products/new" className="text-white btn btn-primary w-fit">
          <Image
            src="/add-icon.svg"
            alt="add"
            width={24}
            height={24}
            className="filter invert"
          />
          <div className="ml-2">Add Product</div>
        </Link>
      </div>

      <Scroll>
        <table className="min-w-full pb-24 border-separate border-spacing-y-3 whitespace-nowrap">
          <thead>
            <tr className="text-xs font-medium uppercase">
              <th className="pl-6 pr-4">ID</th>
              <th className="px-4">Photo</th>
              <th className="px-4">Name</th>
              <th className="px-4">Category</th>
              <th className="px-4">Brand</th>
              <th className="px-4">Price</th>
              <th className="px-4">Storage</th>
              <th className="px-4">Sold</th>
              <th className="px-4">Status</th>
              <th className="pl-4 pr-8 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black-2">
            {products?.map((product) => {
              return <ProductItem product={product} />;
            })}
          </tbody>
        </table>
      </Scroll>

      <Pagination
        path={`/products?searchQuery=${searchQuery}`}
        pageSize={pageSize}
        totalItems={totalCount}
      />
    </div>
  );
}
