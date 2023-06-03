"use client";

import React, { useEffect } from "react";
import bgAuth from "../assets/bg-auth.jpg";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useGlobalContext } from "@/contexts/GlobalContext";
import logo from "../assets/logo2.png";
import videoBg from "../assets/videoBg.mp4";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

const admins = ["kingchenobama711@gmail.com"];

export default function AuthAdmin({ children }: Props) {
  const { currentUser, setCurrentUser } = useGlobalContext();

  useEffect(() => {
    const userData = sessionStorage.getItem("dvt-auth");

    setCurrentUser(userData ? JSON.parse(userData) : null);
  }, []);

  async function handleLoginUser(googleToken: string) {
    const userData: any = jwt_decode(googleToken);
    console.log(userData);

    if (admins.includes(userData.email)) {
      sessionStorage.setItem("dvt-auth", JSON.stringify(userData));
      setCurrentUser(userData);
    } else {
      alert("This account is not administrator");
    }
  }

  if (!currentUser) {
    return (
      <div className="relative h-full w-full">
        <div className="bg-black/40 absolute inset-0 z-10" />
        <div className="w-full h-full justify-center items-center flex">
          <video
            className="w-full h-full object-fill"
            src={videoBg}
            autoPlay
            loop
            muted
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center items-center">
          {/* <Image
            alt="logo"
            height={64}
            width={154}
            src={logo}
            className="mb-4"
          /> */}
          <div className="w-16 h-40 text-7xl flex justify-center items-center text-primary">
            LOGO
          </div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const googleToken = credentialResponse.credential;
              handleLoginUser(googleToken as string);
            }}
            onError={() => {}}
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
