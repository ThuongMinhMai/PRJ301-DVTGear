import Image from "next/image";
import Alert from "./Alert";
import GoogleLoginBtn from "./GoogleLoginBtn";

type Props = {};

export default function AuthAdmin({}: Props) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="flex items-center justify-center w-full h-full">
        <video
          className="object-fill w-full h-full"
          src="/videoBg.mp4"
          autoPlay
          loop
          muted
        />
      </div>
      <div className="absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Image
          alt="logo"
          height={64}
          width={154}
          src="/logo3.png"
          className="mb-4"
        />
        <GoogleLoginBtn />
      </div>
    </div>
  );
}
