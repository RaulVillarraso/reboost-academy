import { Box, Button, TextField, Typography } from "@mui/material"
import HeaderButtonless from "../../components/HeaderButtonless/HeaderButtonless"
import "./Login.css"
import { Link } from "react-router-dom"

function Login() {
    return (
        <Box id="loginMain">
            <HeaderButtonless />
            <Box className="bodyLogin">
                <img src="https://placehold.co/175x432" />
                <Box className="loginForm">
                    <Box className="loginTitle">
                        <Typography variant="h4">Login</Typography>
                        <Typography variant="subtitle1">
                            Welcome to your space
                        </Typography>
                    </Box>
                    <Box className="loginFields">
                        <TextField
                            label="Email"
                            size="small"
                            sx={{ margin: "8px", width: "20em" }}
                        />
                        <TextField
                            label="Password"
                            size="small"
                            sx={{ margin: "8px", width: "20em" }}
                        />
                    </Box>
                    <Box className="loginButtons">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#FCB900",
                                color: "#FFFFFF",
                                borderRadius: "15px",
                                width: "8em",
                                marginBottom: "16px",
                            }}
                        >
                            Login
                        </Button>
                        <Typography>
                            Don{"'"}t have an account? - Signup{" "}
                            <Link to="/signup">Here</Link>
                        </Typography>
                    </Box>
                </Box>
                <img src="https://placehold.co/175x432" />
            </Box>
        </Box>
    )
}

export default Login
