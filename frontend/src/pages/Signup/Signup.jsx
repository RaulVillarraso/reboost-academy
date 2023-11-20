import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import HeaderButtonless from "./HeaderButtonless/HeaderButtonless"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import "./Signup.css"
import { useState } from "react"

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return (
        <Box id="mainView">
            <HeaderButtonless />
            <Box className="bodySignup">
                <Box className="signupImage">
                    <img src="https://placehold.co/400" />
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
                            sx={{ margin: "4px", width: "17em" }}
                            label="Email"
                            required
                            size="small"
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
                    </Box>
                    <Box className="signupButtons">
                        <Button variant="contained" id="signupButton">
                            Signup
                        </Button>
                        <Typography>or</Typography>
                        <Box className="socialMedia">
                            <img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-256.png" />
                            <img src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_facebook-256.png" />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Signup
