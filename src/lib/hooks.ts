import { useEffect, useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("access_token") ?? "");
  }, []);

  return token;
};
