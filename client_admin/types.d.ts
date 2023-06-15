type Product = {
  id?: number;
  name: string;
  category: Category;
  brand: Brand;
  description: string;
  price: number;
  images: string;
  storage: number;
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
  customer: string;
  date: string;
  totalMoney: number;
  status: Status;
  receiver: string;
  address: string;
  phone: string;
  orderProducts: OrderProduct[];
};

type OrderProduct = {
  product: Product;
  quantity: number;
  price: number; //price at order have created
  isRated: boolean;
};

type Status = "COMPLETE" | "PROCESSING" | "CANCELLED" | "DELIVERING";

type ModalType = {
  display: boolean;
  message: string;
  handleModal: () => void;
};
