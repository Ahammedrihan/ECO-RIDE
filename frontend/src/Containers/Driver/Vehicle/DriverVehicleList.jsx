import React, { useEffect, useState } from "react";
import AddVehicle from "../../../Components/Driver/AddVehicle";
import { useSelector } from "react-redux";
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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import img from '../../../assets/8574 (1).jpg'



function DriverVehicleList() {
  const [userVehicle, setUserVehicle] = useState();
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
  const driverStoreDataFetch = useSelector((state) => state.driverauth.driverData);
  const driverId = driverStoreDataFetch.driver.user_id;
  const accessToken = driverStoreDataFetch.data.access;
  const path = `${driverProfile}${driverId}/`;
  const [vehcount,setVehCount] = useState(0)
  const [showDeleteAlert,setShowDeleteAlert] = useState(false)
  const [showVehicleAddAlert,setVehicleAddAlert] = useState(false)
  const [showDefaultAlert, setShowDefaultAlert] = useState(false)

  const handleOnDelete = ()=>{
    setShowDeleteAlert(true)
    setVehCount(vehcount+1)
  }
  const handleDefault = ()=>{
    setShowDefaultAlert(true)
    setVehCount(vehcount+1)
  }

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
            console.log(response.data.vehicle_info, "just a respone");
            setUserVehicle(response.data.vehicle_info);
          } else {
            console.log("not able to fetch user vehicle info");
            console.log(response.message)
          }
        }
      });
  }, [vehcount]);

  const handleAddVehicleClick=()=>{
    setShowAddVehicleForm(true)
  };
  const handleAddVehicleClickFalse=()=>{
    setShowAddVehicleForm(false)
  } 
  const handleAddVehicleAlert =()=>{
    setVehicleAddAlert(true)
  }


  return (
    <>
        <div style={{ display: "flex", paddingRight: "20p", paddingTop: "20px" }}>
          <div style={{ flexBasis: "20%" }}>
            <DriverSideBar />
          </div>
        <div style={{ flexBasis: "70%", borderRadius: "10px"  }}>
{/* ================================ALERT SECTION ON TOP OF TABLE============================ */}
        {showDeleteAlert && (
        <Alert severity="success" onClose={() => setShowDeleteAlert(false)}>
          <AlertTitle>Success</AlertTitle>
          vehicle deleted successfully!
        </Alert>
      )}
       {showVehicleAddAlert && (
        <Alert severity="success" onClose={() => setVehicleAddAlert(false)}>
          <AlertTitle>Success</AlertTitle>
          vehicle deleted successfully!
        </Alert>
      )}
        {showDefaultAlert && (
        <Alert severity="success" onClose={() => setShowDefaultAlert(false)}>
          <AlertTitle>Success</AlertTitle>
          default vehicle changed  successfully!
        </Alert>
      )}
{/* ================================ALERT SECTION END============================ */}         
            {userVehicle && !showAddVehicleForm && (
              <div>
                 <Button onClick={handleAddVehicleClick} style={{ margin:"10px", backgroundColor:"#000",border:"none"}}>Add Vehicle</Button>
            </div>
             )}
            {showAddVehicleForm  ? (
              <>
               <Button onClick={handleAddVehicleClickFalse} style={{ marginLeft:"380px", backgroundColor:"#000",border:"none"}}>Back To Table</Button>
              <AddVehicle storeDetails={driverStoreDataFetch} onAddVehicle={handleAddVehicleAlert}  /> 
              </>
              ):
              ( 
                 userVehicle &&<CollapsibleTable userVehicle={userVehicle} accessToken = {accessToken} onDelete={handleOnDelete} driverId={driverId} onDefault={handleDefault}  />
              )}
          </div>
        </div>
    </>
  );
}
export default DriverVehicleList;




function Row(props) {
  const { vehicle, accessToken ,userVehicle,driverId} = props;
  const [open, setOpen] = React.useState(false);

  const handleVehicleDefault = async (vehicleId)=>{
    const response = await axios.patch(`api/driver/driver/profile/set-default/${vehicleId}/${driverId}/`,{},{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response)=>{ 
      if (response.status ===202){
        props.onDefault();
        console.log("default succewss")
      }else{
        console.log("default fail")
      }
    })

  }



  const handleVehicleDelete = async (vehicleId)=>{

      const response = await axios.post(`api/driver/driver/profile/vehicle-delete/${vehicleId}/`,{},{
        headers :{
          Authorization: `Bearer ${accessToken}`,
        }
      }).then((response)=>{
        if (response.status == 204){
          props.onDelete();
          console.log(response, "delete sucess");
          <Alert severity="success">This is a success alert — check it out!</Alert>

        }else {
          console.log("not avlr to delete ");
      }
    }).catch((error)=>{
      console.log(error,"lkds")
    })
    }

  return (
    <React.Fragment>
       <TableRow style={{marginBottom:"30px"}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"  sx={{ color: "white" }}
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"  sx={{ color: "white" }}>
          {vehicle.id}
        </TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.vehicle_name}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.registration_number}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.seat_capacity}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.mileage}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.mileage}</TableCell>
  
        <TableCell align="center" sx={{ color: "white" }}>
        <Stack direction="column" alignItems="center" justifyItems="center" spacing={1}>
          <IconButton aria-label="delete" size="small"  style={{ color: 'red' }} onClick={()=>handleVehicleDelete(vehicle.id)}>
            <DeleteIcon fontSize="inherit"/>
          </IconButton>
        </Stack>
        </TableCell>

       { vehicle.default === true ? 
         <TableCell align="center" ><Button variant="contained" color="success" style={{backgroundColor:"#2ccc21"}} onClick={()=>handleVehicleDefault(vehicle.id)}>
          Active
         </Button>
         </TableCell> :
         <TableCell align="center" >
         <Button variant="outlined" color="error" style={{borderBlockColor:"red",color:"red"}}  onClick={()=>handleVehicleDefault(vehicle.id)}>
         Non
        </Button>
        </TableCell>
      }


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
                    <TableCell sx={{ color: "white" }}>Date</TableCell>
                    <TableCell sx={{ color: "white" }}>Vehicle Type</TableCell>
                    <TableCell align="right"  sx={{ color: "white" }}>Vehicle Brand</TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>Vehicle Image</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={vehicle.id}>
                    <TableCell component="th" scope="row"  sx={{ color: "white" }}>
                      {vehicle.vehicle_year}
                    </TableCell>
                    <TableCell  sx={{ color: "white" }}>{vehicle.vehicle_year}</TableCell>
                    <TableCell align="right"  sx={{ color: "white" }}>{vehicle.vehicle_type}</TableCell>
                    <TableCell align="right">
                      {" "}
                      <img
                        src={img}
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


function CollapsibleTable(props ) {
  return (
    <div style={{backgroundColor:"black"}}>
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, backgroundColor: "#000000" }}
        aria-label="simple table">
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
              <TableCell align="center" sx={{ color: "white" }}>
                Active
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.userVehicle.map((vehicle) => (
              <Row vehicle={vehicle} key={vehicle.id} accessToken={props.accessToken} userVehicle={props.userVehicle} onDelete={props.onDelete} driverId={props.driverId} onDefault={props.onDefault} />
            ))}
          </TableBody>
        </Table>
      </Table>
    </TableContainer>
    </div>
  );
}












