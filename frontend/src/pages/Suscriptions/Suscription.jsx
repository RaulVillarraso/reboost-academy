import "./Suscription.css"

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    ImageList,
    ImageListItem,
    ListSubheader,
    Typography,
} from "@mui/material"
import Header from "../Home/Header/Header"
import { useEffect, useState } from "react"
import { getAllSuscriptions } from "../../services/suscription"
import { Link } from "react-router-dom"

function Method() {
    const [suscriptions, setSuscriptions] = useState([])

    async function getSuscriptions() {
        try {
            const result = await getAllSuscriptions()
            setSuscriptions(result)
            console.log(result)
        } catch (error) {
            console.error("Error fetching suscriptions:", error)
        }
    }

    useEffect(() => {
        getSuscriptions()
    }, [])
    const [hoveredItem, setHoveredItem] = useState("")

    const handleMouseEnter = (index) => {
        setHoveredItem(index)
    }

    const handleMouseLeave = () => {
        setHoveredItem()
    }

    return (
        <div className="suscriptionpag">
            <Grid container spacing={2} className="comp1">
                <Grid item xs={8} md={6}>
                    <ImageList
                        sx={{
                            height: 670,
                        }}
                    >
                        <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader
                                sx={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    backgroundColor: "#444444",
                                    color: "#FFFFFF",
                                }}
                                component="text"
                            >
                                WE SUSCRIPTIONS !!
                            </ListSubheader>
                        </ImageListItem>
                        {suscriptions.map((suscription, index) => (
                            <ImageListItem
                                className="contenedor"
                                key={index}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                sx={{
                                    "@media screen and (max-width: 600px)": {
                                        width: "100%",
                                    },
                                }}
                            >
                                <img
                                    className="imgSuscription"
                                    srcSet={`${suscription.suscription_Img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${suscription.suscription_Img}?w=248&fit=crop&auto=format`}
                                    alt={suscription.suscription_Img}
                                    loading="lazy"
                                />
                                <Box className="capa">
                                    <Box className="imgDescription">
                                        <h3 className="tittleCard">
                                            {suscription.suscription_Type}
                                        </h3>
                                        <p>{suscription.suscription_Description}</p>
                                        <Link to={suscription.suscription_pay}>
                                            <Button variant="outlined">
                                                Buy now
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
                <Grid
                    item
                    xs={6}
                    className="comp2"
                    sx={{
                        height: 700,
                        "@media screen and (max-width: 900px)": {
                            display: "none",
                        },
                    }}
                >
                    <img
                        className="imgSuscription2"
                        src="./src/assets/suscriptions/All3.jpg"
                    />
                </Grid>
            </Grid>
{/*             {suscriptions.map((subscription) => (
                <Card key={subscription.id} sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={subscription.suscription_Img}  
                        title={subscription.suscription_Type}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {subscription.suscription_Type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            description
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Buy</Button>
                    </CardActions>
                </Card>
            ))} */}
        </div>
    )
}

export default function Suscription() {
    return (
        <>
            <Container className="method">{Method()}</Container>
            <Header />
        </>
    )
}

/* 
Description: "Acceso a todas las clases disponibles durante todo el mes y además acceso a contenido multimedia"
mensual: https://buy.stripe.com/test_bIYcQFeJe4NVeMUbIJ
trimestral: https://buy.stripe.com/test_fZe6sh1Ws94b48g6oq
anual: https://buy.stripe.com/test_cN2cQF7gMfszfQY8wz
semestral: https://buy.stripe.com/test_fZe6sh1Ws94b48g6oq
 */
