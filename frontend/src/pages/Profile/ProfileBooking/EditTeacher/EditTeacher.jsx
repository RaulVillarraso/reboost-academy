import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
} from "@mui/material"
import "./EditTeacher.css"
import PropTypes from "prop-types"
import { useState } from "react"

function EditTeacher({ value, onConfirm, onCreate, onComplete }) {
    const [firstName, setFirstName] = useState(value.firstName)
    const [lastName, setLastName] = useState(value.lastName)
    const [email, setEmail] = useState(value.email)
    const [phone, setPhone] = useState(value.phone)
    const [specialization, setSpecialization] = useState(value.specialization)

    function handleData(){
        value.id
            ? onConfirm(firstName, lastName, email, specialization, phone)
            : onCreate({
                    firstName,
                    lastName,
                    email,
                    specialization,
                    phone,
                })
            onComplete()
    }

    return (
        <Card sx={{ minWidth: 275, zIndex: 2 }}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <TextField
                    sx={{ marginBottom: "8px" }}
                    size="small"
                    label="First Name"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    defaultValue={value.firstName}
                />
                <TextField
                    sx={{ marginBottom: "8px" }}
                    size="small"
                    label="Last Name"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    defaultValue={value.lastName}
                />
                <TextField
                    sx={{ marginBottom: "8px" }}
                    size="small"
                    label="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={value.email}
                />
                <TextField
                    sx={{ marginBottom: "8px" }}
                    size="small"
                    label="Specialization"
                    required
                    onChange={(e) => setSpecialization(e.target.value)}
                    defaultValue={value.specialization}
                />
                <TextField
                    sx={{ marginBottom: "8px" }}
                    size="small"
                    label="Phone"
                    type="number"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    defaultValue={value.phone}
                />
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => handleData()}
                    variant="contained"
                    size="small"
                >
                    Confirm
                </Button>
            </CardActions>
        </Card>
    )
}

export default EditTeacher

EditTeacher.propTypes = {
    value: PropTypes.object,
    onConfirm: PropTypes.func,
    onCreate: PropTypes.func,
    onComplete: PropTypes.func,
}
