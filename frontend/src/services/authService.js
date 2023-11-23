import api from "./";

export async function signup(signupData){
    const { data } = await api.post('/auth/signup', signupData)
    return data
}

export async function login(loginData){
    const { data } = await api.post('/auth/login', loginData)
    return data
}

