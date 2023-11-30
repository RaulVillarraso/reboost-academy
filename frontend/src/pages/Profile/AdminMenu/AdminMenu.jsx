import { useState } from "react"
import PropTypes from "prop-types"
import "./AdminMenu.css"
import { Fade, Menu, MenuItem } from "@mui/material"

function AdminMenu({ onAdminOptions }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div id="adminMenu">
            <button
                onClick={handleClick}
                className="Btn"
            >
                Admin Options
            </button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem value="Profile" onClick={onAdminOptions}>
                    Profile
                </MenuItem>
                <MenuItem value="Teachers" onClick={onAdminOptions}>
                    Teachers
                </MenuItem>
                <MenuItem value="Suscriptions" onClick={onAdminOptions}>
                    Suscriptions
                </MenuItem>
            </Menu>
        </div>
    )
}

export default AdminMenu

AdminMenu.propTypes = {
    onAdminOptions: PropTypes.func
}