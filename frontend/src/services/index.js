import axios from "axios";

const api = axios.create({
    baseURL: "https://reboost-academy.onrender.com",
})

export default api