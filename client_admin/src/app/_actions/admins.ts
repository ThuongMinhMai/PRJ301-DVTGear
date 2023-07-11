'use server'

import {revalidatePath} from "next/cache";

export async function addAdmin(formData: FormData) {
  const formDataObj: any = {};
  formData.forEach((value, key) => (formDataObj[key] = value));

  const data = {
    email: formDataObj.email.toLowerCase(),
    admins: formDataObj.admins.split(","),
    type: "add",
  };

  try {
    await fetch("http://localhost:8080/store/api/admins", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {}

  revalidatePath("/settings");
}

export async function deleteAdmin(formData: FormData) {
  const formDataObj: any = {};
  formData.forEach((value, key) => (formDataObj[key] = value));

  const data = {
    email: formDataObj.email.toLowerCase(),
    admins: formDataObj.admins.split(","),
    type: "delete",
  };

  try {
    await fetch("http://localhost:8080/store/api/admins", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {}

  revalidatePath("/settings");
}

export async function getAdmins() {
  const res = await fetch("http://localhost:8080/store/api/admins");

  if (!res.ok) {
    return undefined;
  }

  const data: {admins: string} = await res.json();

  return JSON.parse(data.admins) as Admin[];
}
