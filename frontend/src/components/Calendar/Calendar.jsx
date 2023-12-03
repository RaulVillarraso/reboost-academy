import { useRef, useEffect, useState } from "react"
import { Calendar } from "@fullcalendar/core"
import logo from "../../assets/calendar/logo.png"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import bootstrap5Plugin from "@fullcalendar/bootstrap5"
import "./Calendar.css"
import listPlugin from "@fullcalendar/list"
import { Await, Link, useNavigate } from "react-router-dom"
import {
    convertirFecha,
    convertirFechaInversa,
    handlebooking,
} from "../BookingDate/BookingDate"
import {
    deleteBooking,
    getClassroom,
    getOneBooking,
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

import {
    CreateUserBooking,
    DeleteUserBooking,
    getUserProfile,
    getallUserBooking,
} from "../../services/userService"
import { bool } from "prop-types"
import { red } from "@mui/material/colors"
import Footer from "../footer/Footer"

const MyCalendar = () => {
    const calendarRef2 = useRef(null)

    const [showSelect, setShowSelect] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [eventid, setEventid] = useState("")
    const [dataeventen, setDataEventen] = useState([])
    const [clickedDate, setClickedDate] = useState("")
    const [eventTitle, setEventTitle] = useState("")
    const [startDateTime, setStartDateTime] = useState("")
    const [endDateTime, setEndDateTime] = useState(null)
    const [eventClassName, setEventClassName] = useState("Clase no seleccionada")
    const [refresh, setRefresh] = useState(false)
    const [refresh2, setRefresh2] = useState(false)
    const [showinput, setshowinput] = useState("")
    const [nameEvent, setNameEvent] = useState("")
    const [dateStartEvent, setDateStartEvent] = useState("")
    const [dateEndEvent, setDateEndEvent] = useState("")
    const [buscador, setbuscador] = useState("")
    const [classNameEvent, setClassNameEvent] = useState("")
    const [id, setid] = useState(null)
    const [updatedata, setupdatedata] = useState(false)
    const [refresh3, setRefresh3] = useState(false)
    const [refresh4, setRefresh4] = useState(false)
    const [refresh5, setRefresh5] = useState(false)
    const [classroomCapacity, setclassroomCapacity] = useState("")
    const [classroomTarget, setclassroomTarget] = useState("")
    const [classid, setclassid] = useState("")
    const [refresh6, setRefresh6] = useState(false)
    const [refresh7, setRefresh7] = useState(false)
    const [offCanvasupdate, setOffCanvas] = useState(null)
    const [userid, setuserid] = useState(null)
    const [validate, setValidate] = useState(false)
    const [datauserbooking, setdatauserbooking] = useState("")
    const [imageclass, setimageclass] = useState("")
    const [suscriptiondate, setsuscriptiondate] = useState(null)
    const [suscriptionid, setsuscriptionid] = useState(null)
    const [startdateformatted, setstartdateformatted] = useState("")
    const [suscriptioncancel, setsuscriptioncancel] = useState(0)
    const [refresh8, setRefresh8] = useState(false)
    const calendarRef = useRef(null)

    const handleChange = (e) => {
        const selectedOption = e.target.value
        setEventClassName(selectedOption)
        setEventid(selectedOption.value2)
    }

    const options = [
        { label: "Clase no seleccionada", value: "Clase no seleccionada", value2: "" },
        { label: "Pilates", value: "pilates", value2: "2" },
        { label: "Yoga", value: "yoga", value2: "1" },
        { label: "Ciclo Indoor", value: "ciclo_indoor", value2: "3" },
        { label: "Body Pump", value: "bodypump", value2: "4" },
        { label: "Body Combat", value: "bodycombat", value2: "5" },
        { label: "Body Balance", value: "bodybalance", value2: "6" },
        { label: "Bailes De Salón", value: "bailes_salon", value2: "7" },
        { label: "Bailes Latinos", value: "bailes_latinos", value2: "8" },
    ]

    const VerifySuscription = () => {
        const fechaOriginal = dateStartEvent
        const partesFecha = fechaOriginal.split(" ")

        const partesFechaFormateada = partesFecha[0].split("-")
        const fecha = new Date(
            partesFechaFormateada[2],
            partesFechaFormateada[1] - 1,
            partesFechaFormateada[0]
        )

        const hora = partesFecha[1]

        const fechafinal = `${fecha.getFullYear()}-${
            fecha.getMonth() + 1
        }-${fecha.getDate()} ${hora}`
        const fechafinal2 = new Date(fechafinal)
        setstartdateformatted(fechafinal2)

        if (suscriptionid === 1) {
            const suscripton = new Date(suscriptiondate)
            suscripton.setDate(suscripton.getDate() + 30)
            setsuscriptioncancel(suscripton)
        }
        if (suscriptionid === 2) {
            const suscripton = new Date(suscriptiondate)
            suscripton.setDate(suscripton.getDate() + 60)
            setsuscriptioncancel(suscripton)
        }
        if (suscriptionid === 3) {
            const suscripton = new Date(suscriptiondate)
            suscripton.setDate(suscripton.getDate() + 180)
            setsuscriptioncancel(suscripton)
        }
        if (suscriptionid === 4) {
            const suscripton = new Date(suscriptiondate)
            suscripton.setDate(suscripton.getDate() + 360)
            setsuscriptioncancel(suscripton)
        }
    }

 

    const handleBookingUserInfo = async () => {
        if (userid !== null) {
            const Apivalues = await getallUserBooking(userid)
            setdatauserbooking(Apivalues)

            for (let i = 0; i < datauserbooking.length; i++) {
                if (datauserbooking[i].bookingId == id) {
                    setValidate(true)
                }
            }
        } else {
            setdatauserbooking([])
            setValidate(false)
        }
    }

    async function LinkUserBookin() {
        const body = { userId: userid, bookingId: id }

        const response = await CreateUserBooking(body)
    }

    async function getProfile() {
        const result = await getUserProfile()
        setsuscriptiondate(result.createdSuscriptionAt)
        setsuscriptionid(result.suscriptionId)
        setuserid(result.id)
    }

    const handleConfirmDelete = () => {
        setConfirmDelete(true)
    }

    const handleCancelDelete = () => {
        setConfirmDelete(false)
    }

    const handleDelete = () => {
        setRefresh4(!refresh4)
        offCanvasupdate.hide()
    }

    async function SendUpdatetarget() {
        const update = { targeted: classroomTarget + 1 }
        const response = await updateBooking(id, update)
        await LinkUserBookin()
        await handleBookingUserInfo()
        setsuscriptionactivated(false)
        offCanvasupdate.hide()
    }

    async function SendDeletetarget() {
        const update = { targeted: classroomTarget - 1 }
        const response = await updateBooking(id, update)
        await UnLinkUserBookin()
        await handleBookingUserInfo()
        setsuscriptionactivated(false)
        offCanvasupdate.hide()
    }

    async function UnLinkUserBookin() {
        const body = { userId: userid, bookingId: id }

        const response = await DeleteUserBooking(body)
    }




    const handleApiInfo = async () => {
        const Apivalues = await handlebooking()
        await getProfile()
        await handleBookingUserInfo()
        setDataEventen(Apivalues)
    }

    const handleApiClassrooms = async () => {
        const Apivalues = await getClassroom(id)
        setclassroomCapacity(Apivalues.data.booking.class.classroom.capacity)
        setclassid(Apivalues.data.booking.class.classroom.id)
        setimageclass(Apivalues.data.booking.class.class_Img)
    }

    const handleOneBooking = async () => {
        const Apivalues = await getOneBooking(id)
        setclassroomTarget(Apivalues.targeted)
    }

    async function PostApiInfo() {
        const index = dataeventen.length
        const lastEvent = dataeventen[index - 1]

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
            setRefresh7(!refresh7)
            setEventTitle("")
            setStartDateTime(null)
            setEndDateTime(null)
            setEventClassName("")
            setRefresh3(!refresh3)
            offCanvasupdate.hide()
        }
    }

    async function UpdateSend() {
        const response = await updateBooking(id, updatedata)
        setRefresh2(!refresh2)
    }

    async function Updating() {
        setRefresh6(!refresh6)
        offCanvasupdate.hide()
    }

    async function deleteUserBook() {
        setRefresh8(!refresh8)
        offCanvasupdate.hide()
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
        }

        getdata()
    }, [refresh2])

    useEffect(() => {
        if (refresh) {
            PostApiInfo()
            setRefresh(false)
        }
        if (refresh3) {
            handleApiInfo()
            getProfile()
            VerifySuscription()
            handleApiClassrooms()
            handleOneBooking()
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

        if (refresh6) {
            handleApiInfo()

            SendUpdatetarget()
            handleApiInfo()

            setRefresh6(false)
        }
        if (refresh7) {
            UpdateSend()
            handleApiInfo()

            setRefresh7(false)
        }

        if (refresh8) {
            handleApiInfo()
            SendDeletetarget()
          
            handleApiInfo()

            setRefresh8(false)
        }

    }, [refresh || refresh3 || refresh4 || refresh5 || refresh6 || refresh7 || refresh8])

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
                eventContent: function (arg) {
                    return {
                        html: `<div style="color: black;"> ${arg.event.title.toLocaleUpperCase()}</div>`,
                    };
                },


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
                    mydaybutton: {
                        text: "today!",
                        click: function () {
                            calendar.gotoDate(new Date())
                        },
                    },

                    myCustomButton: {
                        text: "Filtre sus clases!",
                        click: function () {
                            setShowSelect(!showSelect)
                            setRefresh2(!refresh2)
                        },
                    },
                },

                themeSystem: "bootstrap5",
                initialView: "dayGridMonth",
                headerToolbar: {
                    left: "prev,next,myCustomButton",
                    center: "title",
                    right: "dayGridMonth,listWeek,mydaybutton",
                },
                editable: true,
                selectable: true,
                weekends: false,
                events: prueba(),
                eventColor: "green",

                eventClick: evento,
                dateClick: handleDateClick,
            })
        
            
            calendar.render()
            handleBookingUserInfo()
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
        setOffCanvas(offCanvas)
        offCanvas.show()
    }

    const evento = (arg) => {
        setRefresh3(true)
        setshowinput("false")
        setValidate(false)
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
        setOffCanvas(offCanvas)
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
            offCanvasupdate.hide()
        }
    }
   
    return (
        <div id="center">
            <div id="boton">
                <Select
                    label="Clase del evento"
                    value={buscador}
                    onChange={(e) => setbuscador(e.target.value)}
                    style={{ display: showSelect ? "block" : "none" }}
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

                <br />

                <div id="back" ref={calendarRef} />
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
                                    paddingBottom: "20vh",
                                }}
                                
                            >
                                {localStorage.getItem("rol") === "Client" && (
                                   
                                      
                                    
                                    <div id="calendar2" ref={calendarRef2} />   
                                   
                                
                                )}

                                <Grid container spacing={1}>
                                    <Grid item sm={12}>
                                        <img
                                            src={logo}
                                            alt=""
                                            height="380"
                                            width="360"
                                        />
                                    </Grid>
                                    <Grid item sm={12} spacing={8}>
                                        <br />
                                        <br />{" "}
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
                                                style={{   }}
                                            >
                                                {options.map((option) => (
                                                    <MenuItem
                                                        key={option.value}
                                                        value={option.value}
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
                                                className="calendarYell"
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
                                        imageclass={imageclass}
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
                                                    value={option.value}
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
                                            className="calendarYell"
                                            onClick={UpdateApiInfo}
                                            sx={{border: "2px solid rgba(252, 185, 0, 1)"}}
                                        >
                                            Editar Evento
                                        </Button>
                                    </Grid>
                                )}
                                {localStorage.getItem("rol") === "Admin" && (
                                    <Grid item sm={12}>
                                        <Button
                                            variant="contained"
                                            className="calendarRed"
                                            sx={{border: "2px solid #f44336"}}
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
                                {localStorage.getItem("rol") === "Client" &&
                                    suscriptioncancel > startdateformatted && (
                                        <Grid item sm={12}>
                                            <Button
                                                variant="contained"
                                                className="calendarYell"
                                                sx={{border: "2px solid rgba(252, 185, 0, 1)"}}
                                                onClick={Updating}
                                                disabled={
                                                    classroomTarget ===
                                                        classroomCapacity ||
                                                    validate === true
                                                }
                                            >
                                                Apuntarse a la clase
                                            </Button>
                                        </Grid>
                                    )}

                                {validate === true && (
                                    <Grid item sm={12}>
                                        <Typography
                                            sx={{ color: "warning.main" }}
                                        >
                                            <br />
                                            Usted ya está apuntado a esta clase
                                            
                                            <Button
                                                variant="contained"
                                                sx={{border: "2px solid #f44336"}}
                                                className="calendarRed"
                                                onClick={deleteUserBook}
                                            >
                                                Cancelar reserva
                                            </Button>
                                        </Typography>
                                    </Grid>
                                )}

                                {localStorage.getItem("rol") === "Client" &&
                                    suscriptioncancel < startdateformatted && (
                                        <Grid item sm={12}>
                                            <Typography
                                                sx={{ color: "error.main" }}
                                            >
                                                <br />
                                                Su subscripción no es válida
                                            </Typography>
                                            <Link
                                                to="/suscription"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "black",
                                                }}
                                            >
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                >
                                                    <br />
                                                    Descubra Nuestros Planes
                                                </Button>
                                            </Link>
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
                                            className="calendarYell"
                                            sx={{border: "2px solid rgba(252, 185, 0, 1)", color: "#ffffff"}}
                                            autoFocus
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            onClick={handleDelete}
                                            className="calendarRed"
                                            variant="contained"
                                            sx={{ border: "2px solid #f44336" }}
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
