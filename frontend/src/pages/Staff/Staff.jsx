import { Box, Container, Grid, Typography } from "@mui/material"
import "./Staff.css"

import { useEffect, useState } from "react"
import { getAllTeachers } from "../../services/teacher"
import Header from "../Home/Header/Header"
import Footer from "../../components/footer/Footer"

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
                <Grid container spacing={2} className="staff1">
                    <Grid item xs={6}>
                        <ImageList
                            sx={{
                                height: 670,
                            }}
                        >
                            <ImageListItem key="Subheader" cols={2}>
                                <ListSubheader
                                    sx={{
                                        textAlign: "center",
                                        backgroundColor: "#444444",
                                        color: "#FFFFFF",
                                    }}
                                    component="div"
                                >
                                    WE STAFF !!
                                </ListSubheader>
                            </ImageListItem>
                            {itemData.map((item, index) => (
                                <ImageListItem
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        className={`eachElement ${
                                            hoveredItem === index
                                                ? "hovered"
                                                : ""
                                        }`}
                                        title={
                                            hoveredItem !== index
                                                ? item.title
                                                : `${item.specialization}`
                                        }
                                        subtitle={
                                            hoveredItem !== index
                                                ? item.author
                                                : ""
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        className="staff2"
                        sx={{
                            height: 700,
                        }}
                    >
                        <img src="./src/assets/teachers/All2.jpg" />
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
        rows: 2,
        cols: 2,
        featured: true,
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
        specialization: "Bailes",
    },
    {
        img: "./src/assets/teachers/9.jpg",
        title: "Nisa",
        author: "Santana",
        specialization: "Bailes",
    },
    {
        img: "./src/assets/teachers/10.jpg",
        title: "Alvaro",
        author: "García",
        specialization: "Bailes",
    },
]

function Staff() {
    const [teachers, setTeachers] = useState([])
    async function allTeachers() {
        const x = await getAllTeachers()
        setTeachers(x)
        console.log(x)
    }

    useEffect(() => {
        allTeachers()
    }, [])

    return (
        <>
            <Header />
            <Container className="staffView">{TitlebarImageList()}</Container>
        </>
    )
}

export default Staff
