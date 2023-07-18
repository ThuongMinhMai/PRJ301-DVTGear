"use server";

import {API_PATH} from "@/utils/constant";

export const getStatistical = async () => {
  const response = await fetch(`${API_PATH}/statistical`, {
    next: {revalidate: 0},
  });

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};
