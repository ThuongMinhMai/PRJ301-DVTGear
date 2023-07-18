"use server";

import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";
import jwt_decode from "jwt-decode";
import {API_PATH} from "@/utils/constant";

const adminAPI = `${API_PATH}/admins`;

export async function addAdmin(formData: FormData) {
  const formDataObj: any = {};
  formData.forEach((value, key) => (formDataObj[key] = value));

  const data = {
    email: formDataObj.email.toLowerCase(),
    admins: formDataObj.admins.split(","),
    type: "add",
  };

  try {
    await fetch(adminAPI, {
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

  if (data.admins.length <= 1) {
    return;
  }

  try {
    await fetch(adminAPI, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {}

  revalidatePath("/settings");
}

export async function getAdmins() {
  const res = await fetch(adminAPI, {
    next: {revalidate: 0},
  });

  if (!res.ok) {
    return undefined;
  }

  const data: {admins: string} = await res.json();

  return JSON.parse(data.admins) as Admin[];
}

export async function getCurrentAdmin() {
  return cookies().get("current-admin");
}

export async function loginAdmin(googleToken: any) {
  const adminData: any = jwt_decode(googleToken);
  const validAdmins = await getAdmins();

  if (validAdmins ?.includes(adminData?.email)) {
    await cookies().set("current-admin", JSON.stringify(adminData));
    return adminData;
  }

  return undefined;
}

export async function logOutCurrentAdmin() {
  cookies().delete("current-admin");
  revalidatePath("/");
  return;
}
