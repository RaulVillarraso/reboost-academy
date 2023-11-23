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

function BasicStack() {
  return (
    <>
    <Box sx={{ width: '40%'}}>
        <Grid><img src="https://developer.mozilla.org/pimg/aHR0cHM6Ly9zLnprY2RuLm5ldC9BZHZlcnRpc2Vycy85YTJmZjZhZGY5ZDk0ZGE5OThjMjc5N2U5N2I4ZGQzZi5qcGc%3D.LyI%2B%2BL%2FItk0dM53FI2%2Bn%2FxeKyzO9opZdObAXH2PqT%2Fs%3D"/></Grid>
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