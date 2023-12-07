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
import TextField from "@mui/material/TextField";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import NestedModal from "../../../Components/User/ScheduleRide";
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
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

  const [OrginLocationPropPassedDataforForm,setOrginLocationPropPassedDataforForm] = useState(null);
  const [DestinationLocationPropPassedDataforForm,setDestinationLocationPropPassedDataforForm] = useState(null);

  const [userWantToGo,setuserWantToGo] = useState({
    from : "",
    to : ""
  })
  console.log(userWantToGo,"user want ot go ****************************************")


  const [userDefaultLatLng, setUserDefaultLatLng] = useState(null);
  const [userSelectDefaultAddressData, setUserSelectDefaultAddressData] =
    useState({
      geometry: {
        coordinates: [],
      },
    });
  const [userSelectDefaultAddress, setUserSelectDefaultAddress] = useState(false);
  const [ismodalOpen, IssetModalOpen] = useState(false);


  useEffect(()=>{
    if (userDefaultLatLng){
      setuserWantToGo({
        from: userDefaultLatLng ,
        to: DestinationLocationPropPassedDataforForm
      }
      )
    }else{
      setuserWantToGo({
        from: OrginLocationPropPassedDataforForm ,
        to: DestinationLocationPropPassedDataforForm
      })
    }
   
    
  },[OrginLocationPropPassedDataforForm,userDefaultLatLng])


  const handleShowNearByDrivers = async () => {
    const repsonse = await axios
      .post(`api/user/nearby-drivers/${userId}/`,OrginLocationPropPassedDataforForm, {
        headers: {
          "Content-Type":"application/json",
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
        console.log(error)
        const issue = error?.repsonse.data.message
        Swal.fire({
          title: issue,
          text: error?.repsonse?.status,
          icon: 'error'
        })
       
      });
  };



  const locationDataForForm = (orgin, destination) => {
    setOrginLocationPropPassedDataforForm(orgin);
    setDestinationLocationPropPassedDataforForm(destination);
  };

  const handleUserSelectDeaultAddressTurnOn = (e) => {
    e.preventDefault();
    setUserSelectDefaultAddress(true);

    if (userSelectDefaultAddress){
      const { latitude, longitude } = userDefaultLatLng;

      setUserSelectDefaultAddressData({
        geometry: {
          coordinates: [longitude, latitude],
        },
      });
      
    };
  
  };

  const handleUserSelectDeaultAddressTurnOff = (e) => {
    e.preventDefault();
    setUserSelectDefaultAddress(false);
    setUserDefaultLatLng(null)
  };

  const handleScheduleForLatterModalOpen = () => {
    IssetModalOpen(true);
  };

  const handleScheduleForLatterModalClose = () => {
    IssetModalOpen(false);
  };

  // const handleUserSelectDefaultAddressToggle = () => {
  //   setUserSelectDefaultAddress((prev) => !prev);

  //   if (userSelectDefaultAddress){
  //     const { latitude, longitude } = userDefaultLatLng;

  //     setUserSelectDefaultAddressData({
  //       geometry: {
  //         coordinates: [longitude, latitude],
  //       },
  //     });
      
  //   };

  // }

    useEffect(() => {
      if (userSelectDefaultAddress){
      const UserDeaultAddressFetch = async () => {
        await axios
          .get("api/user/user-default-address", {
            headers: {
              Authorization: `Bearer ${userAccessToken}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              console.log("default address");
              console.log(response.data, "default address");
              setUserDefaultLatLng(response.data);
            } else {
              console.log(" address failed");
            }
          })
          .catch((error) => {
            console.log("error address :", error);
          });
      };
      UserDeaultAddressFetch();
    }
    }, [userSelectDefaultAddress]);
    
    


  return (
    <>
      <Navbar />
      <div className="containerFluid" style={{ display: "flex" }}>
        <div
          className="left"
          style={{
            width: "600px",
            paddingTop: "20px",
            marginRight: "60px",
            marginLeft: 0,
          }}
        >
          <MapComponent
            locationDataForForm={locationDataForForm}
            userSelectDefaultAddress={userSelectDefaultAddress}
            userSelectDefaultAddressData={userSelectDefaultAddressData}
          />
        </div>

        <div className="right" style={{ paddingTop: "20px" }}>
          <Card
            style={{
              borderColor: "black",
              borderWidth: "2px",
              borderStyle: "solid",
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
              >
                Make your ride
              </Typography>

              <Typography color="text.secondary">
                Set default address as starting point
                {/* <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
                > */}

{/* 
              <Switch
                      checked={userSelectDefaultAddress}
                      onChange={handleUserSelectDefaultAddressToggle}
                    /> */}
                      {userSelectDefaultAddress ?(
                         <Switch
                         checked={userSelectDefaultAddress}
                         onChange={handleUserSelectDeaultAddressTurnOff}
                       />
                      ):
                      <Switch
                      checked={userSelectDefaultAddress}
                      onChange={handleUserSelectDeaultAddressTurnOn}
                    />}    

                {/* {userSelectDefaultAddress ? (
                  <Switch onClick={handleUserSelectDeaultAddressTurnOff} />
                ) : (
                  <Switch onClick={handleUserSelectDeaultAddressTurnOn} />
                )} */}
                   <Chip
                  label={userSelectDefaultAddress ? 'Default Address' : "Click for default address"}
                  color={userSelectDefaultAddress ? 'success' : 'default'}
                  size="small"
                />
{/* 
                {userSelectDefaultAddress ? (
                  <button onClick={handleUserSelectDeaultAddressTurnOff}>
                  make flase= {userSelectDefaultAddress}
                  </button>
                ) : (
                  <button onClick={handleUserSelectDeaultAddressTurnOn}>
                    make True = {userSelectDefaultAddress}
                  </button>
                )} */}
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
                  <Box component="form">
                    <TextField
                      margin="normal"
                      value={

                        userWantToGo ? userWantToGo?.from?.name :userWantToGo?.from?.id
                      }
                      fullWidth
                      id="from"
                      label="from"
                      name="from"
                      autoComplete="=from"
                      autoFocus
                      style={{ borderRadius: "20px", height: "40px" }}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      value={
                        DestinationLocationPropPassedDataforForm
                          ? DestinationLocationPropPassedDataforForm.name
                          : " "
                      }
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
                      style={{ backgroundColor: "#000" }}
                    >
                      Start
                    </Button>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      style={{ backgroundColor: "#000" }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScheduleForLatterModalOpen();
                      }}
                    >
                      {" "}
                      {ismodalOpen && (
                        <div>
                          <NestedModal />
                        </div>
                      )}
                      set
                    </Button>
                  </Box>
                </Box>
              </div>
            </CardContent>
            <CardActions></CardActions>
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



export default RequestRide;










export const MapComponent = (props) => {
  const { locationDataForForm, userSelectDefaultAddress,userSelectDefaultAddressData,} = props;
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);



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
      let origin;

      if (userSelectDefaultAddress) {
        origin = userSelectDefaultAddressData;
      } else {
        origin = directions.getOrigin();
      }
      const destination = directions.getDestination();

      if (origin && origin.geometry && origin.geometry.coordinates) {
        console.log("From:", origin.geometry.coordinates);
        geocodeLocation(origin.geometry.coordinates, setOriginLocation);
      }

      if (
        destination &&
        destination.geometry &&
        destination.geometry.coordinates
      ) {
        geocodeLocation(destination.geometry.coordinates,setDestinationLocation);
      }
    });

    const drivers = [
      { long: " 10.023286", lat: " 76.311371" },
      { lat: "76.49010000000000000000", long: "9.78270000000000000000 " },
    ];

    drivers.map((driver) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([driver.lat, driver.long])
        .addTo(map);

      const popup = new mapboxgl.Popup().setHTML(
        `<div>
        <UserMapProfile driver={driver}/>
        </div>`
      );

      marker.setPopup(popup);
      marker.getElement().addEventListener("mouseenter", () => {
        popup.addTo(map);
      });
      marker.getElement().addEventListener("mouseleave", () => {
        popup.remove();
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  // useEffect(()=>{

  //   props.showNearByDriverFunction()

  // },[])

  const geocodeLocation = (coordinates, setLocation) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data,"111111111111111111111111111111111111111111111111")
        if (data.features && data.features.length > 0) {
          const locationName = data.features[0].place_name;

          const splitData = locationName.split(", ");
          const name = splitData[0];
          const street = splitData[1];
          const city = splitData[2];
          const state = splitData[3];
          const postalCode = splitData[4];
          const coordinates = data.query

          setLocation({
            name,
            street,
            city,
            state,
            postalCode,
            coordinates
          });
        }
      })
      .catch((error) => console.error("Geocoding Error:", error));
  };

  useEffect(() => {
    sentLocationDataToForm();
  }, [originLocation, destinationLocation]);


  const sentLocationDataToForm = () => {
    locationDataForForm(originLocation, destinationLocation);
  };


  return (
    <div>
      <div id="map" style={{ width: "100%", height: "500px" }} />
    </div>
  );
};




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