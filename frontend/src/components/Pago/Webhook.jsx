import React from 'react';
import axios from 'axios';

const DatosPago = () => {
  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:4242/webhook', {
        
        key: 'value',
      }, {
        headers: {
            'stripe-signature': 'sk_test_51OG1QQCXywJnPmP63zRMMO07fbuohg1bRIdI9VvAMhh2KO9CHFvpDPuyN1gqGXwainsQ6ThVzPs6ka94snGeO1nW00zZWd1ci4'
        }
      });

      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar la solicitud al webhook:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Enviar Webhook</button>
    </div>
  );
};

export default DatosPago;
