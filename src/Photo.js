import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Box, Container, Modal} from "@mui/material";
import { useState, useEffect } from "react";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {  CardActionArea, Grid , Typography, Button, Input} from '@mui/material';
// import { Modal} from 'react-bootstrap';


// import {Modal } from "antd";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


  
const api = 'https://dummyjson.com/products/search?q=';
const PhotoGallery = () => {
    const [image, setImage] = useState([]);
    const [searchP, setSearchP]  = useState("");
    const [error, setError]  = useState("");
    const handleSearch = (e) =>{
        setSearchP(e.target.value)
    }
    
        const fetchSearchPhoto = async () =>{
          try{
            setError('')
          const response = await fetch(`${api}${searchP}`)
          if (!response.ok) throw new Error ("not found")
          const data = await response.json()
          setImage(data.products)
          console.log(data.products)
          setError("")
          } catch (err) {
            setError(err.message)
          }
        }
        const searchButton = () =>{
          fetchSearchPhoto(searchP) 
        }
        useEffect(() => {
            fetchSearchPhoto()
        }, [searchP]);
    return (
        <div>
          <div className="container" style={{marginTop: 18}} >
          <Typography variant='h4'  style={{textAlign:"center", fontFamily:'initial', marginBottom: 9}}>PHOTO GALLERY</Typography>
            <div className="relative flex w-full gap-2 md:w-max" style={{ margin:"auto"}}>
            <Input className="pr-20"  
            onChange={handleSearch}
            type="search"
            variant="outlined"
            label = 'outlined'
             value={searchP} 
             containerProps = {{className: 'min-w-[228px]'}}
            style={{maxWidth: 400}}/>
            <Button onClick={searchButton} variant="contained"  size="sm" >
                  Search
                </Button>
            </div>
          </div>
          <Typography sx={{marginLeft: 3, marginTop: 4, marginBottom: 3}}>Showing Results for : <span style={{fontSize: 16, fontWeight: 'bold'}}>{searchP || "All"}</span></Typography>
            <div>
              {!error && < New news = {image}/>}           
            </div>
            
            </div>
    ) 
} 

function New ({news}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () =>setOpen(true);
 const handleClose = () => setOpen(false);
  return (
      <>
        <Container >
        <Grid container  spacing={3}>
        {news.map((item, index) => {
             return (
            <Grid item >
             <Card sx={{ maxWidth: 250, height: 150, marginLeft: 4}} key={index} 
                onClick={handleOpen}
              
               >
                <CardActionArea >
                  <CardMedia
                    component="img"
                    height="100"
                    image={ item.thumbnail}
                    alt=""
                  />
                  

                </CardActionArea>
              </Card>
              </Grid>
            ); 
            
        })}
        </Grid>
      </Container>
      
      
      
      </>
 )
      }

export default PhotoGallery;
