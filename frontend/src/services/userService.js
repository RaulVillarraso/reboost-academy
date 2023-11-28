import api from "./";

export async function getUserProfile(){
    const { data } = await api.get(`/user/profile`, {headers: {
        authorization: localStorage.token,
    }})
    return data
}

export async function getUserBookings(id){
    const { data } = await api.get(`/user/booking/${id}`, {headers: {
        authorization: localStorage.token,
    }})
    return data
}

export async function getUserSuscription(){
    const { data } = await api.get("/user/suscription", {headers: {
        authorization: localStorage.token,
    }})
    return data
}

export async function updateUser(id, dataUpdate){
    const { data } = await api.put(`/user/${id}`, dataUpdate, {headers: {
        authorization: localStorage.token,
    }})
    return data
}