import clsx from "clsx";
import React from "react";

const styles = {
  info: "text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800",
  success: "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800",
  failure:
    "text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800",
};

type Props = {
  type: AlertType;
};

const AlertIcon = ({type}: Props) => {
  return (
    <svg
      style={{
        //tailwind không custom được chỗ này, nên dùng inline style
        width: "24px",
        height: "24px",
      }}
      aria-hidden="true"
      className={clsx("flex-shrink-0 inline mr-2", styles[type])}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default AlertIcon;
