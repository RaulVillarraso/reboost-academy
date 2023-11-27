import api from './index.js'

export const getallBoocking = async () => {
  const { data } = await api.get('/booking')
  return data

}

export const getOneBooking = async (id) => {
  const { data } = await api.get(`booking/${id}`)
  return data

}


export const getClassroom = async (id) => {
  const data = await api.get(`booking/clase/classroom/${id}`)
  return data
}

export const postBooking = async (bookingData) => {
  const data = await api.post("/booking",bookingData)
  return data
}


export const deleteBooking = async (id) => {
  const data = await api.delete(`/booking/${id}`)
  return data
}

export const updateBooking = async (id,bookingData) => {
  const data = await api.put(`/booking/${id}`,bookingData)
 
  return data
}

