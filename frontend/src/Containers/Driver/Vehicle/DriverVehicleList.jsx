import React, { useEffect, useState } from "react";
import AddVehicle from "../../../Components/Driver/AddVehicle";
import { selectDriver } from "../../../../Redux/slices/driverSlice/driverauthSlice";
import { useSelector } from "react-redux";
import { display, margin } from "@mui/system";
import DriverSideBar from "../../../Components/Driver/driverSidebar";
import axios from "../../../Utils/axios";
import { driverProfile } from "../../../Utils/urls";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "react-bootstrap";
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

function DriverVehicleList() {
  const [userVehicle, setUserVehicle] = useState(null);
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
  const driverStoreDataFetch = useSelector((state) => state.driverauth.driverData);
  const driverId = driverStoreDataFetch.driver.user_id;
  const accessToken = driverStoreDataFetch.data.access;
  const path = `${driverProfile}${driverId}/`;


  useEffect(() => {
    axios
      .get(path, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        {
          if (response.status === 200) {
            console.log(response, "just a respone");
            console.log(response.data.vehicle_info, "just a respone");
            setUserVehicle(response.data.vehicle_info);
          } else {
            console.log("not able to fetch user vehicle info");
          }
        }
      });
  }, []);

  const handleAddVehicleClick=()=>{
    setShowAddVehicleForm(true)
  };
  const handleAddVehicleClickFalse=()=>{
    setShowAddVehicleForm(false)
  }



  return (
    <>
        <div style={{ display: "flex", paddingRight: "20p", paddingTop: "20px" }}>
          <div style={{ flexBasis: "20%" }}>
            <DriverSideBar />
          </div>
        <div style={{ flexBasis: "70%", borderRadius: "10px" }}>
          
            {userVehicle && !showAddVehicleForm && (
              <div>
                 <Button onClick={handleAddVehicleClick} style={{ margin:"10px"}}>Add Vehicle</Button>
            </div>
             )}

            {showAddVehicleForm  ? (
              <>
              
               <Button onClick={handleAddVehicleClickFalse} style={{ marginLeft:"400px"}}>Back To Table</Button>
              <AddVehicle storeDetails={driverStoreDataFetch} /> 
              </>
              ):
              (
                 userVehicle &&<CollapsibleTable userVehicle={userVehicle} path = {path} />
              )}
          
          </div>
        </div>
     
    </>
  );
}

export default DriverVehicleList;

function Row(props) {
  const { vehicle } = props;
  const [open, setOpen] = React.useState(false);
  // const [deleteVehicle,setDeleteVehicle] = useState(null)
  

  // useEffect(() => {
  //   axios
  //     .get(path, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       {
  //         if (response.status === 200) {
  //           console.log(response, "just a respone");
  //           console.log(response.data.vehicle_info, "just a respone");
  //           setUserVehicle(response.data.vehicle_info);
  //         } else {
  //           console.log("not able to fetch user vehicle info");
  //         }
  //       }
  //     });
  // }, [deleteVehicle]);

  // const handleVehicleDelete = async (vehicleId)=>{
  //   const path = `${driverProfile}${vehicleId}/`;
  //   console.log(path)
  //   console.log("kjdnkjnda")
  //   try{
  //     const response = await axios.post(path,{
        
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       }
  //     })
  //     console.log(response,"thid is respo")
  //   }catch (error) {
  //     console.error(error);
  //   }

  // }

  return (
    <React.Fragment>
<TableRow style={{marginBottom:"30px"}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {vehicle.id}
        </TableCell>
        <TableCell align="center">{vehicle.vehicle_name}</TableCell>
        <TableCell align="center">{vehicle.registration_number}</TableCell>
        <TableCell align="center">{vehicle.seat_capacity}</TableCell>
        <TableCell align="center">{vehicle.mileage}</TableCell>
        <TableCell align="center">{vehicle.mileage}</TableCell>

        <Stack direction="column" alignItems="center" justifyItems="center" spacing={1}>
          <IconButton aria-label="delete" size="small"  style={{ color: 'red' }} onClick={(()=>handleVehicleDelete(vehicle.id))}>
            <DeleteIcon fontSize="inherit"/>
          </IconButton>
       </Stack>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Additional Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Vehicle Type</TableCell>
                    <TableCell align="right">Vehicle Brand</TableCell>
                    <TableCell align="right">Vehicle Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={vehicle.id}>
                    <TableCell component="th" scope="row">
                      {vehicle.vehicle_year}
                    </TableCell>
                    <TableCell>{vehicle.vehicle_year}</TableCell>
                    <TableCell align="right">{vehicle.vehicle_type}</TableCell>
                    <TableCell align="right">
                      {" "}
                      <img
                        src={vehicle.vehicle_image1}
                        alt={`Vehicle ${vehicle.id}`}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CollapsibleTable({ userVehicle }) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, backgroundColor: "#e1d1ff" }}
        aria-label="simple table"
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }} />
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Vehicle Name
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Registration 
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Seat
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Mileage
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Insurance Validity
              </TableCell>
              <TableCell sx={{ color: "white" }} >Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userVehicle.map((vehicle) => (
              <Row vehicle={vehicle} key={vehicle.id} />
            ))}
          </TableBody>
        </Table>
      </Table>
    </TableContainer>
  );
}












