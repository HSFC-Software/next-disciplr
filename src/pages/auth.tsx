import { useGetProfileFromToken } from "@/lib/queries";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Auth() {
  const [token, setToken] = useState("");
  const { data } = useGetProfileFromToken(token);

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.hash));
    setToken(params["#access_token"]);
  }, []);

  if (token) {
    localStorage.setItem("access_token", token);
  }

  if (data) {
    // authenticated
    window.location.href = "/";
  }

  if (data === null) {
    // unauthorized
    window.location.href = "/sign-in";
  }

  return null;
}
