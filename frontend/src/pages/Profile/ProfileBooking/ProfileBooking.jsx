import {
    Box,
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material"
import PropTypes from "prop-types"
import "./ProfileBooking.css"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { getUserSuscription } from "../../../services/userService"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { deleteTeacher, getTeacher, getTeachers, postTeacher, updateTeacher } from "../../../services/teacherService"
import { getAllSuscriptions, updateSuscription } from "../../../services/suscriptionService"
import EditTeacher from "./EditTeacher/EditTeacher"

function ProfileBooking({ bookings, adminOption }) {
    const [suscription, setSuscription] = useState("")
    const [suscriptionList, setSuscriptionList] = useState([])
    const [teachers, setTeachers] = useState([])
    const [teacher, setTeacher] = useState({})
    const [edit, setEdit] = useState(false)
    const [refresh, setRefresh] = useState(true)

    function generate(adminOption) {
        if (adminOption === "Profile" && bookings.bookings) {
            return bookings.bookings.map((value, i) => {
                const bookingDate = dayjs(value.start)
                const dateFormat = bookingDate.format("DD/MM - HH:mm")
                return (
                    <ListItem key={i} sx={{ width: "100%" }}>
                        <ListItemText
                            sx={{ width: "100%" }}
                            primary={value.class.classname}
                            secondary={
                                value.class.classroom.classroomname +
                                " || " +
                                dateFormat
                            }
                        />
                    </ListItem>
                )
            })
        } else if (adminOption === "Teachers") {
            return teachers.map((value, i) => (
                <Grid key={i} container spacing={2}>
                    <Grid item xs={12}>
                        <ListItem
                            secondaryAction={
                                !edit ? (
                                    <IconButton
                                        onClick={() => removeTeacher(value.id)}
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                ) : null
                            }
                        >
                            <ListItemAvatar>
                                {(
                                    <IconButton
                                        onClick={() => getOneTeacher(value.id)}
                                        edge="start"
                                        aria-label="edit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                )}
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    !edit
                                        ? `${value.firstName} ${value.lastName} - ${value.email}`
                                        : null
                                }
                                secondary={
                                    !edit
                                        ? `${value.specialization} - ${value.phone}`
                                        : null
                                }
                            />
                        </ListItem>
                    </Grid>
                </Grid>
            ))
        } else if (adminOption === "Suscriptions") {
            return suscriptionList.map((value, i) => (
                <Grid key={i} container spacing={2}>
                    <Grid item xs={12}>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <IconButton
                                    onClick={() => setEdit(!edit)}
                                    edge="start"
                                    aria-label="edit"
                                >
                                    <EditIcon />
                                </IconButton>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${value.suscription_Type} - ${value.cost}€`}
                            />
                        </ListItem>
                    </Grid>
                </Grid>
            ))
        }
    }

    // Handle Teachers

    async function getTeacherList() {
        try {
            const result = await getTeachers()
            setTeachers(result)
        } catch (error) {
            console.log(error)
        }
        
    }

    async function getOneTeacher(id){
        try {
            const result = await getTeacher(id)
            setTeacher(result)
            setEdit(!edit)
        } catch (error) {
            console.log(error)
        }
    }

    async function createTeacher(body){
        try {
            await postTeacher(body)
            setEdit(!edit)
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }

    async function editTeacher(id, firstName, lastName, email, specialization, phone) {
        try {
            const edited = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                specialization,
                phone: phone,
            }
            await updateTeacher(id, edited)
            setEdit(!edit)
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }

    async function removeTeacher(id){
        try {
            await deleteTeacher(id)
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }

    // Handle Suscriptions

    async function getSuscriptionList() {
        try {
            const result = await getAllSuscriptions()
            setSuscriptionList(result)
        } catch (error) {
            console.log(error)
        }
    }

    async function getSuscription() {
        try {
            const result = await getUserSuscription()
            setSuscription(result)
        } catch (error) {
            console.log(error)
        }
    }

    async function editSuscription(id) {
        try {
            await updateSuscription(id)
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        getSuscription()
        getTeacherList()
        getSuscriptionList()
    }, [])

    useEffect(() => {
        getTeacherList()
    },[refresh])

    return (
        <Box className="profileBooking">
            <Box className="bookingsByUser">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            sx={{ mt: 4, mb: 2 }}
                            variant="h6"
                            component="div"
                        >
                            {suscription
                                ? suscription.suscription_Type
                                : localStorage.rol !== "Admin"
                                ? "You don't have an active suscription"
                                : "Welcome Admin!"}
                        </Typography>
                        <List>
                            {edit ? (
                                <EditTeacher
                                    value={teacher}
                                    onConfirm={(
                                        firstName,
                                        lastName,
                                        email,
                                        specialization,
                                        phone
                                    ) =>
                                        editTeacher(
                                            teacher.id,
                                            firstName,
                                            lastName,
                                            email,
                                            specialization,
                                            phone
                                        )
                                    }
                                    onCreate={(body) => createTeacher(body)}
                                />
                            ) : bookings.bookings ? (
                                generate(adminOption)
                            ) : null}
                        </List>
                        {adminOption === "Teachers" ? (
                            <Button
                                onClick={() => setEdit(!edit)}
                                variant="contained"
                            >
                                Add Teacher
                            </Button>
                        ) : null}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProfileBooking

ProfileBooking.propTypes = {
    bookings: PropTypes.object,
    adminOption: PropTypes.string,
}
