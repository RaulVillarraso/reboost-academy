import { useEffect, useState } from "react"
import "./Profile.css"
import { getUserBookings, getUserProfile } from "../../services/userService"

import HeaderButtonless from "../../components/HeaderButtonless/HeaderButtonless"
import ProfileData from "./profileData/ProfileData"
import ProfileBooking from "./ProfileBooking/ProfileBooking"
import { Box } from "@mui/material"
import AdminMenu from "./AdminMenu/AdminMenu"

function Profile() {
    const [profile, setProfile] = useState({})
    const [bookings, setBookings] = useState({})
    const [refresh, setRefresh] = useState(false)
    const [adminOption, setAdminOption] = useState("Profile")

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
    
    function onAdminOptions(e){
        setAdminOption(e.target.innerText)
    }

    useEffect(() => {
        getProfile()
    }, [refresh, localStorage.token])

    useEffect(() => {
        getBookings(profile.id)
    }, [profile, localStorage.token])

    return (
        <>
            <HeaderButtonless profile={profile} />
            <Box className="profileContainer">
                {localStorage.getItem("rol") === "Admin" && (
                    <AdminMenu onAdminOptions={onAdminOptions} />
                )}
                {localStorage.getItem("rol") === "Client" && (
                    <Box id="inv"></Box>
                )}
                <Box className="profileWrapper">
                    <ProfileData 
                        profile={profile} 
                        onEdit={handleRefresh} 
                    />
                    <ProfileBooking
                        bookings={bookings}
                        adminOption={adminOption}
                    />
                </Box>
            </Box>
        </>
    )
}

export default Profile
