import axios from "axios";

//just get 10 first products
export default async function getProducts(searchQuery: string | null) {
  const { data } = await axios.get(
    `http://localhost:8080/store/api/products?page=1&pageSize=10&searchQuery=${
      searchQuery || ""
    }`
  );

  return data.products || [];
}
