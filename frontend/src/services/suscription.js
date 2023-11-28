import api from "./index";

export const getAllSuscriptions = async () => {
    const { data } = await api.get("/suscription")
    return data
}

export const getPay = (async () => {
    const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret);
    if (error) {
      "Denied payment"
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      "Payment accepted"
    }
  })();
  
