import api from "./";

export async function getAllSuscriptions(){
    const { data } = await api.get("/suscription")
    return data
}

export async function updateSuscription(id){
    const { data } = await api.post(`/suscription/${id}`)
    return data
}