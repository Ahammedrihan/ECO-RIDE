import  React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import "./Swipe.css"
import { useEffect,useState } from 'react';
import axios from '../../../Utils/axios';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { loadRazorPayScript,createRazorPayOrder } from '../../../Utils/Razorpay';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    outerHeight:500,
    height: 550, 
  
    bgcolor: '#706565',
    border: 'px solid #000',
    boxShadow: 24,
  
  
  
  '@media(max-width : 900px)':{
      width: '95%', // Adjust the width for smaller screens
      padding: '16px', // Add padding from the ends
    },
  }





const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));



export function SwipePOP(props) {

 

  const { window,driver,distance,destinationLocation,originLocation,userAccessToken,userId } = props;
  const [open, setOpen] = useState(true);
  const [travelAmount,settravelAmount] = useState(null)
  const [selectedPaymentMethod,setSelectedPaymentMethod] = useState('')
  const [razorpayPaymentDetails,setRazorpayPaymentDetails] = useState()


  const handlePaymentMethodChange = (value)=>{
    setSelectedPaymentMethod(value);
  }

  let payment
  if (selectedPaymentMethod ==='online-payment' ){
     payment = 'online'
  }else{
     payment = 'payafter'
  }

  const userStartRideData = {
    driver : driver.driverBasicDetails.id,
    user : userId,
    vehicle : driver.driverVehicleDetails.id,
    start_long : originLocation.coordinates[0],
    start_lat : originLocation.coordinates[1],
    end_long : destinationLocation.coordinates[0],
    end_lat : destinationLocation.coordinates[1],
    start_location_name :originLocation.name,
    end_location_name :destinationLocation.name ,
    amount : travelAmount?.total_amount,
    payment_method : payment,
    razorpay_order_id : razorpayPaymentDetails ? razorpayPaymentDetails?.razorpay_order_id : null,
    razorpay_payment_id : razorpayPaymentDetails ? razorpayPaymentDetails?.razorpay_payment_id : null,
    total_distance : distance.distance


}

  const verifyUserOnRide = async(driverId,amount,userAccessToken,userId)=>{
    const verify = await axios.post('api/payment/verify-ontrip/',{userId},{
      headers:{
        Authorization: `Bearer ${userAccessToken}`
      }
    }).then((respose)=>{
      if (respose.status === 200){
        console.log("user not active in other ride ")
        handleRazorpayPayment(driverId,amount,userAccessToken)
      }
    }).catch((error)=>{
      if (error.response && error.response.data){
        Swal.fire({
          title: 'Not Allowed',
          text: 'Only one trip same time allowed',
          icon: 'error'
        })

      }

    })

  }
  

  const handleRazorpayPayment = async(driverId,amount,userAccessToken)=>{
    try{
       await loadRazorPayScript();
      const order = await createRazorPayOrder(driverId,amount,userAccessToken)
      console.log(order.notes.key,"order")
      
      const options = {
        key :  "rzp_test_XXewh2T7tqPbiY",
        amount: order.amount,
        currency: order.currency,
        name: 'eco-ride',
        description: `Payment for taxi ride `,
        order_id: order.id,
        handler: function (response) {
          console.log(response)
          setRazorpayPaymentDetails(response)
          handleBooking()

          
      },

      prefill: {
        email: 'user@example.com', // Replace with the user's email
        contact: '1234567890', // Replace with the user's contact number
      },

    }
    var razorpay = new Razorpay(options);
      razorpay.open();
  } catch (error) {
    console.error('Error handling Razorpay payment:', error);
  }

  }

 

  const tripAmountData = {
    driverId : driver.driverId,
    distance  : distance,
    vehicleId : driver.driverVehicleDetails.id,
    vehicleType : driver.driverVehicleDetails.vehicle_type,
    
  }



  const handleBooking = async()=>{
    await axios.post('api/payment/confirm-trip/',{userStartRideData},
    {
      headers:{
        Authorization: `Bearer ${userAccessToken}`
      }
    }).then((response)=>{
      console.log(response.status)
      if (response.status === 200){
        Swal.fire({
          title: 'Booking Sucessfull',
          text: 'Driver will contact you soon',
          icon: 'success'
        })
        onClose()
        
      }
    }).catch((error)=>{
      if (error.response && error.response.data){
        console.log(error)
        Swal.fire({
          title: 'Not Allowed',
          text: 'Only one trip same time allowed',
          icon: 'error'
        })

      }

    })
    
  }



  useEffect(()=>{
    const tripDistance = async()=>{
      await axios.post('api/user/trip-amount/',tripAmountData,{
        headers:{
          Authorization: `Bearer ${userAccessToken}`
        }
      }).then((response)=>{
        if (response.status === 200){
          settravelAmount(response.data)
        }else{
          console.log("No amount fetched")
        }
      }).catch((error)=>{
         console.log("error",error)
      })
    }
    tripDistance()
  },[])


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  if (open == false){
      onClose();
  }

  const onClose = () => {
    setOpen(false);
  };


  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            // height: `calc(50% - ${drawerBleeding}px)`,
            height: '70vh',
            overflow: 'visible',
          },
        }}
      />
      
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        {/* <Button onClick={toggleDrawer(true)}>Open</Button> */}
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={
          toggleDrawer(false)
         }
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>Cab details</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
            
          }}
        >

        <Box >
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      
        
        <Button  sx={{ ml: 1, width: 100, height: 30 }} onClick={() => onClose()}>
          Go back
        </Button>
      
          </div>
       
            <div style={{ height:2, backgroundColor:"",borderRadius:"10px" }}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2" style={{display: "flex",color:"white",alignContent:"center",justifyContent: "center"}}>
          </Typography> */}


          <div style={{ justifyContent: 'space-between',  padding: '0 40px' }} className='container' >

            <div style={{flex:1}} className="left" >
          <Typography id="modal-modal-description" sx={{ mt: 4}} style={{fontSize: '25px', textAlign: 'center' ,fontWeight:'bold'}}>
            Vehicle Details
          </Typography>

          <Typography variant="body2" color="black"  sx={{ mt: 3  , fontSize:"16px"}}>
          Vehicle Name &nbsp; :&nbsp; {driver.driverVehicleDetails.vehicle_name}
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          Vehicle Brand &nbsp; : &nbsp;{driver.driverVehicleDetails.vehicle_brand}
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
            Registration &nbsp;&nbsp;&nbsp;&nbsp; : &nbsp; {driver.driverVehicleDetails.registration_number}
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          Vehicle Model &nbsp; :&nbsp;  {driver.driverVehicleDetails.vehicle_year}
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          Vehicle Type &nbsp; &nbsp; :&nbsp;  {driver.driverVehicleDetails.vehicle_type}
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          Seat Capacity &nbsp; : &nbsp;  {driver.driverVehicleDetails.seat_capacity}
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          Vehicle Model &nbsp;&nbsp;:&nbsp;    {driver.driverVehicleDetails.vehicle_year}
          </Typography>

          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          Vehicle id &nbsp;&nbsp;:&nbsp;    {driver.driverVehicleDetails.id}
          </Typography>

        
          <Typography id="modal-modal-description" sx={{ mt: 4 }} style={{fontSize: '25px', textAlign: 'center', fontWeight:"bold" }}>
           Driver Details
          </Typography>

          <Typography variant="body2" color="black"  sx={{ mt: .5,fontSize:"16px" }}>
          First Name  &nbsp;&nbsp;:  <b>{driver.driverBasicDetails.first_name}</b>
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          Last Name &nbsp;&nbsp;:  <b>{driver.driverBasicDetails.last_name}</b>
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          Joined Date :  <b>{driver.driverBasicDetails.date_joined}</b>
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
         Gender &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          </Typography>
      
          </div>
          <div style={{flex:1}} className="right"   >
          <Typography id="modal-modal-description" sx={{ mt: 4 }} style={{fontSize: '25px', textAlign: 'center', fontWeight:"bold" }}>
            Travel Details
          </Typography>
          
          <Typography variant="body2" color="black" sx={{ mt: 3,fontSize:"16px" }}>
          From &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;<span>
  {originLocation.name} {originLocation.street} {originLocation.city}{' '}
  
</span>
          
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          Destination : &nbsp;<b>{destinationLocation.name} {destinationLocation.street}  {destinationLocation.city} {destinationLocation.state}</b> 
          </Typography>

          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
            Distance &nbsp;&nbsp;&nbsp; : {distance?.distance} Km
          </Typography>
         
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
            Amount &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; ₹ {travelAmount?.amount} 
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
            Tax&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;₹ {travelAmount?.tax} 
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
            Total amount : &nbsp;₹ {travelAmount?.total_amount} 
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 7, mr:18}} style={{fontSize: '25px', textAlign: 'center' ,fontWeight:'bold'}}>
            Payment
          </Typography>


      <Card
        style={{
          borderColor: "black",
          borderWidth: "1px",
          borderStyle: "solid",
          width: "350px",
          borderRadius: "20px",
          marginTop:"25px"
        }}
        >
        <CardContent>
       
        <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
        <FormControlLabel
         value="female" 
         control={<Radio />} 
         label="Online payment" 
         checked = {selectedPaymentMethod === 'online-payment'}
         onChange={() => (
          handlePaymentMethodChange('online-payment')
    
          )}
         />
          </Typography>
          <Typography variant="body2" color="black" sx={{ mt: .5,fontSize:"16px" }}>
          <FormControlLabel
           value="female" 
           control={<Radio />} 
           label="Pay after ride"
           checked = {selectedPaymentMethod === 'pay-after-ride'}
           onChange={() => handlePaymentMethodChange('pay-after-ride')} />
           
          </Typography>
        </CardContent>
        <CardActions sx={ {justifyContent: 'center'}}>
        <Button variant="contained"
        style={{width:"140px",height:"30px",borderRadius:"5px"}}
        onClick={()=>{
          if (selectedPaymentMethod ==='online-payment'){
          verifyUserOnRide(driver.driverId,travelAmount?.total_amount,userAccessToken,userId)
            console.log("razorpay")
          }else{
            console.log("payafter")
            handleBooking()
          }

        }}  color="success">Confirm Ride</Button>
        </CardActions>
        </Card>
          </div>
          </div>
          </div>
        </Box>
          <Skeleton variant="rectangular" height="140%" />
        </StyledBox>
      </SwipeableDrawer>
    </Root>

  );
}




