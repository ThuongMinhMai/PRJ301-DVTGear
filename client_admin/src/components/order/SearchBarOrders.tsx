"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";

type Props = {};

export default function SearchOrders({}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputRef.current?.value) {
          router.push(`/orders?searchQuery=${inputRef.current?.value}`);
        } else {
          router.push("/orders");
        }
      }}
      className="flex flex-1"
    >
      <input
        ref={inputRef}
        className="flex-1 w-0 px-5 py-3 rounded-md bg-black-2"
        placeholder="search orders... ( by phone number )"
      />
    </form>
  );
}
