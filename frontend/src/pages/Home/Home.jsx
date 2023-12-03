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
                                {/* <Typography
                                    variant="subtitle1"
                                    sx={{ margin: "0 24px" }}
                                >
                                    Reboost Academy
                                </Typography> */}
                                <Typography
                                    variant="body1"
                                    sx={{ margin: "0 20px" }}
                                >
                                    
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className="imageList">
                <img className="imgComp" src="./src/assets/home/1.jpg" />
                <img className="imgComp" src="./src/assets/home/2.jpg" />
                <img className="imgComp" src="./src/assets/home/3.jpg" />
                <img className="imgComp" src="./src/assets/home/4.jpg" />
                <img className="imgComp" src="./src/assets/home/5.jpg" />
            </Box>
        </>
    )
}

export default Home
