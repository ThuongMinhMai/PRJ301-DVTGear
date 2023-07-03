"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export default async function deleteAdmin(formData: FormData) {
  const formDataObj: any = {};
  formData.forEach((value, key) => (formDataObj[key] = value));

  try {
    await axios.put("http://localhost:8080/store/api/admins", {
      email: formDataObj.email.toLowerCase(),
      admins: formDataObj.admins.split(","),
      type: "delete",
    });
  } catch (error) {}

  revalidatePath("/settings");
}
