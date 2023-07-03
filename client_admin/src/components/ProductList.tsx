"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Loader, Scroll } from ".";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { EditIcon, MoreHorizIcon } from "@/contexts/icons";

type ProductListProps = {
  firstProducts: Product[];
};

const ProductList = ({ firstProducts }: ProductListProps) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(2);
  const [totalProducts, setTotalProducts] = useState(0);
  const router = useRouter();
  const { setEditedProduct } = useGlobalContext();
  const searchQuery = useSearchParams().get("searchQuery");


  useEffect(() => {
    console.log();
    axios
      .get(
        `http://localhost:8080/store/api/products?page=${pageNum}&pageSize=10&searchQuery=${
          searchQuery || ""
        }`
      )
      .then((res) => res.data)
      .then((data) => {
        setProductList((prev) => [...prev, ...data.products]);
        setTotalProducts(data.totalCount);
        setIsLoading(false);
      });
  }, [pageNum]);

  useEffect(() => {
    setProductList([]);
    setPageNum(2);
  }, [searchQuery]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPageNum((prev) => prev + 1);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (pageNum * 10 >= Number(totalProducts) && totalProducts > 0) {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageNum]);

  return (
    <>
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
            {[...firstProducts, ...productList]?.map((product) => {
              return (
                <tr
                  key={product.id}
                  className="bg-dvt-item py-4 px-6 rounded-xl mb-2"
                >
                  <td className="text-primary pl-6 pr-4 rounded-l-xl font-bold">
                    {"#"}
                    {product.id}
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
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-primary m-1 text-white"
                      >
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
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Scroll>
      {isLoading && <Loader />}
    </>
  );
};

export default ProductList;
