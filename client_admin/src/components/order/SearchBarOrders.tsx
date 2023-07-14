"use client";

import {useAlertStore} from "@/store";
import {useRouter} from "next/navigation";
import React, {useRef, useState} from "react";

type Props = {};

export default function SearchOrders({}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchType, setSearchType] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!searchType) {
            useAlertStore.getState().setShowAlert({
              status: true,
              type: "failure",
              message: "Please enter a search type",
            });
            return;
          }

          if (inputRef.current?.value) {
            router.push(
              `/orders?searchQuery=${inputRef.current?.value}&searchType=${searchType}`
            );
            router.refresh();
          } else {
            router.push("/orders");
            router.refresh();
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

      <select
        onChange={(e) => {
          setSearchType(e.target.value);
        }}
        value={searchType}
        className="w-full max-w-[240px] select bg-black-2"
      >
        <option value="" className="px-4 py-2 bg-black-2" disabled selected>
          Search Type
        </option>
        <option value="customer" className="px-4 py-2 bg-black-2">
          Customer
        </option>
        <option value="receiver" className="px-4 py-2 bg-black-2">
          Receiver
        </option>
        <option value="phone" className="px-4 py-2 bg-black-2">
          Phone
        </option>
      </select>
    </>
  );
}
