import { useEffect, useState } from "react"
import "./Profile.css"
import { getUserProfile } from "../../services/userService"
import { Avatar, Box, Button, Typography } from "@mui/material"
import HeaderButtonless from "../../components/HeaderButtonless/HeaderButtonless"

function Profile() {
    const [profile, setProfile] = useState({})

    async function getProfile() {
        const result = await getUserProfile()
        setProfile(result)
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
            <HeaderButtonless />
            <Box className="profileContainer">
                <Box className="profileWrapper">
                    <Box className="profileData">
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
                                    <Button variant="contained" id="edit">
                                        Edit
                                    </Button>
                                </Box>
                            </Box>
                            <Box id="buttonsCase">
                                <Box className="profileButtons">
                                    <Button
                                        variant="contained"
                                        id="suscription"
                                    >
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
                    </Box>
                    <Box className="profileBooking"></Box>
                </Box>
            </Box>
        </>
    )
}

export default Profile
