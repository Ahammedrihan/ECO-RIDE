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


import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';


import Modal from '@mui/material/Modal';
import NestedModal from "../../../Components/User/ScheduleRide";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



function RequestRide() {
  const userStoreData = useSelector((store) => store.authuser.userData);
  const userId = userStoreData.user.user_id;
  const userAccessToken = userStoreData.data.access;

  const [activerDrivers, setActiveDrivers] = useState([]);
  const [activeDriversTrue, setActiveDriversTrue] = useState(false);

  const [OrginLocationPropPassedDataforForm,setOrginLocationPropPassedDataforForm] = useState(null)
  const [DestinationLocationPropPassedDataforForm,setDestinationLocationPropPassedDataforForm] = useState(null)

  const [userSelectDefaultAddressData,setUserSelectDefaultAddressData] = useState({
    geometry : {
      coordinates : []
    }
  })
  const [userSelectDefaultAddress,setUserSelectDefaultAddress] = useState(false)
  const [ismodalOpen,IssetModalOpen] = useState(false)


  const handleShowNearByDrivers = async () => {
    const repsonse = await axios
      .get(`api/user/nearby-drivers/${userId}/`, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
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

  useEffect(()=>{

    const UserDeaultAddressFetch = async()=>{

      await axios.get("api/user/user-default-address",{
        headers:{
          Authorization: `Bearer ${userAccessToken}`
        }
      }).then((response)=>{
        if(response.status === 200){
          console.log("default address")
          console.log(response.data,"default address")
          const { latitude, longitude } = response.data;

          setUserSelectDefaultAddressData({
            geometry : {
              coordinates : [longitude,latitude]
            }
          })

        }else{
          console.log(" address failed")
        }
      }).catch((error)=>{
        console.log("error address :" ,error)
      })
  
    }
    UserDeaultAddressFetch()
  

  },[])

  const locationDataForForm = (orgin,destination)=>{
    setOrginLocationPropPassedDataforForm(orgin)
    setDestinationLocationPropPassedDataforForm(destination)
  }

  const handleUserSelectDeaultAddress = () => {
 
    setUserSelectDefaultAddress((prev)=>!prev)
  };

  const handleScheduleForLatterModalOpen = ()=>{
    IssetModalOpen(true)
  }

  const handleScheduleForLatterModalClose = ()=>{
    IssetModalOpen(false)
  
  }

  return (
    <>
      <Navbar />
      <div className="containerFluid" style={{ display: "flex" }}>
        <div className="left" style={{ width: "600px", paddingTop: "20px", marginRight: "60px",marginLeft:0 }}>
          <MapComponent  locationDataForForm = {locationDataForForm} userSelectDefaultAddress = {userSelectDefaultAddress} userSelectDefaultAddressData={userSelectDefaultAddressData}/>
        </div>
  
        <div className="right" style={{ paddingTop: "20px" }}>
          <Card
            style={{
              borderColor: "black",
              borderWidth: "2px",
              borderStyle: "solid",
              width: "350px",
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

              <Typography color="text.secondary">
                Set default address as  starting point

              {/* <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
                > */}
                {/* <Chip
                  // label={active ? 'Active account' : 'Inactive account'}
                  // color={active ? 'success' : 'default'}
                  size="small"
                /> */}
                {/* <Switch onClick={handleUserSelectDeaultAddress} /> */}
                {userSelectDefaultAddress ?
                 ( <button onClick={handleUserSelectDeaultAddress}>true</button>):
                 (<button onClick={handleUserSelectDeaultAddress}>false</button>)}
              {/* </Stack> */}

              </Typography>
  
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
                      value={OrginLocationPropPassedDataforForm ? OrginLocationPropPassedDataforForm.name : " "}
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
                      value={DestinationLocationPropPassedDataforForm ? DestinationLocationPropPassedDataforForm.name : " "}
                      name="destination"
                      label="destination"
                      type="destination"
                      autoFocus
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
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      style={{backgroundColor:"#000"}}
                      onClick={((e)=>{
                         e.preventDefault()
                         handleScheduleForLatterModalOpen()
                      })}
                    > { ismodalOpen &&(<div>
                      <NestedModal/>
                    </div>)}
                  set
                    </Button>
                    
                  </Box>
                </Box>
         
                    



              </div>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
          <div>
            <h3>Click here to see Nearby drivers</h3>
            <button
              style={{ backgroundColor: "#000" }}
              onClick={handleShowNearByDrivers}
            >
              Show Drivers
            </button>
          </div>
        </div>
      </div>
    </>
  );
                }





// function ChildModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button onClick={handleOpen}>Open Child Modal</Button>
//       <Modal
//         open={ismodalOpen}
//         onClose={handleScheduleForLatterModalClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...style, width: 200 }}>
//           <h2 id="child-modal-title">Text in a child modal</h2>
//           <p id="child-modal-description">
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//           </p>
//           <Button onClick={handleScheduleForLatterModalClose}>Close Child Modal</Button>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

 
 

    
export default RequestRide;

export const MapComponent = (props) => {

  const {locationDataForForm ,userSelectDefaultAddress,userSelectDefaultAddressData} = props
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);





  // console.log(originLocation)
  // console.log(destinationLocation)


  const sentLocationDataToForm = ()=>{
    locationDataForForm(originLocation,destinationLocation)
    console.log(originLocation,"ORGIN LOCATION")
  }

  
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWhhbW1lZHJpaGFuY20iLCJhIjoiY2xuc2x5cHpyMWx4NjJ2cGYzcTl5czgyZSJ9.86pNM73M4mvOfyaDjOJ4ZA";

      const defaultStartingPoint = [76.4901, 9.9425176];
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: defaultStartingPoint,
      zoom: 13,
    });
   

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.addControl(directions, "top-left");
    directions.on("route", (e) => {
      // let origin;
      // if (props.userSelectDefaultAddress){
      //   origin  = props.userSelectDefaultAddressData;
      //   console.log(origin,"INSIDE THE IF CONDITION ")

      // }else{
      //   origin = directions.getOrigin();
      //   console.log(origin,"INDEISE")
        
      // }
      console.log(userSelectDefaultAddress ,"hhhhhh")
      const origin = userSelectDefaultAddress ? userSelectDefaultAddressData : directions.getOrigin()
       
      console.log(origin,"this is the orgin")
      const destination = directions.getDestination();
      console.log("destination",destination)

    const fromCoordinates = origin ? origin.geometry.coordinates : defaultStartingPoint;



      if (origin && origin.geometry && origin.geometry.coordinates) {
        console.log("From:", origin.geometry.coordinates);
        geocodeLocation(origin.geometry.coordinates,setOriginLocation);
      }

      if (destination &&destination.geometry &&destination.geometry.coordinates
      ) {
        console.log("To:", destination.geometry.coordinates);
        geocodeLocation(destination.geometry.coordinates,setDestinationLocation);
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

   
  }, [userSelectDefaultAddress]);


  // useEffect(()=>{

  //   props.showNearByDriverFunction()

  // },[])


    const geocodeLocation = (coordinates,setLocation) => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.features && data.features.length > 0) {
            const locationName = data.features[0].place_name;
  
            const splitData = locationName.split(", ");
            const name = splitData[0];
            const street = splitData[1];
            const city = splitData[2];
            const state = splitData[3];
            const postalCode = splitData[4];
    
            // Update the state with the trimmed and split data
            setLocation({
              name,
              street,
              city,
              state,
              postalCode,
            });
              

          
          }
        })
        .catch((error) => console.error("Geocoding Error:", error));
    };

    useEffect(()=>{
      sentLocationDataToForm ()
    },[originLocation,destinationLocation])

 

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "500px" }} />
    </div>
  );
};
