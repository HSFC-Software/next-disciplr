import api from "axios";
import nookies, { parseCookies } from "nookies";

const functions = api.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const key = process.env.NEXT_PUBLIC_SUPABASE_KEY;

functions.interceptors.request.use(
  (config) => {
    const cookie = parseCookies();
    const token = cookie.token;

    config.headers.Authorization = `Bearer ${key}`;

    if (token) {
      config.headers["X-Authorization-Key"] = token;
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
      const recentPage = window.location.href;
      window.location.href = `/sign-in?token=expired&redirect_uri=${recentPage}`;
    }
  }
);

export default functions;
