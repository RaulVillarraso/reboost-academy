import { Box, Container, Typography } from "@mui/material"
import "./Staff.css"

import React, { useEffect, useState } from 'react'
import { getAllTeachers } from "../../services/teacher"
import Header from "../Home/Header/Header"

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



 function MasonryImageList() {
  return (
    <Box sx={{ width: 800, height: 200, position: "absolute", top: 150}}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: './src/assets/teachers/1.jpg',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },


];

function Staff() {
    const [teachers, setTeachers] = useState([])
    async function allTeachers(){
        const x = await getAllTeachers()
        setTeachers(x)
        console.log(x)
    }

    useEffect(()=>{
        allTeachers()
    },[])

    

  return (
    <>
    <Header/>

    <Box>
        <Typography className="msg">We staff!</Typography>    
    </Box>

    <Container>
    {MasonryImageList()}
    </Container>
</>
  )
}

export default Staff