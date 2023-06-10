type Product = {
  id?: number;
  name: string;
  category: Category;
  brand: Brand;
  description: string;
  price: number | string;
  images: string;
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
  username: string;
  date: string;
  totalMoney: number;
  status: string;
};

type Status = "COMPLETE" | "PROCESSING" | "CANCELLED" | "DELIVERING";

type Person = {
  id?: number;
  name?: name;
  email?: email;
  role: "Admin" | "Customer";
  picture: string | StaticImport;
} | null;

type ModalType = {
  display: boolean;
  message: string;
  handleModal: () => void;
};
