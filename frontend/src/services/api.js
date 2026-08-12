import axios from "axios";

const api = axios.create({
    baseURL: "https://visitor-pass-management-system-wlfz.onrender.com"
});

export default api;