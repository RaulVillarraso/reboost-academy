import api from "./index";

export const getAllClases = async () => {
    const { data } = await api.get("/clase")
    return data
}
