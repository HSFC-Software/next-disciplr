import api from "axios";
import nookies, { parseCookies } from "nookies";

const functions = api.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

functions.interceptors.request.use(
  (config) => {
    const cookie = parseCookies();
    const token = cookie.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // TODO: handle errors
  }
);

functions.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // redirect to sign-in page
      window.location.href = `/sign-in?token=expired&next=${window.location.href}`;
    }
  }
);

export default functions;
