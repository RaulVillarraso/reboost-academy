import api from "./";

export async function getAllSuscriptions(){
    const { data } = await api.get("/suscription",{headers: {
        authorization: localStorage.token,
    }})
    return data
}

export async function getSuscriptionById(id){
    const { data } = await api.get(`/suscription/${id}`,{headers: {
        authorization: localStorage.token,
    }})
    return data
}

export async function updateSuscription(id, body){
    const { data } = await api.put(`/suscription/${id}`, body,{headers: {
        authorization: localStorage.token,
    }})
    return data
}

export async function postSuscription(body){
    const { data } = await api.post("/suscription", body,{headers: {
        authorization: localStorage.token,
    }})
    return data
}

export async function deleteSuscription(id){
    const { data } = await api.delete(`/suscription/${id}`,{headers: {
        authorization: localStorage.token,
    }})
    return data
}