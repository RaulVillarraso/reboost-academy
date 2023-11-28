import api from "./index";

export const getAllSuscriptions = async () => {
    const { data } = await api.get("/suscription", {
        headers: {
            authorization: localStorage.token,
        },
    })
    return data
}
