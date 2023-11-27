import api from "./index";

export const getAllTeachers = async () => {
    const { data } = await api.get("/teacher")
    return data
}
