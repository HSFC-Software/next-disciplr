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

functions.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response.status);
    if (error.response.status === 401) {
      // redirect to sign-in page
      window.location.href = "/sign-in?token=expired";
    }
  }
);

export default functions;
