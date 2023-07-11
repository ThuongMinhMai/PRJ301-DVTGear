"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

const updateProduct = async (form: Product) => {

  await axios.put("http://localhost:8080/store/api/products", {
    ...form,
    images: JSON.parse(form.images),
  });

  revalidatePath("/products");

};

export default updateProduct
