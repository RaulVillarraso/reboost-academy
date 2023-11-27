
import dayjs from 'dayjs';
import { getallBoocking, updateBooking } from "../../services/booking";
import { useEffect, useState } from "react";


export function convertirFecha(fechaStr) {
  const fechaOrigen = dayjs(fechaStr);
  const fechaDestino = fechaOrigen.format("YYYY-MM-DDTHH:mm");
   
   
  

  return fechaDestino;
}

export function convertirFechaInversa(fechaStr) {
  const fechaDestino = dayjs(fechaStr);
  const fechaOrigen = fechaDestino.format("DD-MM-YYYY HH:mm:ss");

  return fechaOrigen;
}

export async function handlebooking() {
  const response = await getallBoocking();

 const book = response.map((event) => {
    const id = event.id;
    const start = convertirFecha(event.start);
    const end = convertirFecha(event.end);
    const title = event.title;
const className = event.clase;


    return {
      className,
      end,
      id,
      start,
      title
    };

  });
  

  return book;
}


