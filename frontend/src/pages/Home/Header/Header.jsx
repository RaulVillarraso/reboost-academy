import { Box, Button, Paper, Typography } from "@mui/material"
import "./Header.css"

function Header() {
    return (
            <Box className="header">
                    <Box className="logoAndButtons">
                        <Paper className="logo">
                            <img src="https://placehold.co/76x76" />
                        </Paper>
                        <Button variant="contained">Classes</Button>
                        <Button variant="contained">Staff</Button>
                        <Button variant="contained">Suscription</Button>
                    </Box>
                    <Box className="title">
                        <Typography variant="h3">Reboost Academy</Typography>
                    </Box>
                    <Box className="register">
                        <Button variant="contained">Login</Button>
                        <Button variant="contained">Signup</Button>
                    </Box>
            </Box>
    )
}

export default Header
