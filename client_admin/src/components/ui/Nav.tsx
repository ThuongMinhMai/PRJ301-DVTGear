"use client";

import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {googleLogout} from "@react-oauth/google";
import {logOutCurrentAdmin} from "@/app/_actions/admins";
import {usePathname, useRouter} from "next/navigation";
import CurrentAdminInformation from "./CurrentAdminInformation";

type Props = {};

const links = [
  {
    pathname: "/",
    label: "Dashboard",
    icon: "/dashboard.svg",
  },
  {
    pathname: "/products",
    label: "Products",
    icon: "/product.svg",
  },
  {
    pathname: "/orders",
    label: "Orders",
    icon: "/order.svg",
  },
  {
    pathname: "/settings",
    label: "Settings",
    icon: "/setting.svg",
  },
];

const pathNameToNav: Record<string, string> = {
  "/": "Dashboard",
  "/products": "Products",
  "/orders": "Orders",
  "/settings": "Settings",
};

export default function Nav({}: Props) {
  const [selectedNav, setSelectedNav] = useState("");
  const pathName = usePathname();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSelectedNav(pathNameToNav["/" + pathName?.split("/")[1] || ""]);
  }, [pathName]);

  return (
    <>
      <div className="relative bg-primary w-[280px] text-white hidden lg:block">
        <div className="fixed p-4 pt-0 w-[280px]">
          <div className="flex items-center justify-center py-2 border-b-2 border-y-black-2 max-auto">
            <Image alt="logo" height={72} width={180} src="/logo.png" />
          </div>

          <ul className="flex flex-col mt-6">
            {links.map((link) => {
              return (
                <li className="-mr-4 cursor-pointer" key={link.label}>
                  <Link
                    href={link.pathname}
                    className={`flex py-4 px-4 rounded-l-2xl ${
                      selectedNav === link.label
                        ? "bg-black-1 text-primary navigation_effect"
                        : ""
                    }`}
                  >
                    <Image
                      alt={link.label}
                      src={link.icon}
                      width={24}
                      height={24}
                      className="filter invert"
                    />
                    <div className="ml-2 text-lg font-medium">{link.label}</div>
                  </Link>
                </li>
              );
            })}

            <li
              onClick={async () => {
                await logOutCurrentAdmin();
                router.refresh();
              }}
              className="cursor-pointer"
            >
              <div className="flex px-4 py-2 rounded-2xl">
                <Image
                  alt="logout"
                  src="/logout.svg"
                  width={24}
                  height={24}
                  className="filter invert"
                />
                <div className="ml-2 text-lg font-medium">Log Out</div>
              </div>
            </li>
          </ul>

          <CurrentAdminInformation />
        </div>
      </div>

      <div className="flex items-center justify-center py-4 lg:hidden text-black-1">
        <div className="absolute cursor-pointer md:w-12 md:h-12 w-9 h-9 left-4">
          <Image alt="logout" src="/menu.svg" fill className="filter invert" />
        </div>

        <div className="flex items-center justify-center gap-4 max-auto">
          <Image alt="logo" height={56} width={56} src="/logo.png" />
        </div>
      </div>

      <ul
        className={`flex flex-col fixed inset-0 bg-primary text-black-1 py-2 px-4 lg:hidden transition-all z-50 -translate-x-full ${
          openMobileNav ? "translate-x-0" : ""
        }`}
      >
        {links.map((link) => {
          return (
            <li
              key={link.label}
              className="cursor-pointer"
              onClick={() => {
                setOpenMobileNav(false);
              }}
            >
              <Link
                href={link.pathname}
                className={`flex py-2 px-4 rounded-2xl hover:bg-black-1 hover:text-primary ${
                  selectedNav === link.label ? "bg-black-1 text-primary" : ""
                }`}
              >
                {link.icon}
                <div className="ml-2 text-lg font-medium">{link.label}</div>
              </Link>
            </li>
          );
        })}

        <li
          onClick={() => {
            googleLogout();
            sessionStorage.removeItem("dvt-auth");
            router.refresh();
          }}
          className="cursor-pointer"
        >
          <div className="flex px-4 py-2 rounded-2xl hover:bg-black-1 hover:text-primary">
            <Image
              alt="logout"
              src="/logout.svg"
              width={24}
              height={24}
              className="filter invert"
            />
            <div className="ml-2 text-lg font-medium">Log Out</div>
          </div>
        </li>
      </ul>
    </>
  );
}
