import { Box, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import PropTypes from "prop-types"
import "./ProfileBooking.css"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { getUserSuscription } from "../../../services/userService"

function ProfileBooking({ bookings }) {

        const [suscription, setSuscription] = useState("")

        function generate() {
            if (bookings.bookings) {
                return bookings.bookings.map((value, i) =>{
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
                        }
                    )}
            }

            async function getSuscription(){
                const result = await getUserSuscription()
                setSuscription(result)
            }

            useEffect(() => {
                getSuscription()
            }, [])

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
                                : "You don't have an active suscription"}
                        </Typography>
                        <List>
                            {bookings.bookings ? generate() : null}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProfileBooking

ProfileBooking.propTypes = {
    bookings: PropTypes.object,
}