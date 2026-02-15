import axios from "axios";

const API = axios.create({
  baseURL: "https://attendance-management-system-31ku.onrender.com/api",
});

export default API;
