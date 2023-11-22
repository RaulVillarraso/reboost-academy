import api from "./";

export async function getUserProfile(){
    const { data } = await api.get(`/user/profile`)
    return data
}