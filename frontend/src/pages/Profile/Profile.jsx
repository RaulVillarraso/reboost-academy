import { useEffect, useState } from "react"
import "./Profile.css"
import { getUserBookings, getUserProfile } from "../../services/userService"

import HeaderButtonless from "../../components/HeaderButtonless/HeaderButtonless"
import ProfileData from "./profileData/ProfileData"
import ProfileBooking from "./ProfileBooking/ProfileBooking"
import { Box } from "@mui/material"

function Profile() {
    const [profile, setProfile] = useState({})
    const [bookings, setBookings] = useState({})
    const [refresh, setRefresh] = useState(false)

    async function getProfile() {
        const result = await getUserProfile()
        setProfile(result)
    }

    async function getBookings(id) {
        const result = await getUserBookings(id)
        setBookings(result)
    }
    
    function handleRefresh(){
        setRefresh(!refresh)
    }

    useEffect(() => {
        getProfile()
    }, [refresh])

    useEffect(() => {
        getBookings(profile.id)
    }, [profile])

    return (
        <>
            <HeaderButtonless profile={profile}/>
            <Box className="profileContainer">
                <Box className="profileWrapper">
                    <ProfileData profile={profile} onEdit={handleRefresh} />
                    <ProfileBooking bookings={bookings} />
                </Box>
            </Box>
        </>
        
    )
}

export default Profile
