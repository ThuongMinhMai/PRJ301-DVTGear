"use client";

import React, { useCallback, useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useGlobalContext } from "@/contexts/GlobalContext";
import logo from "../../assets/logo3.png";
import videoBg from "../../assets/videoBg.mp4";
import Image from "next/image";
import axios from "axios";
import Alert from "../ui/Alert";


type Props = {
  children: React.ReactNode;
};

export default function AuthAdmin({ children }: Props) {
  const { currentUser, setCurrentUser, setShowAlert } = useGlobalContext();
  const [admins, setAdmins] = useState<any>([]);

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

    if (admins.includes(userData.email)) {
      sessionStorage.setItem("dvt-auth", JSON.stringify(userData));
      setCurrentUser(userData);
    } else {
      setShowAlert({
        status: true,
        type: "failure",
        message: "This account is not administrator",
      });
    }
  }

  if (!currentUser) {
    return (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-10 bg-black/40" />
        <div className="flex items-center justify-center w-full h-full">
          <Alert />
          <video
            className="object-fill w-full h-full"
            src={videoBg}
            autoPlay
            loop
            muted
          />
        </div>
        <div className="absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
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
