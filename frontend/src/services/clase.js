import api from "./index";

export const getAllClases = async () => {
    const { data } = await api.get("/clase", {
        headers: {
            authorization: localStorage.token,
        },
    })
    return data
}
