import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from 'react-bootstrap';
import axios from "../../Utils/axios";
import { userAddressAdd } from '../../Utils/urls';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWhhbW1lZHJpaGFuY20iLCJhIjoiY2xvc3BwejUyMDBmNjJqcHdjdGJ5eHNpNSJ9.QF-TWIQ2LNmW-kCJajDsYg';























const AddressPage = (props) => {
 
  const {userId,accessToken} = props
  
  const [location, setLocation] = useState(null);
  const [locationButton,setLocationButton] = useState(false)
  const [locationMap,setLocationMap] = useState(false)
  const [coordinate,setCoordinate] = useState({
    latitude : location ? location.latitude : 0,
    longitude : location? location.longitude : 0,
  })
  const [formData, setFormData] = useState({
    user:userId,
    // birthdate: "",
    // age: "",
    // alternate_phone: "",
    // gender: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pin_code: "",
    latitude:"",
    longitude:""
  });

  const handleCoordinateChange  = (longitude,latitude)=>{
    setCoordinate({longitude,latitude})
  }

    useEffect(() => {
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },(error) => {
              console.error('Error getting location:', error.message);
            }
          )} else {
          console.error('Geolocation is not supported by this browser.');
        }
      };
  
      getLocation();
    }, [locationButton]);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData, "....................");

    
  };

  const handleCurrentLocation =()=>{
    formData.latitude = location.latitude
    formData.longitude =  location.longitude
  }

  const handleChooseLocation =()=>{
    formData.latitude = location.latitude
    formData.longitude =  location.longitude
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(formData.latitude,"this is the form dtaa longitude")
    console.log(formData.longitude,"this is the form dtaa longitude")
    
    console.log(formData, "lasttttt");
    const data_stringify = JSON.stringify(formData);
    console.log(data_stringify, "stringify");
    console.log(userId, "IDDDDDD");
    console.log(accessToken, "ACCESS");
    

    const response = axios.post(`/api/user/user-address/${userId}/`, data_stringify, {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      if (response.status === 201) {
        props.onAddAddess()
        Swal.fire({
          title: 'Success!',
          text: 'The user details have been updated.',
          icon: 'success'
        })
      } else {
        console.log(response.error);
        Swal.fire({
          title: 'Error!',
          text: 'Invalid Details',
          icon: 'error'
        })
      }
    }).catch((error) => {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.firstName,
        icon: 'error'
      });
    });
  };

  return (
    <>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-4">Additional information</h5>
            <Form onSubmit={handleSubmit}>
              {/* <Row className="align-items-center">
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="birthdate">
                    <Form.Label>Birthday</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        name="birthdate"
                        value={formData.birthdate}
                        placeholder="mm/dd/yyyy"
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select defaultValue="0" name="gender" onChange={handleInputChange}>
                      <option value="">Gender</option>
                      <option value="F">Female</option>
                      <option value="M">Male</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col onSubmit={6} className="mb-3">
                  <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control required type="text" placeholder="Age" name="age" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control required type="number" placeholder="+12-345 678 910" name="alternate_phone" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
              </Row> */}
              <h5 className="my-4">Address</h5>
              <Row >
                <Col sm={9} className="mb-3">
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type="text" placeholder="Enter your home address" name="address" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col sm={3} className="mb-3">
                <Form.Group controlId="city">
                    <Form.Label>district</Form.Label>
                    <Form.Control required type="text" placeholder="district" name="district" onChange={handleInputChange} />
                  </Form.Group>
                  
                </Col>
               
              </Row>
              <Row>
                <Col sm={4} className="mb-3">
                  <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control required type="text" placeholder="City" name="city" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col sm={4} className="mb-3">
                  <Form.Group controlId="state">
                    <Form.Label>Select state</Form.Label>
                    <Form.Select defaultValue="0" name="state" onChange={handleInputChange}>
                      <option value="0">State</option>
                      <option value="kerala">Kerala</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group controlId="zip">
                    <Form.Label>ZIP</Form.Label>
                    <Form.Control required type="tel" placeholder="ZIP" name="pin_code" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
            <Form.Group controlId="city">
              <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"name="radio-buttons-group">
                  <FormControlLabel value="" control={<Radio />} label="Choose Current Location" onClick={() => {setLocationButton(true);
                 setLocationMap(false) ;
                 handleCurrentLocation () }}
                />
                  <FormControlLabel value="male" control={<Radio />} label="Choose Other Location"onClick={() => {setLocationButton(false);
                  setLocationMap(true);
                   handleChooseLocation()}} />
              </RadioGroup>
           </Form.Group>
              </Row>
              <div className="mt-3">
                <Button style={{ backgroundColor: "#000000",border:"none" }} type="submit">Save All</Button>
              </div>


            </Form>
          </Card.Body>
        </Card>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', paddingRight: "60px"}}>
        
        
      {locationMap ? <AddressMap latitude={location.latitude} longitude = {location.longitude} onCoordinateChnage = {handleCoordinateChange} /> : null}
      
      </div>
      {locationButton ?
      <div>
        
        {location ? (
          <p>
            Your current location is: {location.latitude}, {location.longitude}
          </p>
        ) : (
          <p>Loading location...</p>
        )}
      </div>:null}
     
    </>
  );
};

export default AddressPage;








export  function AddressMap(props) {
  const styles = {
    mapContainer: {
      height: '400px',
      width : "400px"
    },
    sidebar: {
      backgroundColor: 'rgba(35, 55, 75, 0.9)',
      color: '#fff',
      padding: '6px 12px',
      fontFamily: 'monospace',
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      margin: '12px',
      borderRadius: '4px',
    },
  };

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(props.longitude );
  const [lat, setLat] = useState(props.latitude );
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/ahammedrihancm/clotknlbd002b01qjbdafc9c9',
        center: [lng, lat],
        zoom: zoom,
      });

      // map.current.on('move', () => {
      //   setLng(map.current.getCenter().lng.toFixed(4));
      //   setLat(map.current.getCenter().lat.toFixed(4));
      //   setZoom(map.current.getZoom().toFixed(2));
      // });

      map.current.on('click', (event) => {
        const coordinates = event.lngLat;
        console.log(coordinates)
        setLng(coordinates.lng);
        setLat(coordinates.lat);
        console.log('Longitude:', lng, 'Latitude:', lat);
         
        props.onCoordinateChnage(lng,lat)
        
        // here we are uplifiting the lat and lng which we have marked on map

        // Remove existing markers before adding a new one
        map.current.getLayer('marker') && map.current.removeLayer('marker');
        map.current.getSource('marker') && map.current.removeSource('marker');

        // Add a new marker
        map.current.addLayer({
          id: 'marker',
          type: 'circle',
       
          paint: {
            'circle-radius': 5,
            'circle-color': '#FF0000',
          },
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [coordinates.lng, coordinates.lat],
                  },
                },
              ],
            },
          },
        });
      });
    }
  }, [lng, lat, zoom]);

  return (
    <div style={{width:"300px",paddingRight:"1px"}}>

     
      <div ref={mapContainer} className="map-container" style={styles.mapContainer} />
    </div>
  );
}




