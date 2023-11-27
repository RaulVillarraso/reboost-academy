import api from "./index";

export const getAllSuscriptions = async () => {
    const { data } = await api.get("/suscription")
    return data
}
