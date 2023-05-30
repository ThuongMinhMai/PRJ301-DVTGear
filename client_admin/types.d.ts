type Product = {
  id?: number;
  name: string;
  category: Category;
  brand: Brand;
  description: string;
  price: number | string;
  images: string; // any ->string     t
};

type Brand = {
  id?: number;
  name: string;
};

type Category = {
  id?: number;
  name: string;
};

type Order = {
  id?: number;
  name: string;
  date: Date;
  total: number;
  status: Status;
};

type Status = "Complete" | "Processing" | "Cancelled";

type Person = {
  id?: number;
  name?: name;
  email?: email;
  role: "Admin" | "Customer";
};
