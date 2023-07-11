"use client";

import {GoogleLogin} from "@react-oauth/google";
import React from "react";
import {loginAdmin} from "@/app/_actions/admins";
import {useAlertStore} from "@/store";

type Props = {};

export default function GoogleLoginBtn({}: Props) {
  async function handleLoginAdmin(googleToken: string) {
    if (!(await loginAdmin(googleToken))) {
      useAlertStore.getState().setShowAlert({
        status: true,
        type: "failure",
        message: "This account is not administrator",
      });
    }
  }

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const googleToken = credentialResponse.credential;
        handleLoginAdmin(googleToken as string);
      }}
      onError={() => {}}
    />
  );
}
