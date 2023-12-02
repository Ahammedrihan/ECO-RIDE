import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./RequestRide.css";
import axios from "../../../Utils/axios";
import { useSelector } from "react-redux";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

function RequestRide() {
  const userStoreData = useSelector((store) => store.authuser.userData);
  const userId = userStoreData.user.user_id;
  const userAccessToken = userStoreData.data.access;

  const [activerDrivers, setActiveDrivers] = useState([]);
  const [activeDriversTrue, setActiveDriversTrue] = useState(false);
  console.log(activerDrivers, "drrrrrr");

  const handleShowNearByDrivers = async () => {
    const repsonse = await axios
      .get(`api/user/nearby-drivers/${userId}/`, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("sucess");
          console.log(response);

          console.log(response.data);
          console.log(JSON.stringify(response.data));
          setActiveDrivers(JSON.stringify(response.data));
          setActiveDriversTrue(true);
        } else {
          console.log("failed");
        }
      })
      .catch((error) => {
        console.log(error, "erorrrrrr");
      });
  };
  return (
    <>
      <Navbar />
      <div className="container" style={{ display: "flex" }}>
        <div className="left" style={{ width: "700px", paddingTop: "20px", marginRight: "60px",marginLeft:0 }}>
          <MapComponent />
          {/* <MapComponent showNearByDriverFunction={handleShowNearByDrivers} /> */}
        </div>
  
        <div className="right" style={{ paddingTop: "20px" }}>
          <Card
            style={{
              borderColor: "black",
              borderWidth: "2px",
              borderStyle: "solid",
              width: "350px", // Adjust the width as needed
              borderRadius:"20px"
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  lineHeight: 2,
                  color: "black",
                }}
                color="text.secondary"
                gutterBottom
              >
                Make your ride
              </Typography>
              {/* <Typography color="text.secondary">
              </Typography>
   */}
              <div style={{ margin: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h5" variant="h5"></Typography>
                  <Box component="form" >
                    <TextField
                      margin="normal"
                      
                      fullWidth
                      id="from"
                      label="from"
                      name="from"
                      autoComplete="=from"
                      autoFocus
                      style={{  borderRadius: "20px",height: "40px"  }}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="destination"
                      label="destination"
                      type="destination"
                      id="destination"
                      autoComplete="current-password"
                      InputProps={{ readOnly: true }}
                    />
  
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                       style={{backgroundColor:"#000"}}
                    >
                      Start
                    </Button>
                  </Box>
                </Box>
              </div>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <div>
            <h3>Click here to see Nearby drivers</h3>
            <button
              style={{ backgroundColor: "#000" }}
              // onClick={handleShowNearByDrivers}
            >
              Show Drivers
            </button>
          </div>
        </div>
      </div>
    </>
  );
                }

export default RequestRide;

export const MapComponent = (props) => {

  
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWhhbW1lZHJpaGFuY20iLCJhIjoiY2xuc2x5cHpyMWx4NjJ2cGYzcTl5czgyZSJ9.86pNM73M4mvOfyaDjOJ4ZA";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [76.4901, 9.9425176],
      zoom: 13,
    });
    // map.addControl(
    //   new MapboxDirections({
    //     accessToken : mapboxgl.accessToken,
    //   }),
    //   "top-left"
    // );

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.addControl(directions, "top-left");
    directions.on("route", (e) => {
      const origin = directions.getOrigin();
      const destination = directions.getDestination();

      if (origin && origin.geometry && origin.geometry.coordinates) {
        console.log("From:", origin.geometry.coordinates);
        geocodeLocation(origin.geometry.coordinates);
      }

      if (destination &&destination.geometry &&destination.geometry.coordinates
      ) {
        console.log("To:", destination.geometry.coordinates);
        geocodeLocation(destination.geometry.coordinates);
      }
    });

    const  drivers =[{"long":" 10.023286","lat":" 76.311371"},{"lat":"76.49010000000000000000","long":"9.78270000000000000000 "}]
   
    drivers.map((driver)=>{

    const marker = new mapboxgl.Marker()
      .setLngLat([driver.lat,driver.long])
      .addTo(map);

      const popup = new mapboxgl.Popup().setHTML(
        `<div>
        <UserMapProfile driver={driver}/>
        </div>`
      );

      

    marker.setPopup(popup);
    marker.getElement().addEventListener("mouseenter",()=>{
      popup.addTo(map)
    })
    marker.getElement().addEventListener("mouseleave",()=>{
      popup.remove()
    })

  })
    return () => {
      map.remove();
    };

   
  }, []);


  // useEffect(()=>{

  //   props.showNearByDriverFunction()

  // },[])

  const geocodeLocation = (coordinates) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const locationName = data.features[0].place_name;
          const hello = data;
          console.log("Location Name:", locationName);
          console.log("data:", hello);
        }
      })
      .catch((error) => console.error("Geocoding Error:", error));
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "500px" }} />
    </div>
  );
};



// const UserMapProfile = (props)=>{
//   return(
//     <>
//     <Card>
//   <Box sx={{ p: 2, display: 'flex' }}>
//     <Avatar variant="rounded" src="avatar.jpg" />
//     <Stack spacing={0.5}>
//       <Typography fontWeight="bold">{props.driver.lat}</Typography>  
//       <Typography variant="body2" color="text.secondary">
//       <LocationOn sx={{color: grey[500]}} /> Scranton, PA, United States
//       </Typography>
//     </Stack>
//     <IconButton size="small">
//       <Edit fontSize="small" />
//     </IconButton>
//   </Box>
//   <Divider />
//   <Stack
//     direction="row"
//     alignItems="center"
//     justifyContent="space-between"
//     sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
//   >
//     <Chip
//       label={active ? 'Active account' : 'Inactive account'}
//       color={active ? 'success' : 'default'}
//       size="small"
//     />
//     <Switch />
//   </Stack>
// </Card>

//     </>
//   )
// }