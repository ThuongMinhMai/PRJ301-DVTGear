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
      className="flex-1 flex"
    >
      <input
        ref={inputRef}
        className="flex-1 w-0 py-3 px-5 bg-dvt-item rounded-md"
        placeholder="search orders... ( by phone number )"
      />
    </form>
  );
}
