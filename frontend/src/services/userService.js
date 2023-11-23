import api from "./";

export async function getUserProfile(){
    const { data } = await api.get(`/user/profile`)
    return data
}

export async function getUserBookings(id){
    const { data } = await api.get(`/user/booking/${id}`)
    return data
}

export async function getUserSuscription(){
    const { data } = await api.get("/user/suscription")
    return data
}

export async function updateUser(id, dataUpdate){
    const { data } = await api.put(`/user/${id}`, dataUpdate)
    return data
}