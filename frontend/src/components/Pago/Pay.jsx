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
    await handlePayment(stripe, elements);
  };

  return (
    <form onSubmit={handleSubmit}>
    
      <CardElement />
      <button type="submit">Pagar</button>
    </form>
  );
};


const stripePromise = loadStripe('pk_test_51OG1QQCXywJnPmP67inni0sCcd1DocJZaOJOnlhsMHKa9aAhnIsAjEbpWSusOFJWJjU5sEcWEgo8LDrZsUZryIlD002uLwEV1a');


const Pay = () => (
  <Elements stripe={stripePromise}>
   
    <MyCheckoutForm />
  </Elements>
);

export default Pay;