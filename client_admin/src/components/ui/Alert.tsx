"use client";

import AlertIcon from "@/components/ui/AlertIcon";
import { useAlertStore } from "@/store";
import clsx from "clsx";
import React from "react";

const styles = {
  info: "text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800",
  success: "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800",
  failure:
    "text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800",
};

export default function Alert() {
  const showAlert = useAlertStore();

  return (
    <>
      {showAlert?.status && (
        <div className="absolute left-0 right-0 z-[999] flex items-center justify-center top-5">
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
