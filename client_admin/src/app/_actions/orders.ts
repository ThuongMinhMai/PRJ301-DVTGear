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
