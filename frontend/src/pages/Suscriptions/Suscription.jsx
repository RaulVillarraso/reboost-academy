import "./Suscription.css"

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Container, Grid } from "@mui/material";
import Header from "../Home/Header/Header";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const item = [
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
    }]

function BasicStack() {
  return (
    <>
    <Box sx={{ width: '40%'}}>
        <Grid><img src={item.img}/></Grid>
        <Item>Item 2</Item>
        <Item>Item 3</Item>  
    </Box>
    </>  
  );
}




export default function Suscription() {
    return (
        <>
        <Header/>
        <Container id="suscription">{BasicStack()}</Container>
        </>
    )
}