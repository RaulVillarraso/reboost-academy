import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard(props) {
    
const { nameEvent ,dateStartEvent, dateEndEvent,classNameEvent,imageclass} = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="330"
          image={imageclass}
          style={{ width: '100%', objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nameEvent}
            
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
           Empieza: {dateStartEvent}
          
           <br />
            Termina: {dateEndEvent}
            
            <br />
            { localStorage.getItem("rol") === "Admin" && (
            <Typography gutterBottom variant="h8" component="div">
            Clase : {classNameEvent}
            </Typography>)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          More info
        </Button>
      </CardActions>
    </Card>
  );
}