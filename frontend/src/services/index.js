import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {
        authorization: localStorage.token,
    },
})

export default api