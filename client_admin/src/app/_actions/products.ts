"use server";

import {revalidatePath} from "next/cache";

export const updateProduct = async (product: Product) => {
  const data = {
    ...product,
    images: JSON.parse(product.images),
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
    }`,
    {
      next: {revalidate: 0},
    }
  );

  if (!res.ok) {
    return [] as Product[];
  }

  const data: {products: Product[]} = await res.json();

  return data.products;
}

export async function enableProduct(product: Product) {
  const data = {
    ...product,
    images: JSON.parse(product.images),
    disable: false,
    category: product.category.id,
    brand: product.brand.id,
  };

  await fetch("http://localhost:8080/store/api/products", {
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

  await fetch("http://localhost:8080/store/api/products", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  revalidatePath("/products");
}
