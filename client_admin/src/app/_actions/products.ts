"use server";

import {revalidatePath} from "next/cache";

export const updateProduct = async (form: Product) => {
  const data = {
    ...form,
    images: JSON.parse(form.images),
  };

  await fetch("http://localhost:8080/store/api/products", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/products");
};

export async function getProducts(searchQuery: string | null) {
  const res = await fetch(
    `http://localhost:8080/store/api/products?page=1&pageSize=10&searchQuery=${
      searchQuery || ""
    }`
  );

  if (!res.ok) {
    return [] as Product[];
  }

  const data: {products: Product[]} = await res.json();

  return data.products;
}
