"use client";

import Image from "next/image";
import React from "react";

type Props = {};

export default function CurrentAdminInformation(props: Props) {
  const currentAdmin = JSON.parse(
    localStorage.getItem("current_admin") ?? "{}"
  );

  return (
    <div className="flex flex-col items-center mt-24 text-slate-100">
      <div className="relative">
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
        <Image
          alt="avatar"
          src={currentAdmin?.picture!}
          height={48}
          width={48}
          className="rounded-full"
        />
      </div>
      <h2 className="my-2 text-lg font-semibold line-clamp-1 text-">
        {currentAdmin?.name}
      </h2>
      <p className="text-sm line-clamp-1">{currentAdmin?.email}</p>
    </div>
  );
}
