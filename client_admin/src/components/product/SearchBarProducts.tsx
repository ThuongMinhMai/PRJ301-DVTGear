"use client";

import {useRouter} from "next/navigation";
import React, {useRef} from "react";

type Props = {
  disable?: boolean;
};

export default function SearchProducts({disable}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputRef.current?.value) {
          router.push(
            `/products?searchQuery=${inputRef.current?.value}&page=1`
          );
          router.refresh();
        } else {
          router.push("/products");
          router.refresh();
        }
      }}
      className="flex flex-1"
    >
      <input
        ref={inputRef}
        className="flex-1 w-0 px-5 py-3 rounded-md bg-black-2"
        placeholder="Search..."
        disabled={disable}
      />
    </form>
  );
}
