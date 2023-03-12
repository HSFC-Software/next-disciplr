import { ReactNode, useEffect } from "react";

export default function Auth({ children }: { children?: ReactNode }) {
  useEffect(() => {
    let token = localStorage.getItem("access_token") ?? "";

    if (!token) {
      window.location.href = "/sign-in";
    }
  }, []);

  return <>{children}</>;
}
