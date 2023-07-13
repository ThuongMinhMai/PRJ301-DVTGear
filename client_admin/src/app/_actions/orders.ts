"use server";

//just get 10 first orders
export async function getOrders(searchQuery: string | null) {
  const res = await fetch(
    `http://localhost:8080/store/api/orders?page=1&pageSize=10&searchQuery=${
      searchQuery || ""
    }`
  );

  if (!res.ok) {
    return [] as Order[];
  }

  const data: {orders: Order[]} = await res.json();

  return data.orders;
}

export async function getOrderDetail(id: string) {
  const res = await fetch(
    `http://localhost:8080/store/api/orders?orderId=${id}`
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

  const res = await fetch("http://localhost:8080/store/api/orders", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return {isSuccess: false, message: "Something wrong"};
  }

  return {isSuccess: false, message: "Something wrong"};
}
