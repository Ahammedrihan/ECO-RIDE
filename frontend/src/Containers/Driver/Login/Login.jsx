import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
import {useDispatch ,useSelector} from 'react-redux'
import axios from '../../../Utils/axios'
import jwt_decode from 'jwt-decode'
import Swal from "sweetalert2";
import { driverLoginUrl } from '../../../Utils/urls';
import { driverLogin } from '../../../../Redux/slices/driverSlice/driverauthSlice';
import {useEffect} from  'react'




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();



export default function DriverLogin() {

  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [driverLoggedIn, setDriverLoggegIn]  = React.useState(false)

  const driver = useSelector((state)=>state.driverauth.driverData)

  useEffect(()=>{
    const checkDriverLoggedIn = ()=>{
      if(driver){
        setDriverLoggegIn(true)
        console.log("dnflkd")
      }else{
        setDriverLoggegIn(false)
       
      }
    }
    checkDriverLoggedIn()
  },[driver])

{ if(driverLoggedIn){
  navigate("/driver/home")
}else{

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      email,
      password

    })
    axios.post(driverLoginUrl,data ,{
      headers:{"Content-Type":"application/json"}})

    .then((response)=>{

      if (response.status === 200){
        console.log(response.data.access,"ACESSSSSS")
        const decodeUser = jwt_decode(response.data.access) 
        console.log(decodeUser,"user details")    
        if (decodeUser.role == "driver"){
          console.log(decodeUser.email,"jjjjjjjjjjjjjj")
          dispatch(driverLogin({driver:decodeUser,...response}))
          navigate('/driver/home')

          Swal.fire({
            title: 'Success!',
            text: 'logged in',
            icon: 'success'
          })
        }
        else{
          Swal.fire({
            title: 'No permission!',
            text: 'Try Again',
            icon: 'error'
          })}
     

      }
      else{
        Swal.fire({
          title: 'Invalid Credentials!',
          text: 'Try Again',
          icon: 'error'
        })
    
      }
    }).catch((error) => {
      console.log('Error occurred during login:', error.data);
      Swal.fire({
        title: 'Invalid Credentials!',
        text: 'Try Again',
        icon: 'error'
      })
    });
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Driver Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
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
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {/* style={{backgroundColor:"#000"}} */}
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" >
                {/* style={{textDecoration: 'none',color:"black"}} */}
                  Forgot password?
                </Link>
              </Grid>

              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


}}



 