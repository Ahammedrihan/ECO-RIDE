import React from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./RequestRide.css"

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
import {useDispatch ,useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode'
import Swal from "sweetalert2";







function RequestRide() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="left" style={{paddingTop:"40px",paddingLeft:""}}>
          <div>
          <Card style={{ borderColor: 'grey', borderWidth: '2px', borderStyle: 'solid' }}>
              <CardContent>
                <Typography sx={{ fontSize: 20, fontWeight: 700, lineHeight: 2, color: 'black' }} color="text.secondary" gutterBottom>
                  Make your ride
                </Typography>
                <Typography color="text.secondary">
                  Enter your Destination
                </Typography> 
           

<div style={{margin:"20px"}}>
        <Box
          sx={{
         
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
         
          <Typography component="h5" variant="h5">
            
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="from"
              label="from"
              name="from"
              autoComplete="=from"
             
             
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              
          
           
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              style={{backgroundColor:"#000"}}
            >
              Stat 
            </Button>
           
     
          </Box>
        </Box>
        </div>

 



               
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        </div>
        <div className="right" style={{padding:"20px"}}>
          <h1> right</h1>
        </div>
      </div>
    </>
  );
}

export default RequestRide;




