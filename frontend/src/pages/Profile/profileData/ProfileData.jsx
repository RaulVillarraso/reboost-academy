import { Avatar, Box, Button, TextField, Typography } from "@mui/material"
import PropTypes from "prop-types"
import "./ProfileData.css"
import { useState } from "react"
import { updateUser } from "../../../services/userService"

function ProfileData({ profile, onEdit }) {
    const [edit, setEdit] = useState(false)
    const [firstName, setFirstName] = useState(profile.firstName)
    const [lastname, setLastName] = useState(profile.lastName)
    const [email, setEmail] = useState(profile.email)
    const [address, setAddress] = useState(profile.adress)
    const [phone, setPhone] = useState(profile.phone)

    function handleEdit(){
        setEdit(!edit)
    }

    async function updateData(){
        try {
            await updateUser(profile.id, {
            firstName: firstName,
            lastname: lastname,
            email: email,
            adress: address,
            phone: phone,
        })

        onEdit()
        handleEdit()

        } catch (error) {
            console.log(error.message)
        }
        
    }

    return (
        <Box className="profileData">
            {!edit ? (
                <Box className="dataCenter">
                    <Box className="profileTop">
                        <Avatar
                            alt="Profile Pic"
                            id="profilePic"
                            src={profile.profileImg}
                            sx={{ width: "70px", height: "70px" }}
                        />
                        <Typography variant="h5" id="profileTitle">
                            Your Profile
                        </Typography>
                    </Box>
                    <Box className="profileInfo">
                        <Typography className="personalInfo">
                            {profile.firstName} {profile.lastName}
                        </Typography>
                        <Typography className="personalInfo">
                            {profile.email}
                        </Typography>
                        <Typography className="personalInfo">
                            {profile.adress}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                height: "1.5em",
                            }}
                        >
                            <Typography
                                className="personalInfo"
                                sx={{ width: "15em" }}
                            >
                                {profile.phone}
                            </Typography>
                            <Button
                                onClick={() => handleEdit()}
                                variant="contained"
                                id="edit"
                            >
                                Edit
                            </Button>
                        </Box>
                    </Box>
                    <Box id="buttonsCase">
                        <Box className="profileButtons">
                            <Button variant="contained" id="suscription">
                                Suscriptions
                            </Button>
                            <Button variant="contained" id="calendar">
                                Calendar
                            </Button>
                            <Button variant="contained" id="logout">
                                Logout
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box className="dataCenter">
                    <Box className="profileTop">
                        <Avatar
                            alt="Profile Pic"
                            id="profilePic"
                            src={profile.profileImg}
                            sx={{ width: "70px", height: "70px" }}
                        />
                        <Typography variant="h5" id="profileTitle">
                            Your Profile
                        </Typography>
                    </Box>
                    <Box className="profileInfo">
                        <TextField
                            className="changeField"
                            label="First Name"
                            size="small"
                            defaultValue={profile.firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            className="changeField"
                            label="Last Name"
                            size="small"
                            defaultValue={profile.lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            className="changeField"
                            label="Email"
                            size="small"
                            defaultValue={profile.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            className="changeField"
                            label="Address"
                            size="small"
                            defaultValue={profile.adress}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <TextField
                                className="changeField"
                                label="Phone"
                                size="small"
                                defaultValue={profile.phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <Button
                                onClick={() => updateData()}
                                variant="contained"
                                sx={{ marginLeft: "4px" }}
                                id="edit"
                            >
                                Confirm
                            </Button>
                        </Box>
                    </Box>
                    <Box id="buttonsCase">
                        <Box className="profileButtons">
                            <Button variant="contained" id="suscription">
                                Suscriptions
                            </Button>
                            <Button variant="contained" id="calendar">
                                Calendar
                            </Button>
                            <Button variant="contained" id="logout">
                                Logout
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default ProfileData

ProfileData.propTypes = {
    profile: PropTypes.object,
    onEdit: PropTypes.func
}
