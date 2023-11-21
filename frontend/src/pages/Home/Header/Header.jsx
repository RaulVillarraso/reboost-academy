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
import "./Header.css"
import { Link } from "react-router-dom"
import { useState } from "react"

const drawerWidth = 240

function Header() {
    
    const theme = useTheme()
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const switchStatement = (text) => {
        switch(text){
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
        }
    }

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
                        {[
                            "Classes",
                            "Staff",
                            "Suscriptions",
                            "Login",
                            "Signup",
                        ].map((text, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {switchStatement(text)}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
            <Box className="logoAndButtons">
                <Paper className="logo">
                    <img src="https://placehold.co/76x76" />
                </Paper>
                <Button variant="contained">Classes</Button>
                <Button variant="contained">Staff</Button>
                
                <Button variant="contained">Suscription</Button>
            </Box>
            <Link to="/" style={{textDecoration: "none", alignSelf: "center"}}>
                <Box className="title">
                    <Typography variant="h3">Reboost Academy</Typography>
                </Box>
            </Link>
            <Box className="register">
                <Button variant="contained">Login</Button>
                <Link to="/signup">
                    <Button variant="contained">Signup</Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Header
