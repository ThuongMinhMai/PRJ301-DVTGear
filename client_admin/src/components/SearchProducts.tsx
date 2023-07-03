"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";

type Props = {};

export default function SearchProducts({}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputRef.current?.value) {
          router.push(`/products?searchQuery=${inputRef.current?.value}`);
        } else {
          router.push("/products");
        }
      }}
      className="flex-1 flex"
    >
      <input
        ref={inputRef}
        className="flex-1 w-0 py-3 px-5 bg-dvt-item rounded-md"
        placeholder="search products..."
      />
    </form>
  );
}
