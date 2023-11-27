import React from 'react'

function AddressTable() {
  return (
    <div></div>
  )
}

export default AddressTable






function Row(props) {
    const { vehicle, accessToken ,userVehicle,driverId} = props;
    const [open, setOpen] = React.useState(false);
    console.log(userVehicle)
  
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
  
  
  
  
  
  
  
  
  
  
  
  
  