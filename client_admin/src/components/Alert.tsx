"use client";

import AlertIcon from "@/assets/AlertIcon";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { AlertType } from "@/utils/types";
import clsx from "clsx";
import React from "react";

const styles = {
  [AlertType.info]:
    "text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800",
  [AlertType.success]:
    "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800",
  [AlertType.failure]:
    "text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800",
};

export default function Alert() {
  const { showAlert } = useGlobalContext();

  return (
    <>
      {showAlert?.status && (
        <div className="absolute z-10 top-5 left-0 right-0 flex items-center justify-center">
          <div
            className={clsx(
              "p-4 rounded-lg font-rajdhani font-semibold text-lg flex items-center",
              styles[showAlert.type]
            )}
          >
            <AlertIcon type={showAlert.type} />
            {showAlert.message}
          </div>
        </div>
      )}
    </>
  );
}
