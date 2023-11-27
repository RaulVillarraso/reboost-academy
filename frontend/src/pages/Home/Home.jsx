import Header from "./Header/Header"
import "./Home.css"
import { Box, Grid, Typography } from '@mui/material'

function Home() {
    return (
        <>
            <Header />
            <Box className="portrait">
                <Box sx={{width: "80%"}}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} lg={8}>
                            <Box className="portraitImage">
                                <img src="./src/assets/home/inicio.jpg" />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Box className="portraitText">
                                <Typography
                                    variant="subtitle1"
                                    sx={{ margin: "0 24px" }}
                                >
                                    Reboost Academy
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ margin: "0 24px" }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Mauris congue rhoncus
                                    finibus. Suspendisse potenti. Ut lobortis
                                    felis efficitur lectus pulvinar aliquet.
                                    Etiam a odio eros. Praesent arcu nulla,
                                    tincidunt nec velit vel, interdum consequat
                                    massa. Suspendisse mollis purus ut nisi
                                    molestie, sit amet rhoncus ligula vehicula.
                                    Pellentesque mollis lacus et eleifend
                                    bibendum. Donec vulputate mauris at tortor
                                    tincidunt, vel euismod massa posuere.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className="imageList">
                <img src="https://placehold.co/140" />
                <img src="https://placehold.co/140" />
                <img src="https://placehold.co/140" />
                <img src="https://placehold.co/140" />
                <img src="https://placehold.co/140" />
            </Box>
        </>
    )
}

export default Home
