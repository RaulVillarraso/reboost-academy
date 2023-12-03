import "./ProfileMenu.css"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import IconButton from "@mui/material/IconButton"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import Tooltip from "@mui/material/Tooltip"
import Logout from "@mui/icons-material/Logout"
import { useState } from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

function ProfileMenu({ profile }) {
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    function handleLogout(){
        localStorage.removeItem("token")
        localStorage.removeItem("rol")
        navigate("/")
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    paddingRight: "2em",

                }}
            >
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="medium"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar
                            sx={{ width: 49, height: 49 }}
                            src={profile.profileImg}
                        ></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={() => navigate("/profile")}>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/calendar")}>
                    <ListItemIcon>
                        <CalendarMonthIcon fontSize="small" />
                    </ListItemIcon>
                    Calendar
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default ProfileMenu

ProfileMenu.propTypes = {
    profile: PropTypes.object,
}