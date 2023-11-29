import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function DriverHomeCarousal() {

  const navigate = useNavigate()

  const getStartFunctionHandle=()=>{
    navigate('/driver/location-set-activate/')

  }
  const styles = {
    container: {
      backgroundColor: "black",
      height: "400px",
      borderWidth: "1px",
      borderColor: "white",
      display: "flex",
    },
    leftSection: {
      flex: 1.5,
      paddingLeft: "20px",
    },
    rightSection: {
      flex: 1,
      
    },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.leftSection} >
          <div style={{ color: "white", paddingLeft: "40px", paddingRight: "20px", paddingTop: "40px" }}>
            <h1 style={{ fontWeight: "500", fontSize: "35px" }}> You're our hero navigating the journey of possibilities.</h1>
            <button style={{ backgroundColor: "white", border: "none", height: "40px", width: "140px", marginTop: "30px", fontWeight: "600", fontSize: "15px", borderRadius: "5px" }} onClick={getStartFunctionHandle}> Get Started</button>
          </div>
        </div>
        <div style={styles.rightSection} >
          Right Section
        </div>
      </div>
    </>
  );
}

export default DriverHomeCarousal;
