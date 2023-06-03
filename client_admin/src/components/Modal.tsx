"use client";

import { useGlobalContext } from "@/contexts/GlobalContext";
import React from "react";
import clsx from "clsx";

type Props = {};

export default function Modal({}: Props) {
  const { modal, setModal } = useGlobalContext();
  return (
    <div
      className={clsx(
        "absolute z-[999] inset-0 bg-black/70 flex justify-center items-center",
        !modal.display && "hidden"
      )}
    >
      <div className="bg-white rounded-xl w-fit max-w-[90%] p-4">
        <div className="text-xl font-medium">
          Are you sure you want to delete "{modal.message}"?
        </div>
        <div className="flex justify-end items-center gap-4 mt-6 text-dvt-item">
          <div
            onClick={() => {
              setModal({
                message: "",
                display: false,
                handleModal: () => {},
              });
              modal.handleModal();
            }}
            className="btn btn-primary"
          >
            Delete!
          </div>
          <div
            onClick={() => {
              setModal({
                message: "",
                display: false,
                handleModal: () => {},
              });
            }}
            className="btn btn-primary btn-outline"
          >
            Cancel!
          </div>
        </div>
      </div>
    </div>
  );
}
