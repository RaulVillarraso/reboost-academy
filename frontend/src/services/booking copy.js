import api from './config.js'

export const getallBoocking = async () => {
  const { data } = await api.get('/booking')
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
  console.log(id,bookingData)
  return data
}