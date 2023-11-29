import React from 'react'
import MyCalendar from "../../components/Calendar/Calendar"
import "./Calendar.css"
import Header from '../Home/Header/Header'
import { Grid } from '@mui/material'
import Footer from '../../components/footer/Footer'

function Calendar() {
  return (
    <div>
   
    <div id='mycalendar'>
      
      <Header/>
      <div id="position"><MyCalendar/></div>
      
      
      </div> 

    </div>
  )
}

export default Calendar