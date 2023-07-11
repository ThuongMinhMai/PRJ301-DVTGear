"use client";

import {useGlobalContext} from "@/contexts/GlobalContext";
import {
  DashboardIcon,
  LogoutIcon,
  MenuIcon,
  OrdersIcon,
  ProductsIcon,
  SettingsIcon,
} from "@/contexts/icons";
import logo from "../../assets/logo.png"
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {googleLogout} from "@react-oauth/google";

type Props = {};

const links = [
  {
    pathname: "/",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    pathname: "/products",
    label: "Products",
    icon: <ProductsIcon />,
  },
  {
    pathname: "/orders",
    label: "Orders",
    icon: <OrdersIcon />,
  },
  {
    pathname: "/settings",
    label: "Settings",
    icon: <SettingsIcon />,
  },
];

export default function Nav({}: Props) {
  const {selectedNav, currentUser, setCurrentUser} = useGlobalContext();
  const [openMobileNav, setOpenMobileNav] = useState(false);

  return (
    <>
      <div className="relative bg-primary w-[280px] text-white hidden lg:block">
        <div className="fixed p-4 pt-0 w-[280px]">
          <div className="flex items-center justify-center py-2 border-b-2 border-y-black-2 max-auto">
            <Image alt="logo" height={72} width={180} src={logo} />
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
                setCurrentUser(null);
              }}
              className="cursor-pointer"
            >
              <div className="flex px-4 py-2 rounded-2xl">
                <LogoutIcon />
                <div className="ml-2 text-lg font-medium">Log Out</div>
              </div>
            </li>
          </ul>

          <div className="flex flex-col items-center mt-24 text-slate-100">
            <div className="relative">
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
              <Image
                alt="avatar"
                src={currentUser?.picture!}
                height={48}
                width={48}
                className="rounded-full"
              />
            </div>
            <h2 className="my-2 text-lg font-semibold line-clamp-1 text-">
              {currentUser?.name}
            </h2>
            <p className="text-sm line-clamp-1">{currentUser?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-4 lg:hidden text-black-1">
        <MenuIcon
          className="absolute cursor-pointer left-4 md:w-12 md:h-12 w-9 h-9"
          onClick={() => setOpenMobileNav(true)}
        />
        <div className="flex items-center justify-center gap-4 max-auto">
          <Image alt="logo" height={56} width={56} src={logo} />
          {/* <div className="text-lg font-bold md:text-2xl">DVT Admin</div> */}
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
                  selectedNav === link.label
                    ? "bg-black-1 text-primary"
                    : ""
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
            setCurrentUser(null);
          }}
          className="cursor-pointer"
        >
          <div className="flex px-4 py-2 rounded-2xl hover:bg-black-1 hover:text-primary">
            <LogoutIcon />
            <div className="ml-2 text-lg font-medium">Log Out</div>
          </div>
        </li>
      </ul>
    </>
  );
}
