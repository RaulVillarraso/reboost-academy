
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

const buttonStyles = {
    display: 'flex',
};

const boxStyles = {
    width: '6vw',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.7vw',
    fontWeight: 800,
    color: 'black',
    transition: 'all 0.8s',
    cursor: 'pointer',
    position: 'relative',
    background: '#FCB900',
    overflow: 'hidden',
    '&:before': {
        color: 'white',
        content: '"view"',
        position: 'absolute',
        top: 0,
        background: '#0f0f0f',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateY(100%)',
        transition: 'transform 0.4s',
    },
   
    '&:hover:before': {
        transform: 'translateY(0)',
        color: 'white',
    },
};










function Header() {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState({})
    const guest = ["Classes", "Staff", "Suscriptions", "Login", "Signup",]
    const account = ["Clase", "Staff", "Suscription", "Logout"]
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
        window.location.reload()
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
                    <Box id="drawerLogo"></Box>
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
            <Box className="logoAndButtons" style={{ width:"33vw"}} >
                <Paper className="logo">
                    <img className="logoImg" src="./src/assets/calendar/logo.png" />
                </Paper>
                <Link to='/clase' style={{textDecoration: "none"}}>
                <Button  sx={{...buttonStyles,...boxStyles}} variant="contained">Classes</Button>
                </Link>
                <Link to='/staff'style={{textDecoration: "none"}}>
                <Button sx={{...buttonStyles,...boxStyles}} variant="contained">Staff</Button>
                </Link>
                <Link to='/suscription'style={{textDecoration: "none"}}>
                <Button sx={{...buttonStyles,...boxStyles}} variant="contained">Subscription</Button>
                </Link>
            </Box>
            
            <Link
                to="/"
                style={{ textDecoration: "none", alignSelf: "center" ,margin:"0,auto" }}
            >
                <Box className="title" style={{ width:"33vw"  }}>
                    <Typography variant="h3">Reboost Academy</Typography>
                </Box>
            </Link>
            {!localStorage.token ? (
                <Box className="register" style={{ width:"33vw" }}>
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
                <Box style={{  }}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width:"33vw"
                    }}
                >
                    <ProfileMenu profile={profile} />
                </Box>
            )}
        </Box>
    )
}

export default Header
