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
  setSelectedNav: (nav: string) => void;
  editedProduct: Product | null | undefined;
  setEditedProduct: (nav: Product) => void;
  currentUser: Person | null | undefined;
  setCurrentUser: (val: Person) => void;
  modal: ModalType;
  setModal: (val: ModalType) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  selectedNav: "",
  setSelectedNav: () => {},
  editedProduct: null,
  setEditedProduct: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  modal: {
    display: false,
    message: "",
    handleModal:()=>{}
  },
  setModal: () => {},
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
  const [currentUser, setCurrentUser] = useState<Person>();
  const [modal, setModal] = useState({
    display: false,
    message: "",
    handleModal: () => {},
  });

  useEffect(() => {
    setSelectedNav(pathNameToNav["/" + pathName.split("/")[1]]);
  }, [pathName]);

  return (
    <GlobalContext.Provider
      value={{
        selectedNav,
        setSelectedNav,
        editedProduct,
        setEditedProduct,
        currentUser,
        setCurrentUser,
        modal,
        setModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
