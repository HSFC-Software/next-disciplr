import api from "axios";

const functions = api.create({
  baseURL: "http://localhost:54321/functions/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
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
