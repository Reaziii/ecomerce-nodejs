import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    authorization: localStorage.getItem("token"),
  },
});

export default client;