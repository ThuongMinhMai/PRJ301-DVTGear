"use server";

export const getStatistical = async () => {
  const response = await fetch("http://localhost:8080/store/api/statistical", {
    next: {revalidate: 0},
  });

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
};
