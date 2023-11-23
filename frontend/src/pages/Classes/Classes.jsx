import { Box, Container, Grid, Typography } from "@mui/material"
import "./Classes.css"

import { useEffect, useState } from "react"
import Header from "../Home/Header/Header"

import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"

import ImageListItemBar from "@mui/material/ImageListItemBar"
import ListSubheader from "@mui/material/ListSubheader"
import { getAllClases } from "../../services/clase"

function TitlebarImageList() {
    const [hoveredItem, setHoveredItem] = useState("")

    const handleMouseEnter = (index) => {
        setHoveredItem(index)
    }

    const handleMouseLeave = () => {
        setHoveredItem()
    }

    return (
        <>
            <div className="clase">
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
                                    WE CLASSES !!
                                </ListSubheader>
                            </ImageListItem>
                            {itemData.map((item, index) => (
                                
                                <ImageListItem
                                    className="contenedor"
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    sx={{
                                        '@media screen and (max-width: 600px)': {
                                            width: '100%', 
                                        },
                                    }}
                                >
                                    <img
                                        className="imgClasses"
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        alt={item.clase}
                                        loading="lazy"
                                    />
{/*                                     <ImageListItemBar
                                        className={`eachElement ${
                                            hoveredItem === index
                                                ? "hovered"
                                                : ""
                                        }`}
                                        title={
                                            hoveredItem !== index ? (
                                                item.clase
                                            ) : (
                                                <Typography>
                                                    {item.description}
                                                </Typography>
                                            )
                                        }
                                    ></ImageListItemBar> */}
                                    <Box className="capa">
                                        <Box className='imgDescription'>
                                        <h3 className="tittleCard">
                                            {item.clase}
                                        </h3>
                                        <p>{item.description}</p>
                                        </Box>
                                    </Box>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                    <Grid
                        className="comp2"
                        item
                        xs={6}
                        sx={{
                            height: 700,
                        }}
                    >
                        <img className="imgClasses2" src="./src/assets/clases/primaryClases.jpg" />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

const itemData = [
    {
        img: "./src/assets/clases/pilates2.jpg",
        clase: "Pilates",
        description:
            "Pilates concentrates on strengthening the body with an emphasis on your posture, balance, and flexibility. ",
    },
    {
        img: "./src/assets/clases/yoga.webp",
        clase: "Yoga",
        description:
            "El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general. ",
    },
    {
        img: "./src/assets/clases/BP.jpg",
        clase: "Body Pump",
        description:
            "El body pump es un programa de entrenamiento físico que combina las actividades propias del aeróbic con trabajo muscular mediante la realización de ejercicios de levantamiento de pesas. ",
    },
    {
        img: "./src/assets/clases/BC.jpeg",
        clase: "Body Combat",
        description:
            "El body combat es un programa de ejercicios cardiovasculares que se realiza en grupo y consiste en realizar movimientos de diferentes artes marciales ",
    },
    {
        img: "./src/assets/clases/BB2.jpg",
        clase: "Body Balance",
        description:
            "Pilates concentrates on strengthening the body with an emphasis on your posture, balance, and flexibility. ",
    },
    {
        img: "./src/assets/clases/CI.jpg",
        clase: "Ciclo Indoor",
        description:
            "Pilates concentrates on strengthening the body with an emphasis on your posture, balance, and flexibility. ",
    },
    {
        img: "./src/assets/clases/BS1.jpg",
        clase: "Bailes latinos",
        description:
            "Pilates concentrates on strengthening the body with an emphasis on your posture, balance, and flexibility. ",
    },
    {
        img: "./src/assets/clases/BL.jpg",
        clase: "Bailes de salón",
        description:
            "Pilates concentrates on strengthening the body with an emphasis on your posture, balance, and flexibility. ",
    },
]

function Classes() {
    const [classes, setClasses] = useState([])
    async function allClasses() {
        const x = await getAllClases()
        setClasses(x)
    }

    useEffect(() => {
        allClasses()
    }, [])

    return (
        <>
            <Header />
            <Container className="staffView">{TitlebarImageList()}</Container>
        </>
    )
}

export default Classes
