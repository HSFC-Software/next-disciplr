import { ReactNode, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";

export default function Auth({ children }: { children?: ReactNode }) {
  useEffect(() => {
    const cookie = parseCookies();
    let token = cookie.token;

    if (!token) {
      destroyCookie(null, "token");
      window.location.href = `/sign-in?next=${window.location.href}`;
    }
  }, []);

  return <>{children}</>;
}
