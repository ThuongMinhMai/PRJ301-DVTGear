"use client";

import { useGlobalContext } from "@/contexts/GlobalContext";
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
  const { selectedNav, currentUser, setCurrentUser } = useGlobalContext();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="bg-primary w-[280px] text-white p-4 pt-0 hidden lg:block">
        <div className="flex items-center border-b-2 py-2 border-y-dvt-item max-auto justify-center">
          {/* <Image alt="logo" height={72} width={180} src={logo} /> */}
          <div className="h-[72px] w-[180px] text-5xl flex justify-center items-center">
            LOGO
          </div>
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
              setCurrentUser(null);
            }}
            className="cursor-pointer"
          >
            <div className="flex py-2 px-4 rounded-2xl">
              <LogoutIcon />
              <div className="font-medium text-lg ml-2">Log Out</div>
            </div>
          </li>
        </ul>

        <div className="flex flex-col items-center mt-24 text-slate-100">
          <div className="relative">
            <div className="bg-green-500 w-3 h-3 rounded-full absolute bottom-0 right-0"></div>
            <Image
              alt="avatar"
              src={currentUser?.picture!}
              height={48}
              width={48}
              className="rounded-full"
            />
          </div>
          <h2 className="font-semibold text-lg line-clamp-1 my-2 text-">{currentUser?.name}</h2>
          <p className="text-sm line-clamp-1">{currentUser?.email}</p>
        </div>
      </div>

      <div className="lg:hidden py-4 text-dvt-white-1  flex justify-center items-center">
        <MenuIcon
          className="absolute left-4 md:w-12 md:h-12 w-9 h-9 cursor-pointer"
          onClick={() => setOpenMobileNav(true)}
        />
        <div className="flex items-center gap-4 max-auto justify-center">
          <Image alt="logo" height={56} width={56} src={logo} />
          {/* <div className="md:text-2xl font-bold text-lg">DVT Admin</div> */}
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
            setCurrentUser(null);
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
