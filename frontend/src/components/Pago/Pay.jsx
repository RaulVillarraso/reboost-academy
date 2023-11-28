import { useState } from 'react';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const handlePayment = async (stripe, elements) => {
  
  const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
      
    },
  });

 
  if (error) {
    console.error('Error al confirmar el pago:', error);
  } else if (paymentIntent && paymentIntent.status === 'succeeded') {
    console.log('Pago realizado con éxito:', paymentIntent);
    
  }
};

// Componente de React que utiliza Elements y CardElement de Stripe
const MyCheckoutForm = () => {
    const [clientSecret, setClientSecret] = useState()
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fetchedClientSecret = await fetchClientSecret();
    setClientSecret(fetchedClientSecret);

    // Llama a la función para manejar el pago
    await handlePayment(stripe, elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Componente de Stripe para ingresar los detalles de la tarjeta */}
      <CardElement />
      <button type="submit">Pagar</button>
    </form>
  );
};

// Carga la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51OG1QQCXywJnPmP67inni0sCcd1DocJZaOJOnlhsMHKa9aAhnIsAjEbpWSusOFJWJjU5sEcWEgo8LDrZsUZryIlD002uLwEV1a');


const Pay = () => (
  <Elements stripe={stripePromise}>
    {/* Componente que contiene el formulario de pago */}
    <MyCheckoutForm />
  </Elements>
);

export default Pay;