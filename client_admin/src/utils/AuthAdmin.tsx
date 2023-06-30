"use client";

import React, { useCallback, useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useGlobalContext } from "@/contexts/GlobalContext";
import logo from "../assets/logo3.png";
import videoBg from "../assets/videoBg.mp4";
import Image from "next/image";
import axios from "axios";
import { AlertType } from "./types";
import Alert from "@/components/Alert";

type Props = {
  children: React.ReactNode;
};

export default function AuthAdmin({ children }: Props) {
  const { currentUser, setCurrentUser, setShowAlert } = useGlobalContext();
  const [admins, setAdmins] = useState<any>([]);
  const [setIsLoading, setSetIsLoading] = useState(true);

  const fetchAdmins = useCallback(async () => {
    const { data } = await axios.get("http://localhost:8080/store/api/admins");
    setAdmins(JSON.parse(data.admins || "[]"));
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, []);

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
      setShowAlert({
        status: true,
        type: AlertType.failure,
        message: "This account is not administrator",
      });
    }
  }

  if (!currentUser) {
    return (
      <div className="relative h-full w-full">
        <div className="bg-black/40 absolute inset-0 z-10" />
        <div className="w-full h-full justify-center items-center flex">
          <Alert />
          <video
            className="w-full h-full object-fill"
            src={videoBg}
            autoPlay
            loop
            muted
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center items-center">
          <Image
            alt="logo"
            height={64}
            width={154}
            src={logo}
            className="mb-4"
          />
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
