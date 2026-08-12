import axios from "axios";

const api = axios.create({
    baseURL: "https://visitor-pass-management-system-wlfz.onrender.com/api"
});

export default api;