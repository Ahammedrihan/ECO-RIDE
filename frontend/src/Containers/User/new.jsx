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
import validator from 'validator';
import { useForm } from "react-hook-form";
import {useState} from 'react';

import { useNavigate } from 'react-router-dom';

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

export default function Register() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  const [firstName, setName] = useState("")
  const [lastName, setLast] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('')

  const {register,handleSubmit,formState:{errors},watch}=useForm()
  
  const navigate = useNavigate();

  // const onSubmit = (event) => {
  //   // event.preventDefault();
  //   const fullPhone = phonePrefix + phone;}


    

// // Email Number Validation
//   const validateEmail =(e)=>{
//     var email = e.target.value;
//     if (validator.isEmail(email)){
//         console.log(email)
//         setEmail(email)
//         setEmailError('Valid Email');
//     }
//     else{

//       setEmailError('Enter valid Email!');
//     }
//   }

//   // Phone Number Validation
//   const validatePhone = (e) => {
//     var phone = e.target.value;

//     if (validator.isMobilePhone(phone, 'any', { strictMode: false }) && phone.minLength ===10) {
//       setPhone(phone)
//       setPhoneError('Valid Phone Number :)');
//     } else {
//       setPhoneError('Enter valid Phone Number!');
//     }
//   };

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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form"  onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  autoFocus
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                  inputProps={register("name", {
                    required: true,
                    minLength: 3,
                  })}
                 

                />
                {errors.name && errors.name.type === "required" &&(
                  <p className="text-xs italic text-red-500 error-signup" style={{color:"red",fontSize:"13px",margin:"9px 0px -0 14px"}}>
                     This Field is Required
                  </p>

                )}
                {errors.name && errors.name.type === "minLength" && (
                <p className="text-xs italic text-red-500 error-signup" style={{color:"red",fontSize:"13px",margin:"9px 0px -0 14px"}}>
                   Minimum 3 Characters Required
                </p>
              )}
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e)=>{
                    setLast(e.target.value)
                  }}
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                        }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ConfirmPassword"
                  type='password'
                  label="Confirm Password"
                  name="confirm password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}