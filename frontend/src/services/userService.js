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

export async function CreateUserBooking(booking){
    const { data } = await api.post(`user/userbooking`, booking, {
        headers: {
            authorization: localStorage.token,
        },
    })
    return data
}
export const getallUserBooking = async (id) => {
    const { data } = await api.get(`/user/userbooking/${id}`, {
        headers: {
            authorization: localStorage.token,
        },
    })
    return data
  
  }
  export async function DeleteUserBooking(booking) {
    try {
        const { data } = await api.delete(`user/userbooking/delete`, {
            headers: {
                authorization: localStorage.token,
            },
            data: {
                userId: booking.userId,
                bookingId: booking.bookingId,
            },
        });
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

