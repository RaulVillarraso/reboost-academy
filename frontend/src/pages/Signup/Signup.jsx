import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import HeaderButtonless from "../../components/HeaderButtonless/HeaderButtonless"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useState } from "react"
import "./Signup.css"

import { signup } from "../../services/authService"
import { Link, useNavigate } from "react-router-dom"

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    async function onSignup(){
        try {
            const signupResponse = await signup({email: email, password: password, firstName: firstName, lastName: lastName, phone: phone, adress: address, role: "client",})
            localStorage.setItem("token", signupResponse.token)
            localStorage.setItem("rol", "Client")
            navigate("/profile")
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Box id="mainView">
            <HeaderButtonless />
            <Box className="bodySignup">
                <Box className="signupImage">
                    <img src="./src/assets/signup/1.jpg" />
                </Box>
                <Box className="signupForm">
                    <Box className="signupTitle">
                        <Typography variant="h4">Signup</Typography>
                        <Typography variant="h5">
                            Welcome to your space
                        </Typography>
                    </Box>
                    <Box className="signupFields">
                        <TextField
                            size="small"
                            sx={{ margin: "4px", width: "17em" }}
                            required
                            label="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        ></TextField>
                        <TextField
                            size="small"
                            sx={{ margin: "4px", width: "17em" }}
                            required
                            label="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        ></TextField>
                        <TextField
                            sx={{ margin: "4px", width: "17em" }}
                            label="Email"
                            required
                            size="small"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        ></TextField>
                        <TextField
                            sx={{ margin: "4px" }}
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            required
                            size="small"
                            onChange={(e) => setPassword(e.target.value)}
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
                        ></TextField>
                        <TextField
                            sx={{ margin: "4px", width: "17em" }}
                            label="Repeat Password"
                            required
                            size="small"
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            type="password"
                        ></TextField>
                        <TextField
                            size="small"
                            sx={{ margin: "4px", width: "17em" }}
                            label="Phone"
                            onChange={(e) => setPhone(e.target.value)}
                            type="number"
                        ></TextField>
                        <TextField
                            size="small"
                            sx={{ margin: "4px", width: "17em" }}
                            label="Address"
                            onChange={(e) => setAddress(e.target.value)}
                        ></TextField>
                    </Box>
                    <Box className="signupButtons">
                        <Button 
                            variant="contained" 
                            id="signupButton"
                            onClick={() =>password !== repeatPassword ? alert("La contraseña no coincide") : onSignup()}>
                            Signup
                        </Button>
                        <Typography sx={{marginTop: "8px"}}>
                            Already have an account? 
                            <Link>Click Here</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Signup
