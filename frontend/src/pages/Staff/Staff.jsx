import { Box, Container, Grid } from "@mui/material"
import "./Staff.css"

import { useEffect, useState } from "react"
import { getAllTeachers } from "../../services/teacher"
import Header from "../Home/Header/Header"

import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"

import ImageListItemBar from "@mui/material/ImageListItemBar"
import ListSubheader from "@mui/material/ListSubheader"

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
        <div className="staff">
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
                                OUR STAFF !!
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
                                    className="imgStaff"
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                {/* <ImageListItemBar
                                    className={`eachElement ${
                                        hoveredItem === index ? "hovered" : ""
                                    }`}
                                    title={
                                        hoveredItem !== index
                                            ? item.title
                                            : `${item.specialization}`
                                    }
                                    subtitle={
                                        hoveredItem !== index ? item.author : ""
                                    }
                                /> */}
                                <Box className="capa">
                                        <Box className='imgDescription'>
                                        <h3 className="tittleCard">
                                            {item.title} 
                                            <br/>
                                            {item.author}
                                        </h3>
                                        <p>{item.specialization}</p>
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
                        '@media screen and (max-width: 900px)': {
                            display: 'none',
                        }}}
                >
                    <img className="imgStaff2" src="./src/assets/teachers/All2.jpg" />
                </Grid>
            </Grid>
        </div>
        </>
    )
}

const itemData = [
    {
        img: "./src/assets/teachers/1.jpg",
        title: "Iratze",
        author: "Eizaguirre",
        specialization: "Pilates",

    },
    {
        img: "./src/assets/teachers/2.jpg",
        title: "Yeray",
        author: "Peñate Gil",
        specialization: "Body Pump",
    },
    {
        img: "./src/assets/teachers/3.jpeg",
        title: "Adrian",
        author: "Suarez",
        specialization: "Body Combat",
    },
    {
        img: "./src/assets/teachers/4.jpeg",
        title: "Diana",
        author: "Volskaya",
        specialization: "Ciclo Indoor",
    },
    {
        img: "./src/assets/teachers/5.jpg",
        title: "Romina",
        author: "Ojeda Brito",
        specialization: "Yoga",
    },
    {
        img: "./src/assets/teachers/6.jpg",
        title: "J-Antony",
        author: "León",
        specialization: "Body Pump",
    },
    {
        img: "./src/assets/teachers/7.jpeg",
        title: "Fer",
        author: "Martín",
        specialization: "Body Balance",
    },
    {
        img: "./src/assets/teachers/8.jpg",
        title: "Aitana",
        author: "Bonmatí",
        specialization: "Body Pump",
    },
    {
        img: "./src/assets/teachers/9.jpg",
        title: "Nisa",
        author: "Santana",
        specialization: "Bailes latinos",
    },
    {
        img: "./src/assets/teachers/10.jpg",
        title: "Alvaro",
        author: "García",
        specialization: "Bailes de salón",
    },
]

function Staff() {
    const [teachers, setTeachers] = useState([])
    async function allTeachers() {
        const result = await getAllTeachers()
        setTeachers(result)
        console.log(result)
    }

    useEffect(() => {
        allTeachers()
    }, [])

    return (
        <>
            <Container className="staffView">{TitlebarImageList()}</Container>
            <Header />
        </>
    )
}

export default Staff
