"use server";

import { API_PATH } from "@/utils/constant";
import {revalidatePath} from "next/cache";

const orderAPI = `${API_PATH}/orders`

//just get 10 first orders
export async function getOrders(
  searchQuery: string,
  searchType: string,
  page: number,
  pageSize: number
) {
  const res = await fetch(
    `${orderAPI}?page=${page}&pageSize=${pageSize}&searchQuery=${
      searchQuery || ""
    }&searchType=${searchType || ""}`,
    {
      next: {revalidate: 0},
    }
  );

  if (!res.ok) {
    return {orders: [] as Order[], itemsCount: 0};
  }

  const data: {orders: Order[]; itemsCount: number} = await res.json();

  return data;
}

export async function getOrderDetail(id: string) {
  const res = await fetch(
    `${orderAPI}?orderId=${id}`,
    {
      next: {revalidate: 0},
    }
  );

  if (!res.ok) {
    return undefined;
  }

  const data: {order: Order} = await res.json();

  return data.order;
}

export async function approveOrder(id: number) {
  const data = {
    orderId: id,
  };

  const res = await fetch(orderAPI, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return {isSuccess: false, message: "Something wrong"};
  }

  revalidatePath("/orders");
  revalidatePath(`/orders/${id}`);

  return {isSuccess: true, message: "Approve order successfully!"};
}
