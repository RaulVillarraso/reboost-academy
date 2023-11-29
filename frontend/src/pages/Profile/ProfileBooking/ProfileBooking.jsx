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
import { forwardRef, useEffect, useState } from "react"
import dayjs from "dayjs"
import { getUserSuscription } from "../../../services/userService"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import {
    deleteTeacher,
    getTeacher,
    getTeachers,
    postTeacher,
    updateTeacher,
} from "../../../services/teacherService"
import {
    deleteSuscription,
    getAllSuscriptions,
    getSuscriptionById,
    postSuscription,
    updateSuscription,
} from "../../../services/suscriptionService"
import EditTeacher from "./EditTeacher/EditTeacher"
import EditSuscription from "./EditSuscription/EditSuscription"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import AdminMenu from "../AdminMenu/AdminMenu"

function ProfileBooking({ bookings, adminOption, onAdminOptions }) {
    const [suscription, setSuscription] = useState("")
    const [suscriptionList, setSuscriptionList] = useState([])
    const [suscriptionSelec, setSuscriptionSelec] = useState({})
    const [teachers, setTeachers] = useState([])
    const [teacher, setTeacher] = useState({})
    const [edit, setEdit] = useState(false)
    const [editSus, setEditSus] = useState(false)
    const [refresh, setRefresh] = useState(true)
    const [open, setOpen] = useState(false)
    const [openDel, setOpenDel] = useState(false)

    const handleDelete = () => {
        setOpenDel(true)
    }

    const handleCloseDel = (event, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpenDel(false)
    }

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    })

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpen(false)
    }

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
                                        onClick={() => {
                                            removeTeacher(value.id)
                                            handleDelete()
                                        }}
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                ) : null
                            }
                        >
                            <ListItemAvatar>
                                {
                                    <IconButton
                                        onClick={() => getOneTeacher(value.id)}
                                        edge="start"
                                        aria-label="edit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                }
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
                                <IconButton
                                    onClick={() => {
                                        removeSuscription(value.id)
                                        handleDelete()
                                    }}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <IconButton
                                    onClick={() => getOneSuscription(value.id)}
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

    async function getOneTeacher(id) {
        try {
            const result = await getTeacher(id)
            setTeacher(result)
            setEdit(!edit)
        } catch (error) {
            console.log(error)
        }
    }

    async function createTeacher(body) {
        try {
            await postTeacher(body)
            setEdit(!edit)
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }

    async function editTeacher(
        id,
        firstName,
        lastName,
        email,
        specialization,
        phone
    ) {
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

    async function removeTeacher(id) {
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

    async function getOneSuscription(id) {
        try {
            const result = await getSuscriptionById(id)
            setSuscriptionSelec(result)
            setEditSus(!edit)
        } catch (error) {
            console.log(error)
        }
    }

    async function editSuscription(id, body) {
        try {
            await updateSuscription(id, body)
            setEditSus(!editSus)
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }

    async function createSuscription(body) {
        try {
            await postSuscription(body)
            setEditSus(!editSus)
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }

    async function removeSuscription(id) {
        try {
            await deleteSuscription(id)
            setRefresh(!refresh)
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
        getSuscriptionList()
    }, [refresh])

    return (
        <Box className="profileBooking">
            {localStorage.getItem("rol") === "Admin" && (
                <AdminMenu onAdminOptions={onAdminOptions} />
            )}
            {localStorage.getItem("rol") === "Client" && <Box id="inv"></Box>}
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
                                    onComplete={() => setTeacher("")}
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
                                    handleClick={handleClick}
                                />
                            ) : editSus ? (
                                <EditSuscription
                                    value={suscriptionSelec}
                                    onComplete={() => setSuscriptionSelec("")}
                                    onConfirm={(id, body) =>
                                        editSuscription(id, body)
                                    }
                                    onCreate={(body) => createSuscription(body)}
                                    handleClick={handleClick}
                                />
                            ) : bookings.bookings ? (
                                generate(adminOption)
                            ) : null}
                        </List>
                        {adminOption === "Teachers" ? (
                            <Button
                                onClick={() => setEdit(!edit)}
                                className="addItem"
                                variant="contained"
                            >
                                {edit ? "Cancel" : "Add Teacher"}
                            </Button>
                        ) : adminOption === "Suscriptions" ? (
                            <Button
                                onClick={() => setEditSus(!editSus)}
                                className="addItem"
                                variant="contained"
                            >
                                {editSus ? "Cancel" : "Add Suscription"}
                            </Button>
                        ) : null}
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Action Completed!
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={openDel}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleCloseDel}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    Item Deleted
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default ProfileBooking

ProfileBooking.propTypes = {
    bookings: PropTypes.object,
    adminOption: PropTypes.string,
    onAdminOptions: PropTypes.func,
}
