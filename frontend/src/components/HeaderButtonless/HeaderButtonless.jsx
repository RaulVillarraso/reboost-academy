import "./HeaderButtonless.css"
import { Avatar, Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function HeaderButtonless() {

    return (
        <Box className="headerButtonless">
            <Link
                to="/"
                style={{ textDecoration: "none", alignSelf: "center" }}
            >
                <Box className="titleButtonless">
                    <Typography variant="h3">Reboost Academy</Typography>
                </Box>
            </Link>
            <Avatar
                className="profilePic"
                alt="profile pic"
                src=""
                sx={{ position: "absolute", alignSelf:"flex-end", marginRight:"32px" }}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width:"5em",
                    alignSelf:"flex-end"
                }}
            >
            </Box>
        </Box>
    )
}

export default HeaderButtonless
