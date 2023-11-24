import "./HeaderButtonless.css"
import { Box, Typography, Grid } from "@mui/material"
import ProfileMenu from "./ProfileMenu/ProfileMenu"
import { Link } from "react-router-dom"
import { PropTypes } from "prop-types"

function HeaderButtonless({ profile }) {

    return (
        <Box className="headerButtonless">
                    <Box>

                    </Box>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", alignSelf: "center" }}
                    >
                        <Box className="titleButtonless">
                            <Typography variant="h3">
                                Reboost Academy
                            </Typography>
                        </Box>
                    </Link>
                    {profile ? <ProfileMenu profile={profile} /> : <Box></Box>}
        </Box>
    )
}

export default HeaderButtonless

HeaderButtonless.propTypes = {
    profile: PropTypes.object
}