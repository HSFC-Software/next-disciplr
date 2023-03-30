import { useGetProfileFromToken } from "@/lib/queries";
import { useEffect, useState } from "react";
import { setCookie } from "nookies";

export default function Auth() {
  const [token, setToken] = useState("");
  const { data } = useGetProfileFromToken(token);

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.hash));
    setToken(params["#access_token"]);
    setCookie(null, "token", params["#access_token"], {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }, []);
  if (data) {
    // authenticated
    window.location.href = "/networks";
  }

  if (data === null) {
    // unauthorized
    window.location.href = "/sign-in";
  }

  return null;
}
