import api from "./";

export async function getTeachers(){
    const { data } = await api.get("/teacher")
    return data
}

export async function getTeacher(id){
    const { data } = await api.get(`/teacher/${id}`)
    return data
}

export async function postTeacher(body){
    const { data } = await api.post("/teacher", body)
    return data
}

export async function updateTeacher(id, body){
    const { data } = await api.put(`/teacher/${id}`, body)
    return data
}

export async function deleteTeacher(id){
    const { data } = await api.delete(`/teacher/${id}`)
    return data
}