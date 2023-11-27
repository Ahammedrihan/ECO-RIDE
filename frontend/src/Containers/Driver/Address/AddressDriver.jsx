import React, { useEffect,useState } from 'react'
import AddressPage from '../../../Components/Profile/AddressPage'
import {useSelector} from "react-redux"
import DriverSideBar from '../../../Components/Driver/driverSidebar';
import axios from "../../../Utils/axios"
import {driverProfile} from "../../../Utils/urls"
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";


function AddressDriver() {
    const driverData = useSelector((state)=>state.driverauth.driverData);
    const driverId = driverData.driver.user_id;
    const driverAccessToken = driverData.data.access;
    const role =  driverData.driver.role
    const path = `${driverProfile}${driverId}`

    const [driverAddress,setDriverAddress] = useState([])
    const [addressCount,setAddressCount] = useState(0)

    useEffect(()=>{
      const FetchDriverAddress = async()=>{
        const response = await axios.get(path,{
          headers:{
            Authorization : `Bearer ${driverAccessToken}`
          }
        }).then((response)=>{
          if(response.data.account_info){
            console.log("got the driver address")
            setDriverAddress(response.data.account_info)
            setAddressCount(response.data.account_info.length)
          }else{
            console.log("not able to fetch driver address")
          }
        }).catch((error)=>{
          console.log("error:",error)
        })
      }
      FetchDriverAddress()
    },[addressCount])

    const handleAddressDelete = ()=>{
      setAddressCount(addressCount+1)
    }

    
  return ( 
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"30px"}}>
        <DriverSideBar/>
        <AddressPage  accessToken ={driverAccessToken} userId={driverId} />

        <BasicTable accessToken={driverAccessToken} driverAddress={driverAddress} onDelete = {handleAddressDelete} />
    </div>
  )
}

export default AddressDriver




export function BasicTable(props) {
  const { accessToken, driverAddress } = props;
  const handleVehicleDelete = async (addressId) => {
    const response = await axios
      .post(
        `api/user/address/delete/${addressId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status == 204) {
          props.onDelete(addressId);
        } else {
          console.log("not able to delete ");
        }
      })
      .catch((error) => {
        console.log(error, "errror");
      });
  };
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, backgroundColor: "#000000" }}
        aria-label="simple table"
      >
        {/* sx={{ minWidth: 700, backgroundColor: "#000000" }} */}
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{ color: "#6f6975", fontWeight: "bold" }}
            >
              Id
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#6f6975", fontWeight: "bold" }}
            >
              Address
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#6f6975", fontWeight: "bold" }}
            >
              City
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#6f6975", fontWeight: "bold" }}
            >
              District
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#6f6975", fontWeight: "bold" }}
            >
              State
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#6f6975", fontWeight: "bold" }}
            >
              Pincode
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#6f6975", fontWeight: "bold" }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {driverAddress.map((address) => (
            <TableRow
              key={address.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" sx={{ color: "#c2b7cc" }}>
                {address.id}
              </TableCell>
              <TableCell align="center" sx={{ color: "#c2b7cc" }}>
                {address.address}
              </TableCell>
              <TableCell align="center" sx={{ color: "#c2b7cc" }}>
                {address.city}
              </TableCell>
              <TableCell align="center" sx={{ color: "#c2b7cc" }}>
                {address.district}
              </TableCell>
              <TableCell align="center" sx={{ color: "#c2b7cc" }}>
                {address.state}
              </TableCell>
              <TableCell align="center" sx={{ color: "#c2b7cc" }}>
                {address.pin_code}
              </TableCell>
              <TableCell align="center" sx={{ color: "#c2b7cc" }}>
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyItems="center"
                  spacing={1}
                >
                  <IconButton
                    aria-label="delete"
                    size="small"
                    style={{ color: "red" }}
                    onClick={() => handleVehicleDelete(address.id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
