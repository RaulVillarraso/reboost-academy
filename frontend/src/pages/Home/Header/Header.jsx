import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    Paper,
    Toolbar,
    Typography,
    useTheme,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ClassIcon from "@mui/icons-material/Class"
import GroupIcon from "@mui/icons-material/Group"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import LogoutIcon from "@mui/icons-material/Logout"
import {getUserProfile} from "../../../services/userService"
import "./Header.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import ProfileMenu from "../../../components/HeaderButtonless/ProfileMenu/ProfileMenu"

const drawerWidth = 240

function Header() {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState({})
    const guest = ["Classes", "Staff", "Suscriptions", "Login", "Signup",]
    const account = ["Classes", "Staff", "Suscriptions", "Logout"]
    const array = localStorage.token ? account : guest
    
    async function getProfile() {
        const result = await getUserProfile()
        setProfile(result)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("rol")
        window.location.reload(false)
    }

    const switchStatement = (text) => {
        switch (text) {
            case "Classes":
                return <ClassIcon />

            case "Staff":
                return <GroupIcon />

            case "Suscriptions":
                return <MonetizationOnIcon />

            case "Login":
                return <LoginIcon />

            case "Signup":
                return <PersonAddIcon />

            case "Logout":
                return <LogoutIcon />
        }
    }

    useEffect(() => {
        getProfile()
    },[])

    return (
        <Box className="header">
            <Box className="menuIcon">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon sx={{ color: "white" }} />
                    </IconButton>
                </Toolbar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>

                    <Divider />
                    <List>
                        {array.map((text, index) => (
                            <Link
                                key={index}
                                to={`/${text.toLowerCase()}`}
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                <ListItem
                                    disablePadding
                                    onClick={
                                        text === "Logout"
                                            ? () => logout()
                                            : null
                                    }
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {switchStatement(text)}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </Box>
            <Box className="logoAndButtons">
                <Paper className="logo">
                    <img className="logoImg" src="./src/assets/home/Logo2.jpg" />
                </Paper>
                <Link to='/clase'>
                <Button sx={{backgroundColor: "#FCB900"}} variant="contained">Classes</Button>
                </Link>
                <Link to='/staff'>
                <Button sx={{backgroundColor: "#FCB900"}} variant="contained">Staff</Button>
                </Link>
                <Link to='/suscription'>
                <Button sx={{backgroundColor: "#FCB900"}} variant="contained">Suscription</Button>
                </Link>
            </Box>
            <Link
                to="/"
                style={{ textDecoration: "none", alignSelf: "center" }}
            >
                <Box className="title">
                    <Typography variant="h3">Reboost Academy</Typography>
                </Box>
            </Link>
            {!localStorage.token ? (
                <Box className="register">
                    <Link to="/login">
                        <Button  variant="contained" id="login">
                            Login
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant="contained" id="signup">
                            Signup
                        </Button>
                    </Link>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "10em",
                    }}
                >
                    <ProfileMenu profile={profile}/>
                </Box>
            )}
        </Box>
    )
}

export default Header
