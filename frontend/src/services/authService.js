import api from ".";

export async function signup(signupData){
    const { data } = await api.post('/auth/signup', signupData)
    return data
}

