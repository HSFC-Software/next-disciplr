import api from "axios";

const functions = api.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer" + " " + process.env.NEXT_PUBLIC_API_URL,
  },
});

functions.interceptors.request.use(
  (config) => {
    if (localStorage) {
      const token = localStorage.getItem("access_token");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // TODO: handle errors
  }
);

export default functions;
