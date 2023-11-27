import api from "./";

export async function getAllSuscriptions(){
    const { data } = await api.get("/suscription")
    return data
}

export async function getSuscriptionById(id){
    const { data } = await api.get(`/suscription/${id}`)
    return data
}

export async function updateSuscription(id, body){
    const { data } = await api.put(`/suscription/${id}`, body)
    return data
}

export async function postSuscription(body){
    const { data } = await api.post("/suscription", body)
    return data
}

export async function deleteSuscription(id){
    const { data } = await api.delete(`/suscription/${id}`)
    return data
}