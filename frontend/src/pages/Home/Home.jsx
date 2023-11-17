import Header from "./Header/Header"
import "./Home.css"
import { Box, Typography } from '@mui/material'

function Home() {
    return (
        <>
            <Header />
            <Box>
                <Typography>Hello, World!</Typography>
            </Box>
        </>
    )
}

export default Home
