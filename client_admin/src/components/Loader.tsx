import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="mx-auto">
      <div className="w-36 h-36 flex justify-center items-center">
        <ClipLoader color="#ea1c00" />
      </div>
    </div>
  );
}
