import React, { useRef, useEffect, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "./Calendar.css";
import listPlugin from "@fullcalendar/list";
import {
  convertirFecha,
  convertirFechaInversa,
  handlebooking,
} from "../BookingDate/BookingDate";
import { deleteBooking, postBooking, updateBooking } from "../../services/booking";
import MultiActionAreaCard from "../Card/Card";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";

import timeGridPlugin from "@fullcalendar/timegrid";

const MyCalendar = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dataeventen, setDataEventen] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [clickedDate, setClickedDate] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState(null);
  const [eventClassName, setEventClassName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [refresh2, setRefresh2] = useState(false);
  const [showinput, setshowinput] = useState("");
  const [nameEvent, setNameEvent] = useState("");
  const [dateStartEvent, setDateStartEvent] = useState("");
  const [dateEndEvent, setDateEndEvent] = useState("");
  const [buscador, setbuscador] = useState("");
  const [classNameEvent, setClassNameEvent] = useState("");
  const [id, setid] = useState("");
  const [updatedata, setupdatedata] = useState(false);
  const [refresh3, setRefresh3] = useState(false);
  const [refresh4, setRefresh4] = useState(false);
  const calendarRef = useRef(null);

console.log(startDateTime)
  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };
  
  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };
  
  const handleDelete = () => {
    // Lógica para eliminar el evento
    setRefresh4(!refresh4)
  
    // Cierra la ventana de confirmación después de la eliminación
   
  };
  


  const handleApiInfo = async () => {
    const Apivalues = await handlebooking();

    setDataEventen(Apivalues);
  };

  async function PostApiInfo() {
    const index = dataeventen.length;
    const lastEvent = dataeventen[index - 1];
    console.log(lastEvent);
    const response = await postBooking(lastEvent);
    setRefresh2(!refresh2);
  }
  console.log(id);

  async function UpdateApiInfo() {
    if (eventTitle && startDateTime && endDateTime) {
      const newEvent = {
        title: eventTitle,
        start: startDateTime,
        end: endDateTime,
        clase: eventClassName,
      };
      setupdatedata(newEvent);
     
      // Limpiar campos después de agregar el evento
      setEventTitle("");
      setStartDateTime(null);
      setEndDateTime(null);
      setEventClassName("");
       setRefresh3(!refresh3);
    }
  }

  async function UpdateSend() {
    
    const response = await updateBooking(id, updatedata);
    setRefresh2(!refresh2);
  }

  async function Delete() {
    setRefresh4(!refresh4);
   
  }

  async function SendDelete() {
    
    const response = await deleteBooking(id);
    setRefresh4(false);
    setRefresh2(!refresh2);
  }


  useEffect(() => {
    async function getdata() {
      await handleApiInfo();
      filterEventsByClassName();
    }

    getdata();
  }, [refresh2]);

  useEffect(() => {
    if (refresh) {
      PostApiInfo();
      setRefresh(false);
    }
    if (refresh3) {
      UpdateSend();
      handleApiInfo();
      setRefresh3(false);
    }
if (refresh4) {
  setConfirmDelete(false);
  SendDelete();
}

  }, [refresh || refresh3 || refresh4]);

  const refreshfilter = () => {
    setRefresh2(!refresh2);
  };

  const prueba = () => {
    if (!buscador || buscador.length === 0) {
      return dataeventen;
    } else {
      return dataeventen.filter((event) => event.className === buscador);
      /* const filteredEvents = dataeventen.filter(event =>
        event.className.toLowerCase().includes(buscador)
      ); */
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = new Calendar(calendarRef.current, {
        plugins: [
          bootstrap5Plugin,
          dayGridPlugin,
          interactionPlugin,
          listPlugin,
        ],
        customButtons: {
          myCustomButton: {
            text: "custom!",
            click: function () {
              alert("clicked the custom button!");
            },
          },
        },
        themeSystem: "bootstrap5",
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "prev,next,today,myCustomButton",
          center: "title",
          right: "dayGridMonth,listWeek",
        },
        editable: true,
        selectable: true,
        eventLimit: true, // If you set a number it will hide the itens
        views: {
          dayGridMonth: {
            eventLimit: true // adjust to 6 only for timeGridWeek/timeGridDay
          }},
        eventLimitText: "More" ,
        weekends: false,
        events: prueba(),
        eventColor: "green",
        
        eventClick: evento,
        dateClick: handleDateClick,
      });
      calendar.render();
    }
  }, [dataeventen]);

  const handleDateClick = (arg) => {
    setshowinput("true");
    setClickedDate(arg.dateStr);
    Yeray()
    const offCanvas = new bootstrap.Offcanvas(
      document.getElementById("offcanvasWithBothOptions")
    );
    offCanvas.show();
  };
console.log(startDateTime)
  function Yeray () {
    setStartDateTime(`${clickedDate}T00:00`)
    
  }

  const evento = (arg) => {
    setshowinput("false");
    const offCanvas = new bootstrap.Offcanvas(
      document.getElementById("offcanvasWithBothOptions")
    );
    offCanvas.show();
    const start = convertirFechaInversa(
      arg.el.fcSeg.eventRange.instance.range.start
    );
    const end = convertirFechaInversa(
      arg.el.fcSeg.eventRange.instance.range.end
    );
    const title = arg.el.fcSeg.eventRange.def.title.toUpperCase();
    const className =
      arg.el.fcSeg.eventRange.def.ui.classNames[0].toUpperCase();
    const id = arg.el.fcSeg.eventRange.def.publicId;

    setid(id);
    setClassNameEvent(className);
    setNameEvent(title);
    setDateStartEvent(start);
    setDateEndEvent(end);
  };

  const handleAddEvent = () => {
    if (eventTitle && startDateTime && endDateTime) {
      const newEvent = {
        title: eventTitle,
        start: startDateTime,
        end: endDateTime,
        clase: eventClassName,
      };
      setDataEventen([...dataeventen, newEvent]);

      // Limpiar campos después de agregar el evento
      setEventTitle("");
      setStartDateTime(null);
      setEndDateTime(null);
      setEventClassName("");
      setRefresh(true);
    }
  };

  return (
    <div>
      <div>
        <br />
<div id="boton">
        <Select
          label="Clase del evento"
          value={buscador}
          onChange={(e) => setbuscador(e.target.value)}
        >
          <MenuItem onClick={refreshfilter} value="pilates">
            Pilates
          </MenuItem>
          <MenuItem onClick={refreshfilter} value="yoga">
            Yoga
          </MenuItem>
          <MenuItem onClick={refreshfilter} value="ciclo_indoor">
            Ciclo Indoor
          </MenuItem>
          <MenuItem onClick={refreshfilter} value="bodypump">
            Body Pump
          </MenuItem>
          <MenuItem onClick={refreshfilter} value="bodycombat">
            Body Combat
          </MenuItem>
          <MenuItem onClick={refreshfilter} value="bodybalance">
            Body Balance
          </MenuItem>
          <MenuItem onClick={refreshfilter} value="bailes_salon">
            Bailes De Salón
          </MenuItem>
          <MenuItem onClick={refreshfilter} value="bailes_latinos">
            Bailes Latinos
          </MenuItem>
          <MenuItem onClick={refreshfilter} value="">
            Todo
          </MenuItem>
        </Select>
        </div>
        <div ref={calendarRef} />
      </div>

      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header">
          <h2 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
        REBBOST ACADEMY 
          </h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          {showinput === "true" && clickedDate && (
            <div>
              <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Ajusta esto según tus necesidades
    paddingBottom:"15vh"
  }}
>
              <Grid container spacing={0}>
              <Grid item sm={12}>
                <img src="" alt="" />
              </Grid>

                <Grid item sm={12}>
                  

                  <TextField
                   size="small"
                    label="Título del evento"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </Grid>

                <Grid item sm={12}>
                  <br />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                   size="small"
                    label=""
                    type="datetime-local"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                  />
                </Grid>
                <Grid item sm={12}>
                <br />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                   size="small"
                    type="datetime-local"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                  />
                </Grid>
                 
                <Grid item sm={12}> 
                <br />
                  <Select
                    label="Clase del evento"
                    value={eventClassName}
                    onChange={(e) => setEventClassName(e.target.value)}
                  >
                    <MenuItem value="">Sin clase</MenuItem>
                    <MenuItem value="pilates">Pilates</MenuItem>
                    <MenuItem value="yoga">Yoga</MenuItem>
                    <MenuItem value="ciclo_indoor">Ciclo Indoor</MenuItem>
                    <MenuItem value="bodypump">Body Pump</MenuItem>
                    <MenuItem value="bodycombat">Body Combat</MenuItem>
                    <MenuItem value="bodybalance">Body Baance</MenuItem>
                    <MenuItem value="bailes_salon">Bailes De Salón</MenuItem>
                    <MenuItem value="bailes_latinos">Bailes Latinos</MenuItem>
                  </Select>
                </Grid>
                <Grid item sm={12}>
                <br />
                  <Button variant="contained" onClick={handleAddEvent}>
                    Agregar Evento
                  </Button>
                </Grid>
              </Grid>
              </Box>
            </div>
          )}

          {showinput === "false" && (
            <div>
              <Grid container spacing={1}>
                <Grid item sm={12}>
                  <MultiActionAreaCard
                    nameEvent={nameEvent}
                    dateStartEvent={dateStartEvent}
                    dateEndEvent={dateEndEvent}
                    classNameEvent={classNameEvent}
                  />
                  <br />
                  <h3>Editar Evento</h3>
                 
                </Grid>
                <Grid item sm={7}>
                  <TextField
                    sx={{ width: "75%" }}
                    label="Titulo"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    size="small"
                  />
                </Grid>

                <Grid item sm={5}>
                  <Select
                    label="Clase del evento"
                    value={eventClassName}
                    onChange={(e) => setEventClassName(e.target.value)}
                  >
                    <MenuItem value="">Sin clase</MenuItem>
                    <MenuItem value="pilates">Pilates</MenuItem>
                    <MenuItem value="yoga">Yoga</MenuItem>
                    <MenuItem value="ciclo_indoor">Ciclo Indoor</MenuItem>
                    <MenuItem value="bodypump">Body Pump</MenuItem>
                    <MenuItem value="bodycombat">Body Combat</MenuItem>
                    <MenuItem value="bodybalance">Body Baance</MenuItem>
                    <MenuItem value="bailes_salon">Bailes De Salón</MenuItem>
                    <MenuItem value="bailes_latinos">Bailes Latinos</MenuItem>
                  </Select>
                </Grid>

                <Grid item sm={7}>
                  <TextField
                    sx={{ width: "75%" }}
                    size="small"
                    label=""
                    type="datetime-local"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                  />
                </Grid>
                <br />
                <Grid item sm={7}>
                  <TextField
                    sx={{ width: "75%" }}
                    size="small"
                    type="datetime-local"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                  />
                </Grid>

                <Grid item sm={12}><br />
                  <Button variant="contained" onClick={UpdateApiInfo}>
                    Editar Evento
                  </Button>
                </Grid>

                <Grid item sm={12}>
                  <Button variant="contained"  sx={{ bgcolor: 'error.main' }} onClick={handleConfirmDelete}>
                    Eliminar Evento
                  </Button>
                </Grid>

                <Dialog
  open={confirmDelete}
  onClose={handleCancelDelete}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"¿Estás seguro de que quieres eliminar este evento?"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Esta acción no se puede deshacer.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCancelDelete} autoFocus>
      Cancelar
    </Button>
    <Button onClick={handleDelete} variant="contained" sx={{ bgcolor: 'error.main' }}>
      Sí, eliminar
    </Button>
  </DialogActions>
</Dialog>

              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
