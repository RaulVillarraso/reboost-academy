import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material"
import HeaderButtonless from "../../components/HeaderButtonless/HeaderButtonless"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../services/authService"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }


    async function onLogin() {
        try {
            const loginResponse = await login({
                email: email,
                password: password,
            })
            localStorage.setItem('token', loginResponse.token)
            localStorage.setItem('rol', loginResponse.role)
            navigate('/profile')
            
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <Box id="loginMain">
            <HeaderButtonless />
            <Box className="bodyLogin">
                <img src="./src/assets/login/1.jpg" />
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
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ margin: "8px", width: "20em" }}
                        />
                        <TextField
                            label="Password"
                            size="small"
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ margin: "8px", width: "20em" }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box className="loginButtons">
                        <Button
                            id="loginButton"
                            variant="contained"
                            onClick={() => onLogin()}
                            sx={{
                                color: "#ffffff",
                                background: "linear-gradient(315deg, rgba(68, 68, 68, 1) 90%, rgba(252, 185, 0, 1) 90%)",
                                border:"2px solid rgba(252, 185, 0, 1)",
                                borderRadius: "4px",
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
                <img src="./src/assets/login/2.jpg" />
            </Box>
        </Box>
    )
}

export default Login
