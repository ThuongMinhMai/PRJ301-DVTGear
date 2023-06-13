"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AddCircleIcon,
  DeleteIcon,
  EditIcon,
  MoreHorizIcon,
} from "@/contexts/icons";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/contexts/GlobalContext";
import axios from "axios";
import { Loader, Scroll } from "@/components";

type Props = {};

export default function ProductsPage({}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between flex-col sm:flex-row sm:items-center mb-6">
        <div className="font-medium text-3xl">Products</div>
        <Link
          href="/products/new"
          className="btn btn-primary text-white w-fit mt-3"
        >
          <AddCircleIcon />
          <div className="ml-2">Add Product</div>
        </Link>
      </div>

      <ProductList />
    </div>
  );
}

type ProductListProps = {};

const ProductList = ({}: ProductListProps) => {
  const router = useRouter();
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/store/api/products"
      );
      setProductList(data.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    const deleteProduct = async () => {
      axios.delete("http://localhost:8080/store/api/products", {
        data: { id },
      });
    };
    await deleteProduct();
    fetchProducts();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Scroll>
      <table className="min-w-full border-spacing-y-3 border-separate whitespace-nowrap pb-24">
        <thead>
          <tr className="font-medium text-xs uppercase">
            <th className="pl-6 pr-4">ID</th>
            <th className="px-4">Photo</th>
            <th className="px-4">Name</th>
            <th className="px-4">Category</th>
            <th className="px-4">Brand</th>
            <th className="px-4">Price</th>
            <th className="px-4">Storage</th>
            <th className="text-end pr-8 pl-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-dvt-item">
          {productList.map((product, index) => {
            return (
              <tr
                key={product.id}
                className="bg-dvt-item py-4 px-6 rounded-xl mb-2"
              >
                <td className="text-primary pl-6 pr-4 rounded-l-xl font-bold">
                  {"#"}
                  {index + 1}
                </td>
                <td className="px-4">
                  <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden">
                    <Image
                      fill
                      alt="product"
                      src={JSON.parse(product.images)[0]}
                    />
                  </div>
                </td>
                <td className="px-4">{product.name}</td>
                <td className="px-4">{product.category.name}</td>
                <td className="px-4">{product.brand.name}</td>
                <td className="px-4">
                  đ{Number(product.price).toLocaleString()}
                </td>
                <td className="px-4">
                  {Number(product.storage).toLocaleString()}
                </td>
                <td className="text-end rounded-r-xl text-white pr-6 pl-4">
                  <DropdownActions
                    handleDeleteProduct={handleDeleteProduct}
                    product={product}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Scroll>
  );
};

type DropdownActionsProps = {
  product: Product;
  handleDeleteProduct: (id: number) => void;
};

function DropdownActions({
  product,
  handleDeleteProduct,
}: DropdownActionsProps) {
  const { setEditedProduct, setModal } = useGlobalContext();
  const router = useRouter();
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-primary m-1 text-white">
        <MoreHorizIcon />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52"
      >
        <li>
          <div
            onClick={() => {
              setEditedProduct(product);
              router.push("/products/edit");
            }}
          >
            <EditIcon />
            Edit
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setModal({
                message: product.name,
                display: true,
                handleModal: () => {
                  handleDeleteProduct(product?.id!);
                },
              });
            }}
          >
            <DeleteIcon />
            Delete
          </div>
        </li>
      </ul>
    </div>
  );
}
