"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type GlobalContextType = {
  selectedNav: string;
  setSelectedNav: (val: string) => void;
  editedProduct: Product | null | undefined;
  setEditedProduct: (val: Product) => void;
  currentUser: any;
  setCurrentUser: (val: any) => void;
  showAlert: {
    status: boolean;
    type: AlertType;
    message: string;
  };
  setShowAlert: (val: any) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  selectedNav: "",
  setSelectedNav: () => {},
  editedProduct: null,
  setEditedProduct: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  showAlert: {
    status: false,
    type: "info" as AlertType,
    message: "",
  },
  setShowAlert: () => {},
});

type GlobalProviderProps = {
  children: ReactNode;
};

type PathNameToNavType = {
  [key: string]: string;
};

const pathNameToNav: PathNameToNavType = {
  "/": "Dashboard",
  "/products": "Products",
  "/orders": "Orders",
  "/settings": "Settings",
};

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [selectedNav, setSelectedNav] = useState("");
  const pathName = usePathname();
  const [editedProduct, setEditedProduct] = useState<Product>();
  const [currentUser, setCurrentUser] = useState<any>();
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info" as AlertType,
    message: "",
  });

  useEffect(() => {
    setSelectedNav(pathNameToNav["/" + pathName?.split("/")[1] || ""]);
  }, [pathName]);

  // * Handle alerts
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: "info", message: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <GlobalContext.Provider
      value={{
        selectedNav,
        setSelectedNav,
        editedProduct,
        setEditedProduct,
        currentUser,
        setCurrentUser,
        showAlert,
        setShowAlert,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
