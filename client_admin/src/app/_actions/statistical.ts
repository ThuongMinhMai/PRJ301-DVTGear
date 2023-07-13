"use server";

export const getStatistical = async () => {
  const response = await fetch("http://localhost:8080/store/api/statistical");

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};
