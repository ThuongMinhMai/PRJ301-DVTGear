"use client";

import { GlobalProvider } from "@/contexts/GlobalConext";
import { GoogleOAuthProvider } from "@react-oauth/google";

type Props = { children: React.ReactNode };

export default function Providers({ children }: Props) {
  return (
    <GoogleOAuthProvider clientId="834117377959-0aabfn4t7gui4au7aopki3c10h9rsa53.apps.googleusercontent.com">
      <GlobalProvider>{children}</GlobalProvider>
    </GoogleOAuthProvider>
  );
}
