import axios from "axios";

const api = axios.create({
    baseURL: "https://reboost-academy.onrender.com/api",
    //baseURL: "http://localhost:3000/api",
})

export default api