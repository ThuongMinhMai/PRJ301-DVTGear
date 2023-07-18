"use server";

import {API_PATH} from "@/utils/constant";
import {revalidatePath} from "next/cache";

const productAPI = `${API_PATH}/products`;

export const updateProduct = async (product: Product) => {
  const data = {
    ...product,
    images: JSON.parse(product.images),
  };

  await fetch(productAPI, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/products");
};

export async function getProducts(
  searchQuery: string,
  page: number,
  pageSize: number
) {
  const res = await fetch(
    `${productAPI}?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`,
    {
      next: {revalidate: 0},
    }
  );

  if (!res.ok) {
    return {products: [] as Product[], totalCount: 0};
  }

  const data: {products: Product[]; totalCount: number} = await res.json();

  return data;
}

export async function enableProduct(product: Product) {
  const data = {
    ...product,
    images: JSON.parse(product.images),
    disable: false,
    category: product.category.id,
    brand: product.brand.id,
  };

  await fetch(productAPI, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/products");
}

export async function disableProduct(product: Product) {
  const data = {
    ...product,
    images: JSON.parse(product.images),
    disable: true,
    category: product.category.id,
    brand: product.brand.id,
  };

  await fetch(productAPI, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/products");
}
