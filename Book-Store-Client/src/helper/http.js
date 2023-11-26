import axios from "axios";

const token = localStorage.getItem("token");

// const defaultOption = {};
var instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  headers: {
    common: {
      Authorization: "Bearer " + (token !== null ? token : ""),
    },
    // "Content-Type": "application/json",
    // Accept: "application/json",
  },
});

export const setToken = (token) => {
  localStorage.setItem("token", token);
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export const setContentType = (contentType) => {
  instance.defaults.headers["Content-Type"] = contentType;
  instance.defaults.headers.Accept = contentType;
};

export default instance;
