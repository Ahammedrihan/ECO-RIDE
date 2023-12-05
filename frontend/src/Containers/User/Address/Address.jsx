import React, { useEffect, useState } from "react";
import AddressPage from "../../../Components/Profile/AddressPage";
import UserProfileSideBar from "../../../Components/User/UserProfileSidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import { userProfileurl } from "../../../Utils/urls";
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

function Address() {
  const userStoreData = useSelector((state) => state.authuser.userData);
  const userId = userStoreData.user.user_id;
  const userAccessToken = userStoreData.data.access;
  const path = `${userProfileurl}${userId}`;

  const [userAddress, setUserAddress] = useState([]);


  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [addressCount, setAddressCount] = useState(0);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [showAddressDefaultAlert, setShowAddressDefaultAlert] = useState(false)


  useEffect(() => {
    const fetchUserAddress = async () => {
      const response = await axios
        .get(path, {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUserAddress(response.data.account_info);
            setAddressCount(response.data.account_info.length);
          } else {
            console.log("not able to fetch user address info");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUserAddress();
  }, [addressCount]);

  const handleOnDelete = () => {
    setShowDeleteAlert(true);
    setAddressCount(addressCount - 1);
  };

  const handleOnDefault =()=>{
    setAddressCount(addressCount +1);
    setShowAddressDefaultAlert(true)

  }

  const handleAddAddressClick = () => {
    setShowAddAddressForm(true);
  };

  const handleAddAddressClickFalse = () => {
    setShowAddAddressForm(false);
  };

  const handleAddAddressSuccess = () => {
    setShowAddAddressForm(false);
    setAddressCount(addressCount + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingRight: "20px",
        paddingTop: "30px",
      }}>
      <div style={{ flexBasis: "20%" }}>
        <UserProfileSideBar />
      </div>

      <div style={{ flexBasis: "70%", borderRadius: "10px" }}>
        {showDeleteAlert && (
          <Alert severity="success" onClose={() => setShowDeleteAlert(false)}>
            <AlertTitle>Success</AlertTitle>
            vehicle deleted successfully!
          </Alert>
        )}

        {showAddressDefaultAlert &&(
           <Alert severity="success" onClose={() => setShowAddressDefaultAlert(false)}>
           <AlertTitle>Success</AlertTitle>
           New Address Set as Deafult successfully!
         </Alert>
        )}

        {userAddress && !showAddAddressForm && (
          <Button
            onClick={handleAddAddressClick}
            style={{ marginBottom: "10px", backgroundColor: "#000000",border:"none" }}
          >
            Add Address
          </Button>
        )}

        {showAddAddressForm ? (
          <>
            <Button
              onClick={handleAddAddressClickFalse}
            style={{margin:"20px", backgroundColor: "#000000",border:"none"}}
            >
              Back To Table
            </Button>
            <div style={{ maxWidth: "800px" }}>
              <AddressPage
                accessToken={userAccessToken}
                userId={userId}
                onAddAddess={handleAddAddressSuccess}
              />
            </div>
          </>
        ) : (
          <BasicTable
            userAddress={userAddress}
            onDelete={handleOnDelete}
            onDefault = {handleOnDefault}
            accessToken={userAccessToken}
          />
        )}
      </div>
    </div>
  );
}

export default Address;

export function BasicTable(props) {
  const { accessToken, userAddress } = props;
  const handleAddressDelete = async (addressId) => {
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


  
  const handleAddressDefault = async (AddressId)=>{
    const response = await axios.patch(`api/driver/driver/profile/set-default-address/${AddressId}/`,{},{
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
            >Delete</TableCell>
            <TableCell
              align="center"
              sx={{ color: "#6f6975", fontWeight: "bold" }}
            >Status</TableCell>
            <TableCell
              align="center"
              sx={{ color: "#6f6975", fontWeight: "bold" }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userAddress.map((address) => (
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
                    onClick={() => handleAddressDelete(address.id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              </TableCell>

              { address.default === true ? 
         <TableCell align="center" ><Button variant="contained" color="success" style={{backgroundColor:"#2ccc21"}} onClick={()=>handleAddressDefault(address.id)}>
          Default
         </Button>
         </TableCell> :
         <TableCell align="center" >
         <Button variant="outlined" color="error" style={{borderBlockColor:"red",color:"red",border:"none"}}  onClick={()=>handleAddressDefault(address.id)}>
         Set Default
        </Button>
        </TableCell>
      }

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
