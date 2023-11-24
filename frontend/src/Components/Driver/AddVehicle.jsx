import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from 'react-bootstrap';
// import UserProfileSideBar from '../../../Components/User/UserProfileSidebar';
import axios from "../../Utils/axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';



const  AddVehicle= (props) => {

   const user_id = props.storeDetails.driver.user_id
  console.log(user_id)
   const userAccessToken = props.storeDetails.data.access
   console.log(userAccessToken)
 
  // const userStoreDataFetch = useSelector((state) => state.authuser.userData);
  // const user_id = userStoreDataFetch.user.user_id;
  // const userAccessToken = userStoreDataFetch.data.access;

 
  const [formData, setFormData] = useState({
    user : user_id,
    registration_number: "",
    vehicle_brand: "",
    vehicle_name: "",
    vehicle_color: "",
    vehicle_year: "",
    insurance_end_date: "",
    license_validity: "",
    vehicle_type: "",
    seat_capacity: "",
    mileage:"",
    vehicle_image1:"",
  });
  useEffect(()=>{
    
  },[formData])
  
  
  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData, "....................");
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      vehicle_image1: e.target.files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = axios.post(`/api/user/add-vehicle/${user_id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',

        
        Authorization: `Bearer ${userAccessToken}`
      }
    }).then((response) => {
      if (response.status === 201) {
       props.onAddVehicle()
        Swal.fire({
          title: 'Success!',
          text: 'The user details have been updated.',
          icon: 'success'
        })
        window.location.reload();
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
        text: error.data,
        icon: 'error'
      });
    });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', paddingRight: "60px",paddingTop:"30px" }}>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-4">Vehicle Information</h5>
            <Form onSubmit={handleSubmit}>

            <Row>
                <Col onSubmit={6} className="mb-3">
                  <Form.Group controlId="vehicleBrand">
                    <Form.Label>Vehicle Brand</Form.Label>
                    <Form.Control required type="text" placeholder="Brand" name="vehicle_brand" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="vehicleName">
                    <Form.Label>Vehicle Name</Form.Label>
                    <Form.Control required type="text" placeholder="Name" name="vehicle_name" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {/* <Col onSubmit={6} className="mb-3">
                  <Form.Group controlId="vehicleNumber">
                    <Form.Label>Vehicle Number</Form.Label>
                    <Form.Control required type="text" placeholder="Number" name="regtration_number" onChange={handleInputChange} />
                  </Form.Group>
                </Col> */}

                <Col sm={6} className="mb-3">
  <Form.Group controlId="vehicleNumber">
    <Form.Label>Vehicle Number</Form.Label>
    <Form.Control
      required
      type="text"
      placeholder="Number"
      name="registration_number"
      onChange={handleInputChange}
      pattern="[A-Za-z]{2}[0-9]{2}[A-Za-z]{1,2}[0-9]{4}"
      title="Please enter a valid vehicle registration number"
    />
    <Form.Text className="text-muted">
      Format: AB12CD3456 (example)
    </Form.Text>
  </Form.Group>
</Col>


                
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="vehicleColor">
                    <Form.Label>Vehicle Color</Form.Label>
                    <Form.Control required type="text" placeholder="Color" name="vehicle_color" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="vehicleYear">
                    <Form.Label>Year Of Registration</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        name="vehicle_year"
                        value={formData.vehicle_year}
                        placeholder="mm/dd/yyyy"
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="vehicle_type">
                    <Form.Label>Vehicle Type</Form.Label>
                    <Form.Select defaultValue="0" name="vehicle_type" onChange={handleInputChange}>
                      <option value="">Select</option>
                      <option value="sedan">Sedan</option>
                      <option value="hatch">Hatchback</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
              <Col sm={6} className="mb-3">
                  <Form.Group controlId="vehicleYear">
                    <Form.Label>Insurance Valid Till</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        name="insurance_end_date"
                        value={formData.insurance_end_date}
                        placeholder="mm/dd/yyyy"
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col sm={6} className="mb-3">
                  <Form.Group controlId="vehicleYear">
                    <Form.Label>License Valid Till</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        name="license_validity"
                        value={formData.license_validity}
                        placeholder="mm/dd/yyyy"
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
            </Row>
               <Row>
                <Col sm={4} className="mb-3">
                  <Form.Group controlId="mileage">
                    <Form.Label>Mileage</Form.Label>
                    <Form.Control required type="text" placeholder="mileage" name="mileage" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col sm={4} className="mb-3">
                  <Form.Group controlId="seatCapacity">
                    <Form.Label>Seat Capacity</Form.Label>
                    <Form.Control required type="text" placeholder="capacity" name="seat_capacity" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Label>My Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="vehicle_image1"
                        accept=".jpeg,.png,.gif"
                        onChange={
                          handleImageChange}
                    />
              <div className="mt-3">
                <Button variant="primary" type="submit">Save All</Button>
              </div>
            </Form>  
          </Card.Body>
        </Card>
        </div>
    </>
  );
};

export default AddVehicle;


