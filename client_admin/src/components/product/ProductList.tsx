"use client";

import axios from "axios";
import {useEffect, useState} from "react";
import {Loader, Scroll} from "..";
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import {useGlobalContext} from "@/contexts/GlobalContext";

type ProductListProps = {
  firstProducts: Product[];
};

const ProductList = ({firstProducts}: ProductListProps) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(2);
  const [totalProducts, setTotalProducts] = useState(0);
  const router = useRouter();
  const {setEditedProduct} = useGlobalContext();
  const searchQuery = useSearchParams()?.get("searchQuery");

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
              <th className="pl-4 pr-8 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black-2">
            {[...firstProducts, ...productList]?.map((product) => {
              return (
                <tr
                  key={product.id}
                  className="px-6 py-4 mb-2 bg-black-2 rounded-xl"
                >
                  <td className="pl-6 pr-4 font-bold text-primary rounded-l-xl">
                    {"#"}
                    {product.id}
                  </td>
                  <td className="px-4">
                    <div className="relative w-10 h-10 overflow-hidden bg-white rounded-lg">
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
                  <td className="pl-4 pr-6 text-white text-end rounded-r-xl">
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="m-1 text-white btn btn-primary"
                      >
                        <Image
                          width={24}
                          height={24}
                          alt="more"
                          src="/more.svg"
                          className="filter invert"
                        />
                      </label>
                      <ul
                        tabIndex={0}
                        className="p-2 shadow dropdown-content menu bg-primary rounded-box w-52"
                      >
                        <li>
                          <div
                            onClick={() => {
                              setEditedProduct(product);
                              router.push("/products/edit");
                            }}
                          >
                            <Image
                              width={24}
                              height={24}
                              alt="edit"
                              src="/edit.svg"
                              className="filter invert"
                            />
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
