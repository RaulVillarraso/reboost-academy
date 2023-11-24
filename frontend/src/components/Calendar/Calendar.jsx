import React, { useRef, useEffect, useState } from "react"
import { Calendar } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import bootstrap5Plugin from "@fullcalendar/bootstrap5"
import "./Calendar.css"
import listPlugin from "@fullcalendar/list"
import { Link, useNavigate } from "react-router-dom"
import {
    convertirFecha,
    convertirFechaInversa,
    handlebooking,
} from "../BookingDate/BookingDate"
import {
    deleteBooking,
    getClassroomCapacity,
    postBooking,
    updateBooking,
} from "../../services/booking"
import MultiActionAreaCard from "../Card/Card"
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"
import { login } from "../../services/authService"


const MyCalendar = () => {
    const calendarRef2 = useRef(null)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [eventid, setEventid] = useState("")
    const [dataeventen, setDataEventen] = useState([])
    const [filterdata, setFilterdata] = useState([])
    const [clickedDate, setClickedDate] = useState("")
    const [eventTitle, setEventTitle] = useState("")
    const [startDateTime, setStartDateTime] = useState("")
    const [endDateTime, setEndDateTime] = useState(null)
    const [eventClassName, setEventClassName] = useState("")
    const [refresh, setRefresh] = useState(false)
    const [refresh2, setRefresh2] = useState(false)
    const [showinput, setshowinput] = useState("")
    const [nameEvent, setNameEvent] = useState("")
    const [dateStartEvent, setDateStartEvent] = useState("")
    const [dateEndEvent, setDateEndEvent] = useState("")
    const [buscador, setbuscador] = useState("")
    const [classNameEvent, setClassNameEvent] = useState("")
    const [id, setid] = useState("")
    const [updatedata, setupdatedata] = useState(false)
    const [refresh3, setRefresh3] = useState(false)
    const [refresh4, setRefresh4] = useState(false)
    const [refresh5, setRefresh5] = useState(false)
    const [classroomCapacity, setclassroomCapacity] = useState("")
    const [classroomTarget, setclassroomTarget] = useState("")
    const calendarRef = useRef(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const selectedOption = e.target.value
        setEventClassName(selectedOption.value)
        setEventid(selectedOption.value2)
    }

    const options = [
        { label: "Sin clase", value: "", value2: "" },
        { label: "Pilates", value: "pilates", value2: "2" },
        { label: "Yoga", value: "yoga", value2: "1" },
        { label: "Ciclo Indoor", value: "ciclo_indoor", value2: "3" },
        { label: "Body Pump", value: "bodypump", value2: "4" },
        { label: "Body Combat", value: "bodycombat", value2: "5" },
        { label: "Body Balance", value: "bodybalance", value2: "6" },
        { label: "Bailes De Salón", value: "bailes_salon", value2: "7" },
        { label: "Bailes Latinos", value: "bailes_latinos", value2: "8" },
    ]

    const handleConfirmDelete = () => {
        setConfirmDelete(true)
    }

    const handleCancelDelete = () => {
        setConfirmDelete(false)
    }

    const handleDelete = () => {
        // Lógica para eliminar el evento
        setRefresh4(!refresh4)

        // Cierra la ventana de confirmación después de la eliminación
    }

    async function onLogin() {
        try {
            const response = await login({ email, password })
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("role", response.data.role)
            navigate("/home")
        } catch (error) {
            //Handle the error
        }
    }

    const handleApiInfo = async () => {
        const Apivalues = await handlebooking()

        setDataEventen(Apivalues)
    }

    const handleApiClassrooms = async () => {
        const Apivalues = await getClassroomCapacity(id)
        setclassroomCapacity(Apivalues.data.booking.class.classroom.capacity)
        setclassroomTarget(Apivalues.data.booking.class.classroom.targeted)
        console.log(Apivalues.data.booking.class.classroom.capacity)
    }

  

    async function PostApiInfo() {
        const index = dataeventen.length
        const lastEvent = dataeventen[index - 1]
        console.log(lastEvent)
        const response = await postBooking(lastEvent)
        setRefresh2(!refresh2)
    }
    

    async function UpdateApiInfo() {
    
        if (eventTitle && startDateTime && endDateTime) {
            const newEvent = {
                classId: eventid,
                title: eventTitle,
                start: startDateTime,
                end: endDateTime,
                clase: eventClassName,
            }
            setupdatedata(newEvent)

            // Limpiar campos después de agregar el evento
            setEventTitle("")
            setStartDateTime(null)
            setEndDateTime(null)
            setEventClassName("")
            setRefresh3(!refresh3)
        }
    }

    
    async function UpdateSend() {
        const response = await updateBooking(id, updatedata)
        setRefresh2(!refresh2)
    }

    async function Delete() {
        setRefresh4(!refresh4)
    }

    async function SendDelete() {
        const response = await deleteBooking(id)
        setRefresh4(false)
        setRefresh2(!refresh2)
    }

    useEffect(() => {
        async function getdata() {
            await handleApiInfo()
            filterEventsByClassName()
        }

        getdata()
    }, [refresh2])

    useEffect(() => {
        if (refresh) {
            PostApiInfo()
            setRefresh(false)
        }
        if (refresh3) {
            UpdateSend()
            handleApiInfo()
            handleApiClassrooms()
            setRefresh3(false)
        }
        if (refresh4) {
            setConfirmDelete(false)
            SendDelete()
        }
        if (refresh5) {
            handleApiInfo()
            setRefresh5(false)
        }
    }, [refresh || refresh3 || refresh4 || refresh5])

    const refreshfilter2 = () => {
        setRefresh5(!refresh5)
    }

    const refreshfilter = () => {
        setRefresh2(!refresh2)
    }

    const prueba = () => {
        if (!buscador || buscador.length === 0) {
            return dataeventen
        } else {
            return dataeventen.filter((event) => event.className === buscador)
            /* const filteredEvents = dataeventen.filter(event =>
        event.className.toLowerCase().includes(buscador)
      ); */
        }
    }
    useEffect(() => {
        if (calendarRef2.current) {
            const calendar2 = new Calendar(calendarRef2.current, {
                plugins: [
                    bootstrap5Plugin,
                    dayGridPlugin,
                    interactionPlugin,
                    listPlugin,
                ],

                themeSystem: "bootstrap5",
                initialView: "listDay",
                headerToolbar: {
                    left: "prev,next",
                    center: "title",
                    right: "",
                },
                initialDate: clickedDate,
                weekends: false,
                events: prueba(),
                eventColor: "green",

                eventClick: evento,
                dateClick: handleDateClick,
            })

            calendar2.render()
        }
    }, [dataeventen || refresh5])

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
                            alert("clicked the custom button!")
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
                        eventLimit: true, // adjust to 6 only for timeGridWeek/timeGridDay
                    },
                },
                eventLimitText: "More",
                weekends: false,
                events: prueba(),
                eventColor: "green",

                eventClick: evento,
                dateClick: handleDateClick,
            })
            calendar.render()
        }
    }, [dataeventen])

    const handleDateClick = (arg) => {
        setRefresh5(!refresh5)
        setshowinput("true")
        setClickedDate(arg.dateStr)
        const date = convertirFecha(arg.dateStr)
        setClickedDate(date)
        const offCanvas = new bootstrap.Offcanvas(
            document.getElementById("offcanvasWithBothOptions")
        )
        offCanvas.show()
    }
    

    const evento = (arg) => {
      setRefresh3(true)
        setshowinput("false")
        const offCanvas = new bootstrap.Offcanvas(
            document.getElementById("offcanvasWithBothOptions")
        )
        offCanvas.show()
        const start = convertirFechaInversa(
            arg.el.fcSeg.eventRange.instance.range.start
        )
        const end = convertirFechaInversa(
            arg.el.fcSeg.eventRange.instance.range.end
        )
        const title = arg.el.fcSeg.eventRange.def.title.toUpperCase()
        const className =
            arg.el.fcSeg.eventRange.def.ui.classNames[0].toUpperCase()
        const id = arg.el.fcSeg.eventRange.def.publicId

        setid(id)
        setClassNameEvent(className)
        setNameEvent(title)
        setDateStartEvent(start)
        setDateEndEvent(end)
        
    }

    const handleAddEvent = () => {
        if (eventTitle && startDateTime && endDateTime) {
            const newEvent = {
                classId: eventid,
                title: eventTitle,
                start: startDateTime,
                end: endDateTime,
                clase: eventClassName,
            }
            setDataEventen([...dataeventen, newEvent])

            // Limpiar campos después de agregar el evento
            setEventTitle("")
            setStartDateTime(null)
            setEndDateTime(null)
            setEventClassName("")
            setRefresh(true)
        }
    }

    return (
        <div id="center">
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
                        <MenuItem
                            onClick={refreshfilter}
                            value="bailes_latinos"
                        >
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
                    <h2
                        class="offcanvas-title"
                        id="offcanvasWithBothOptionsLabel"
                    >
                        REBOOST ACADEMY
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
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100vh",
                                    paddingBottom: "15vh",
                                }}
                            >
                                {localStorage.getItem("rol") === "Client" && (
                                    <div id="calendar2" ref={calendarRef2} />
                                )}

                                <Grid container spacing={0}>
                                    <Grid item sm={12}>
                                        <img src="" alt="" />
                                    </Grid>
                                    {localStorage.getItem("rol") ===
                                        "Admin" && (
                                        <Grid item sm={12}>
                                            <TextField
                                                sx={{ paddingBottom: 2 }}
                                                size="small"
                                                label="Título del evento"
                                                value={eventTitle}
                                                onChange={(e) =>
                                                    setEventTitle(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                    )}

                                    <br />
                                    {localStorage.getItem("rol") ===
                                        "Admin" && (
                                        <Grid item sm={12}>
                                            <TextField
                                                sx={{ paddingBottom: 2 }}
                                                size="small"
                                                label=""
                                                type="datetime-local"
                                                value={startDateTime}
                                                onChange={(e) =>
                                                    setStartDateTime(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                    )}

                                    <br />
                                    {localStorage.getItem("rol") ===
                                        "Admin" && (
                                        <Grid item sm={12}>
                                            <TextField
                                                size="small"
                                                type="datetime-local"
                                                value={endDateTime}
                                                onChange={(e) =>
                                                    setEndDateTime(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Grid>
                                    )}

                                    {localStorage.getItem("rol") ===
                                        "Admin" && (
                                        <Grid item sm={12}>
                                            <br />

                                            <Select
                                                label="Clase del evento"
                                                value={eventClassName}
                                                onChange={handleChange}
                                            >
                                                {options.map((option) => (
                                                    <MenuItem
                                                        key={option.value}
                                                        value={option}
                                                    >
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Grid>
                                    )}
                                    {localStorage.getItem("rol") ===
                                        "Admin" && (
                                        <Grid item sm={12}>
                                            <br />
                                            <Button
                                                variant="contained"
                                                onClick={handleAddEvent}
                                            >
                                                Agregar Evento
                                            </Button>
                                        </Grid>
                                    )}
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
                                </Grid>
                                {localStorage.getItem("rol") === "Admin" && (
                                    <Grid item sm={12}>
                                        <h3>Editar Evento</h3>
                                    </Grid>
                                )}

                                {localStorage.getItem("rol") === "Admin" && (
                                    <Grid item sm={7}>
                                        <TextField
                                            sx={{ width: "75%" }}
                                            label="Titulo"
                                            value={eventTitle}
                                            onChange={(e) =>
                                                setEventTitle(e.target.value)
                                            }
                                            size="small"
                                        />
                                    </Grid>
                                )}
                                {localStorage.getItem("rol") === "Admin" && (
                                    <Grid item sm={5}>
                                        <Select
                                            label="Clase del evento"
                                            value={eventClassName}
                                            onChange={handleChange}
                                        >
                                            {options.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                )}
                                {localStorage.getItem("rol") === "Admin" && (
                                    <Grid item sm={7}>
                                        <TextField
                                            sx={{ width: "75%" }}
                                            size="small"
                                            label=""
                                            type="datetime-local"
                                            value={startDateTime}
                                            onChange={(e) =>
                                                setStartDateTime(e.target.value)
                                            }
                                        />
                                    </Grid>
                                )}
                                <br />
                                {localStorage.getItem("rol") === "Admin" && (
                                    <Grid item sm={7}>
                                        <TextField
                                            sx={{ width: "75%" }}
                                            size="small"
                                            type="datetime-local"
                                            value={endDateTime}
                                            onChange={(e) =>
                                                setEndDateTime(e.target.value)
                                            }
                                        />
                                    </Grid>
                                )}
                                {localStorage.getItem("rol") === "Admin" && (
                                    <Grid item sm={12}>
                                        <br />

                                        <Button
                                            variant="contained"
                                            onClick={UpdateApiInfo}
                                        >
                                            Editar Evento
                                        </Button>
                                    </Grid>
                                )}
                                {localStorage.getItem("rol") === "Admin" && (
                                    <Grid item sm={12}>
                                        <Button
                                            variant="contained"
                                            sx={{ bgcolor: "error.main" }}
                                            onClick={handleConfirmDelete}
                                        >
                                            Eliminar Evento
                                        </Button>
                                    </Grid>
                                )}
                                {localStorage.getItem("rol") === "Client" && (
                                    <Grid item sm={12}>
                                        <Typography>
                                            {classroomTarget}/
                                            {classroomCapacity}
                                        </Typography>
                                    </Grid>
                                )}
                                {localStorage.getItem("rol") === "Client" && (
                                    <Grid item sm={12}>
                                        <Button
                                            variant="contained"
                                            sx={{}}
                                            onClick={handleConfirmDelete}
                                        >
                                            Apuntarse a la clase
                                        </Button>
                                    </Grid>
                                )}

                                <Dialog
                                    open={confirmDelete}
                                    onClose={handleCancelDelete}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {
                                            "¿Estás seguro de que quieres eliminar este evento?"
                                        }
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Esta acción no se puede deshacer.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={handleCancelDelete}
                                            autoFocus
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            onClick={handleDelete}
                                            variant="contained"
                                            sx={{ bgcolor: "error.main" }}
                                        >
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
    )
}

export default MyCalendar
