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
import axios from '../../Utils/axios'
import jwt_decode from 'jwt-decode'
import { userLoginUrl } from '../../Utils/urls';
import { userLogin } from '../../../Redux/slices/userSlice/authSlice';
import Swal from "sweetalert2";
import { GoogleLogin } from '@react-oauth/google';
import  { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { display } from '@mui/system';





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



export default function SignIn() {

  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      email,
      password

    })
    axios.post(userLoginUrl,data ,{
      headers:{"Content-Type":"application/json"}})

    .then((response)=>{
      console.log(response,"adfadfafafafaafafafafafaddfafafafadfaddfadfafadfa")

      if (response.status === 200){
        const decodeUser = jwt_decode(response.data.access) 
        console.log(decodeUser,"user details")  

        if (decodeUser.role == "user"){
          console.log(decodeUser.email,"jjjjjjjjjjjjjj")
          dispatch(userLogin({user:decodeUser,...response}))
          navigate('/')

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
          <Typography component="h1" variant="h5">
            Sign in
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>

              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          <Google/>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


export function Google() {
  const [userData,setUserData] = useState("")
    const responseMessage = (response) => {
      if (response && response.credential){
        const data = jwt_decode(response.credential)
        console.log(response)
        console.log(response.credential)
        console.log(data)
      }
      

    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
      <>
        <div className='align-item-center' style={{display:'flex',justifyContent: "center" ,alignItems : 'center',height: '25vh'}}>
           {/* style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  */}
            <br />
            <br />
            <GoogleLogin onSuccess={responseMessage} shape="circle"  onError={errorMessage} />
            {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
            </div>
            {/* <GoogleLogin onSuccess={responseMessage}  theme="filled_black" text="signup_with" shape="circle" onError={errorMessage} /> */}
</> 
    )
};






// export function Second() {
//     const [ user, setUser ] = useState([]);
//     const [ profile, setProfile ] = useState([]);

//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => {setUser(codeResponse),console.log(codeResponse,"code respoc")},
        
//         onError: (error) => console.log('Login Failed:', error)
//     });

//     useEffect(
//         () => {
//             if (user) {
//                 axiosOr
//                     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                         headers: {
//                             Authorization: `Bearer ${user.access_token}`,
//                             Accept: 'application/json'
//                         }
//                     })
//                     .then((res) => {
//                         setProfile(res.data)
//                         console.log(res.data)
                        
//                     })
//                     .catch((err) => console.log(err,"erorrrrrrrrr"));
//             }
//         },
//         [ user ]
//     );

//     // log out function to log the user out of google and set the profile array to null
//     const logOut = () => {
//         googleLogout();
//         setProfile(null);
//     };

//     return (
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             {profile ? (
//                 <div>
//                     <img src={profile.picture} alt="user image" />
//                     <h3>User Logged in</h3>
//                     <p>Name: {profile.name}</p>
//                     <p>Email Address: {profile.email}</p>
//                     <br />
//                     <br />
//                     <button onClick={logOut}>Log out</button>
//                 </div>
//             ) : (
//                 <button onClick={() => login()}>Sign in with Google 🚀 </button>
//             )}
//         </div>
//     );
// }
