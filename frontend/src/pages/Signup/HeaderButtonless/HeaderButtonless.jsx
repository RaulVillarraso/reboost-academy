import "./HeaderButtonless.css"
import { Box, Typography } from "@mui/material"
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
        </Box>
    )
}

export default HeaderButtonless
