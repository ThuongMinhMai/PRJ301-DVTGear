type Product = {
  id?: number;
  name: string;
  category: Category;
  brand: Brand;
  description: string;
  price: number;
  images: string;
  storage: number;
  disable: boolean;
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
  status: Status;
  receiver: string;
  address: string;
  phone: string;

  totalMoney: number;
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

interface IAlert {
  status: boolean;
  type: AlertType;
  message: string;
}

type Admin = string; //email address

//có vài type bị lỗi khi định nghĩa trong types.d.ts, nên dùng cách này để export các type đó
type AlertType = "info" | "success" | "failure";
