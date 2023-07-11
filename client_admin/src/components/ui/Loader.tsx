import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="mx-auto">
      <div className="flex items-center justify-center w-36 h-36">
        <ClipLoader color="#ea1c00" />
      </div>
    </div>
  );
}
