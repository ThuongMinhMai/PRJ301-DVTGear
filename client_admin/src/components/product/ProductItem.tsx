"use client";

import { disableProduct, enableProduct } from "@/app/_actions/products";
import {useAlertStore, useEditedProductStore} from "@/store";
import clsx from "clsx";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React from "react";

type Props = {
  product: Product;
};

export default function ProductItem({product}: Props) {
  const router = useRouter();
  return (
    <tr key={product.id} className="px-6 py-4 mb-2 bg-black-2 rounded-xl">
      <td className="pl-6 pr-4 font-bold rounded-l-xl">
        {"#"}
        {product.id}
      </td>
      <td className="px-4">
        <div className="relative w-10 h-10 overflow-hidden bg-white rounded-lg">
          <Image fill alt="product" src={JSON.parse(product.images)[0]} />
        </div>
      </td>
      <td className="px-4">{product.name}</td>
      <td className="px-4">{product.category.name}</td>
      <td className="px-4">{product.brand.name}</td>
      <td className="px-4">đ{Number(product.price).toLocaleString()}</td>
      <td className="px-4">{Number(product.storage).toLocaleString()}</td>
      <td className="px-4">{Number(product.sold).toLocaleString()}</td>
      <td className="px-4">
        <div
          className={clsx(
            "badge badge-lg font-medium text-white px-2",
            product.disable ? "badge-error" : "badge-success"
          )}
        >
          {product.disable ? "DISABLED" : "ENABLED"}
        </div>
      </td>
      <td className="pl-4 pr-6 text-white text-end rounded-r-xl">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="m-1 text-white btn btn-primary">
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
                  useEditedProductStore.setState({
                    editedProduct: product,
                  });
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
            <li>
              <div
                onClick={async () => {
                  if (product.disable) {
                    await enableProduct(product);
                    useAlertStore.getState().setShowAlert({
                      status: true,
                      type: "success",
                      message: "Enable product successfully",
                    });
                    router.refresh();
                  } else {
                    await disableProduct(product);
                    useAlertStore.getState().setShowAlert({
                      status: true,
                      type: "success",
                      message: "Disable product successfully",
                    });
                    router.refresh();
                  }
                }}
              >
                <Image
                  width={24}
                  height={24}
                  alt="edit"
                  src={
                    product.disable
                      ? "/enable-product.svg"
                      : "/disable-product.svg"
                  }
                  className="filter invert"
                />
                {product.disable ? "Enable" : "Disable"}
              </div>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}
