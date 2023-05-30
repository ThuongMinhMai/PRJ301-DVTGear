"use client";

import { useGlobalContext } from "@/contexts/GlobalConext";
import {
  DashboardIcon,
  LogoutIcon,
  MenuIcon,
  OrdersIcon,
  ProductsIcon,
  SettingsIcon,
} from "@/contexts/icons";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";

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
  const { selectedNav, setVerified } = useGlobalContext();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="bg-inherit min-h-screen w-[280px] text-white p-4 pt-0 hidden lg:block">
        <div className="flex items-center border-b-2 py-2 border-[#C2D0EA] max-auto justify-center">
          <Image alt="logo" height={72} width={180} src={logo} />
        </div>

        <ul className="flex flex-col mt-6">
          {links.map((link) => {
            return (
              <li className="cursor-pointer -mr-4" key={link.label}>
                <Link
                  href={link.pathname}
                  className={`flex py-4 px-4 rounded-l-2xl ${
                    selectedNav === link.label
                      ? "bg-dvt-white-1 text-primary navigation_effect"
                      : ""
                  }`}
                >
                  {link.icon}
                  <div className="font-medium text-lg ml-2">{link.label}</div>
                </Link>
              </li>
            );
          })}

          <li
            onClick={() => {
              googleLogout();
              sessionStorage.removeItem("dvt-auth");
              setVerified(false);
            }}
            className="cursor-pointer"
          >
            <div className="flex py-2 px-4 rounded-2xl">
              <LogoutIcon />
              <div className="font-medium text-lg ml-2">Log Out</div>
            </div>
          </li>
        </ul>
      </div>

      <div className="lg:hidden py-4 text-dvt-white-1  flex justify-center items-center">
        <MenuIcon
          className="absolute left-4 md:w-12 md:h-12 w-9 h-9 cursor-pointer"
          onClick={() => setOpenMobileNav(true)}
        />
        <div className="flex items-center gap-4 max-auto justify-center">
          <Image alt="logo" height={48} width={48} src={logo} />
          <div className="md:text-2xl font-bold text-lg">DVT Admin</div>
        </div>
      </div>

      <ul
        className={`flex flex-col fixed inset-0 bg-primary text-dvt-white-1 py-2 px-4 lg:hidden transition-all z-50 -translate-x-full ${
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
                className={`flex py-2 px-4 rounded-2xl hover:bg-dvt-white-1 hover:text-primary ${
                  selectedNav === link.label
                    ? "bg-dvt-white-1 text-primary"
                    : ""
                }`}
              >
                {link.icon}
                <div className="font-medium text-lg ml-2">{link.label}</div>
              </Link>
            </li>
          );
        })}

        <li
          onClick={() => {
            googleLogout();
            sessionStorage.removeItem("dvt-auth");
            setVerified(false);
          }}
          className="cursor-pointer"
        >
          <div className="flex py-2 px-4 rounded-2xl hover:bg-dvt-white-1 hover:text-primary">
            <LogoutIcon />
            <div className="font-medium text-lg ml-2">Log Out</div>
          </div>
        </li>
      </ul>
    </>
  );
}
