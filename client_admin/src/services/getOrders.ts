import axios from "axios";

//just get 10 first orders
export default async function getOrders(searchQuery: string | null) {
  const { data } = await axios.get(
    `http://localhost:8080/store/api/orders?page=1&pageSize=10&searchQuery=${
      searchQuery || ""
    }`
  );

  return data.orders || [];
}
