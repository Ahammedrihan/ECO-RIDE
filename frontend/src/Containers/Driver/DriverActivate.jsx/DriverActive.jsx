import React, { useEffect, useState } from "react";
import LocationComponent from "../../../Components/geoLocation/LocationComponent";
import axios from "../../../Utils/axios";
// import {driverLocationSetActive} from "../../../Utils/urls"
import Navbar from "../../../Components/Driver/Navbar";
import SecondNavbar from "../../../Components/Driver/SecondNavbar";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import mapboxgl from "mapbox-gl";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import img from "../../../../src/assets/Taxi2.jpg";
import "./DriverActivate.css";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';



function DriverActive() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWhhbW1lZHJpaGFuY20iLCJhIjoiY2xuc2x5cHpyMWx4NjJ2cGYzcTl5czgyZSJ9.86pNM73M4mvOfyaDjOJ4ZA";

  const [driverCurrentLocation, setDriverCurrentLocation] = useState(false);
  const driverStoreDataFetch = useSelector( (state) => state.driverauth.driverData);
  const driverId = driverStoreDataFetch.driver.user_id;
  const accessToken = driverStoreDataFetch.data.access;
  const [locationDetailsInWords, setLocationDetailsInWords] = useState(null);
  const [selectedAddressType, setSelectedAddressType] = useState();
  const [live, setLive] = useState(false);
  const [tripDetails, setTripDetails] = useState(null);
  console.log(tripDetails,"@@@@@@@@@@@@@@@@@@@@")
  const [storeLocationInfo, setStoreLocationInfo] = useState(null);
  const [rideStatus,setRideStatus] = useState(null)
  const [locationDetails, setLocationDetails] = useState({
    geometry: {
      coordinates: [],
    },
  });
  const [userLocationData, setUserLocationData] = useState({
    latitude: "",
    longitude: "",
  });


  useEffect(() => {
    if (locationDetailsInWords) {
      const locationDetailsInWordsString = JSON.stringify(
        locationDetailsInWords
      );
      localStorage.setItem("locationData", locationDetailsInWordsString);
      const storedLocationData = localStorage.getItem("locationData");
      const parsedData = JSON.parse(storedLocationData);
      setStoreLocationInfo(parsedData);
    }
  }, [locationDetailsInWords]);


  useEffect(() => {
    const storedLocationData = localStorage.getItem("locationData");
    if (storedLocationData) {
      const parsedData = JSON.parse(storedLocationData);
      setStoreLocationInfo(parsedData);
    }
    const getUserActiveOrNot = async () => {
      await axios
        .get("api/driver/driver/set-active-drivers/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("driver active on table");
            setLive(true);
          }
          if (response.status === 226) {
            console.log("some error");
            setLive(false);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setLive(false);
        });
    };
    getUserActiveOrNot();
    getDriverInTripOrNot();
  }, []);


  const buttonClickToSetCurrentLocation = () => {
    setDriverCurrentLocation(true);
    setSelectedAddressType("current");
  };

  const getLatLang = (latitude, longitude) => {
    console.log(latitude, longitude, "lskdldkmc");
    setUserLocationData({
      latitude: latitude,
      longitude: longitude,
    });
    setLocationDetails({
      geometry: {
        coordinates: [longitude, latitude],
      },
    });
  };

  const buttonClickToSetDefaultAddress = async () => {
    const response = await axios
      .get(`api/driver/driver/default-address/${driverId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setUserLocationData({
            latitude: response.data.latitude,
            longitude: response.data.longitude,
          });
          setLocationDetails({
            geometry: {
              coordinates: [longitude, latitude],
            },
          });
          setSelectedAddressType("default");
        } else {
          console.log(response.error);
        }
      })
      .catch((error) => {
        console.log("error:", error);
        if (error && error.response) {
          const reason = error.response.data.message;
          Swal.fire({
            title: reason,
            text: "Add default address in profile",
            icon: "error",
          });
        }
      });
  };



  const addressConfirmation = async () => {
    if (userLocationData.latitude === "" && userLocationData.longitude === "") {
      Swal.fire({
        title: "Select Address First",
        text: "Choose your address before proceeding for live",
        icon: "error",
      });
    } else {
      const response = await axios
        .post(`api/driver/driver/set-active-drivers/`, userLocationData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            console.log(response);

            setLive(true);
            console.log("success");
            LocationConverter(
              locationDetails.geometry.coordinates,
              setLocationDetailsInWords
            );
            Swal.fire({
              title: "Success!",
              text: "Your Location is Active",
              icon: "success",
            });
          }
          if (response.status === 204) {
            Swal.fire({
              title: "Not allowed to add Multiple address",
              text: "Address Already Added",
              icon: "error",
            });
          } else {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log("error:", error);
          if (error.response) {
            const reason = error.response.data.message;
            const status = error.status;
            if (reason == "Vehicle not found") {
              Swal.fire({
                title: reason,
                text: "Add vehicle before live",
                icon: "error",
              });
            }
          }
        });
    }
  };

  const LocationConverter = (coordinates, setLocation) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "THS I STHE DATA");
        if (data.features && data.features.length > 0) {
          const locationName = data.features[0].place_name;

          const splitData = locationName.split(", ");
          const name = splitData[0];
          const street = splitData[1];
          const city = splitData[2];
          const state = splitData[3];
          const postalCode = splitData[4];
          const coordinates = data.query;

          setLocation({
            name,
            street,
            city,
            state,
            postalCode,
            coordinates,
          });
        }
      })
      .catch((error) => console.error("Geocoding Error:", error));
  };

  const addressDeletion = async () => {
    const response = await axios
      .patch(`api/driver/driver/set-active-drivers/`, userLocationData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setLive(false);
          console.log("success");
          Swal.fire({
            title: "Success!",
            text: "Your Location is Not Live Now",
            icon: "success",
          });
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log("error:", error);
        const reson = error.response.data.message;
      });
  };

  const getDriverInTripOrNot = async () => {
    await axios
      .get("api/driver/driver/trip-data/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("yes driver is in a trip");
          setTripDetails(response.data);
        }
        if (response.status === 204) {
          console.log("no driver not in trips");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };


  const handleTripStatus = async()=>{
    await axios.get('api/driver/driver/trip-status-button/',{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) =>{
      if (response.status === 201){
        console.log(response.data,"!!!!!!!!!!!!!")
        getDriverInTripOrNot()
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  const handleHaveYouCollectMoney = async()=>{
    await axios.post('api/driver/driver/finish-trip/',{},{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response)=>{
      if (response.status === 200){
        console.log(response)
        getDriverInTripOrNot()
        setTripDetails(null)
      }else{
        console.log(response)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }


  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${img})`,
          height: "800px",
        }}
      >
        <div className="container">
          <div className="left">
            <Card
              style={{
                borderColor: "black",
                borderWidth: "2px",
                padding: "10px",
                width: "350px",

                borderRadius: "20px",
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
                ></Typography>

                {live ? (
                  <Typography
                    color="text.secondary"
                    style={{ textAlign: "center" }}
                  >
                    Click on the button to stop live
                  </Typography>
                ) : (
                  <>
                    <Typography
                      color="text.secondary"
                      style={{ textAlign: "center" }}
                    >
                      Click on the button to start live
                    </Typography>

                    <br></br>
                    <LocationComponent getLatLang={getLatLang} />
                  </>
                )}

                <div style={{ margin: "10px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h5" variant="h5"></Typography>
                    <Box component="form">
                      {live ? (
                        <>
                          <>
                            <br></br>
                            <Typography
                              color="text.secondary"
                              style={{ textAlign: "center" }}
                            >
                              Your active location details
                            </Typography>

                            <Typography
                              variant="body2"
                              color="black"
                              sx={{ mt: 0.5, fontSize: "16px" }}
                            >
                              Place : {storeLocationInfo?.name}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="black"
                              sx={{ mt: 0.5, fontSize: "16px" }}
                            >
                              City : {storeLocationInfo?.city}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="black"
                              sx={{ mt: 0.5, fontSize: "16px" }}
                            >
                              State : {storeLocationInfo?.state}
                            </Typography>
                          </>

                          <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                            style={{ backgroundColor: "#000" }}
                            onClick={addressDeletion}
                          >
                            Stop live
                          </Button>
                        </>
                      ) : (
                        <>
                          <Typography
                            variant="body2"
                            color="black"
                            sx={{ mt: 0.5, fontSize: "16px" }}
                          >
                            <FormControlLabel
                              value="female"
                              control={
                                <Radio
                                  checked={selectedAddressType === "current"}
                                />
                              }
                              label="Set Current Place"
                              // checked = {selectedAddressType === 'current-location'}
                              onChange={() =>
                                // handlePaymentMethodChange('online-payment')
                                buttonClickToSetCurrentLocation()
                              }
                            />
                          </Typography>
                          <Typography
                            variant="body2"
                            color="black"
                            sx={{ mt: 0.5, fontSize: "16px" }}
                          >
                            <FormControlLabel
                              value="female"
                              control={
                                <Radio
                                  checked={selectedAddressType === "default"}
                                />
                              }
                              label="Choose Default Address"
                              //  checked = {selectedAddressType === 'default'}
                              onChange={() => buttonClickToSetDefaultAddress()}
                            />
                          </Typography>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                            style={{ backgroundColor: "#000" }}
                            onClick={addressConfirmation}
                          >
                            Go live
                          </Button>
                        </>
                      )}
                    </Box>
                  </Box>
                </div>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
          <div className="right">
            {tripDetails  ? <>
          
            <Card
              style={{
                borderColor: "black",
                borderWidth: "2px",
                width: "350px",
                borderRadius: "20px",
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
                ></Typography>
                <Typography
                  color="text.secondary"
                  style={{ textAlign: "center" }}>
                  You active ride will show here
                </Typography>

                <div style={{ margin: "10px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}>
        {tripDetails ?(
                      <Typography component="h6" variant="h6">
                          New ride request
                      </Typography>
                      ) :
                      <Typography component="h5" variant="h5">
                       No active rides available
                      </Typography>}
                <Card style={{ width: "100%", height: "100%"}}>
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                  <Stack>
                    <Typography  sx={{ color: "#000000" }}>
                      Ride Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      From : {tripDetails?.data?.trip?.start_location_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Destination : {tripDetails?.data?.trip?.end_location_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total distance : {tripDetails?.data?.trip?.total_distance} Km
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Payment status : {tripDetails?.data?.trip?.payment_method === "payafter"? "Pay Later":"Online"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total amount : ₹ {tripDetails?.data?.trip?.amount}
                    </Typography>
                    <br></br>
                    <Typography  sx={{ color: "#000000" }}>
                      User Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      User : {tripDetails?.data?.user_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone : {tripDetails?.data?.user_phone}
                    </Typography>
                  </Stack>
                </Box>
                <Divider />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
                >
              </Stack>
            </Card>
            {tripDetails?.data?.trip?.trip_status ==='finished'?
            <>
             <Typography variant="body2" color="text.secondary">
                     Have you collected money ?
                <Button onClick={handleHaveYouCollectMoney}>yes</Button> </Typography> 
                    

            </>:""
             }
            {
            tripDetails?.data?.trip?.trip_status !== "finished"?
            <>
              <Box component="form">
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                        onClick={()=>{
                          handleTripStatus()
                           }}
                        style={{ backgroundColor: "#000" }}
                      >
                        {tripDetails?.data?.trip?.trip_status}
                      </Button>
                    </Box>
            </>:<Typography  sx={{ color: "green" }}>
                      Ride completed
                    </Typography>}
            
                  
                  </Box>
                </div>
              </CardContent>
              <CardActions></CardActions>
            </Card>
            </>:
            null}
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverActive;
