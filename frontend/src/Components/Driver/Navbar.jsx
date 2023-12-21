
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Store from '../../../Redux/store/store';
import { selectDriver } from '../../../Redux/slices/driverSlice/driverauthSlice';
import { useDispatch } from 'react-redux';
import { driverLogout } from '../../../Redux/slices/driverSlice/driverauthSlice';
import axios from '../../Utils/axios';


const pages = ['Register', 'Pricing', 'Blog'];


function Navbar() {
  const driver = useSelector(selectDriver);
  const refresh_token = driver.data.refresh
  const accesstoken = driver.data.access

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch()



  let settings = [];
  if (driver) {
    settings = [
      { id: 1, text: 'Profile', path: '/driver/profile' },
      { id: 2, text: 'Logout', path: '/driver/login' },
    ];
  } else {
    settings = [
      { id: 2, text: 'Login', path: '/login' },
  
    ];
  }
  
 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };






  // 
//     await axios.post(
//       `${apiUrl}/authentification/logout/`,
//       {
//         refresh_token: localStorage.getItem("refresh_token"),
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         withCredentials: true,
//       }
//     );

//     localStorage.clear();
//     axios.defaults.headers.common["Authorization"] = null;

//     dispatch(logoutSuccess());

//     window.location.href = "/login";
//   } catch (e) {
//     console.log("logout not working", e);
//   }
// };

  const handleMenuItemClick = async(settings)=>{
    if (settings.text === "Logout"){
      dispatch(driverLogout())


      await axios.post(`api/user/logout/`,{refresh_token},{
        headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer ${accesstoken}`
        }
      }).then((response)=>{
        if(response.status === 205){
          console.log("logout sucess and blacklisted")
          localStorage.removeItem("userData")
          localStorage.clear()

        }else{
          console.log("balck list not done")
        }
      })

      
      
      
    }
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            eco-ride
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            eco-ride
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                  <Link to={setting.path} key={setting.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem  onClick={handleCloseUserMenu} >
                  <Typography textAlign="center">  
                      <Link to={setting.path} key={setting.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <MenuItem  onClick={()=>handleMenuItemClick(setting)}>
                            <Typography textAlign="center">{setting.text} </Typography>
                          </MenuItem>
                      </Link>
                  </Typography>
                </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
