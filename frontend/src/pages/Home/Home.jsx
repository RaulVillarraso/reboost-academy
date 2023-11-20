import Header from "./Header/Header"
import "./Home.css"
import { Box, Typography } from '@mui/material'

function Home() {
    return (
        <>
            <Header />
            <Box className="portrait">
                <Box className="portraitImage">
                    <img src="https://placehold.co/700x400" />
                </Box>
                <Box className="portraitText">
                    <Typography variant="subtitle1">Reboost Academy</Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris congue rhoncus finibus. Suspendisse potenti. Ut
                        lobortis felis efficitur lectus pulvinar aliquet. Etiam
                        a odio eros. Praesent arcu nulla, tincidunt nec velit
                        vel, interdum consequat massa. Suspendisse mollis purus
                        ut nisi molestie, sit amet rhoncus ligula vehicula.
                        Pellentesque mollis lacus et eleifend bibendum. Donec
                        vulputate mauris at tortor tincidunt, vel euismod massa
                        posuere. 
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default Home
