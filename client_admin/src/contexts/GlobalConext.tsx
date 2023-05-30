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
  verified: boolean;
  setVerified: (val: boolean) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  selectedNav: "",
  setSelectedNav: () => {},
  editedProduct: null,
  setEditedProduct: () => {},
  verified: false,
  setVerified: () => {},
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
  const [verified, setVerified] = useState(false);

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
        verified,
        setVerified,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
