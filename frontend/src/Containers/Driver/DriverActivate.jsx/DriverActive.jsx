import React, { useEffect, useState } from 'react'
import LocationComponent from '../../../Components/geoLocation/LocationComponent'
import axios from '../../../Utils/axios'
// import {driverLocationSetActive} from "../../../Utils/urls"
import Navbar from '../../../Components/Driver/Navbar'
import SecondNavbar from '../../../Components/Driver/SecondNavbar'
import {useSelector} from "react-redux"


function DriverActive() {

    const [driverCurrentLocation,setDriverCurrentLocation] = useState(false)
    const driverStoreDataFetch = useSelector((state) => state.driverauth.driverData);
    const driverId = driverStoreDataFetch.driver.user_id;
    const accessToken = driverStoreDataFetch.data.access;
    
    const [userLocationData,setUserLocationData] = useState({
      latitude : "",
      longitude :""
    })

    console.log(userLocationData,"user location state")
    


    const buttonClickToSetCurrentLocation=()=>{
        setDriverCurrentLocation(true)  
    }

      const getLatLang = (latitude,longitude)=>{
        console.log(latitude,longitude,"lskdldkmc")
        setUserLocationData({
          latitude : latitude,
          longitude : longitude
          
        })

      }
   
    const buttonClickToSetDefaultAddress = async()=>{
      const response  =  await axios.get(`api/driver/driver/default-address/${driverId}/`,{
        headers:{
          Authorization : `Bearer ${accessToken}`
        }
      }).then((response)=>{
        if (response.status === 200){
          console.log(response.data)
          setUserLocationData({
            latitude :response.data.latitude,
            longitude :response.data.longitude
          })
        }else{
          console.log(response.error)
        }
      }).catch((error)=>{
        console.log("error:",error)
      })
    }



    const addressConfirmation = async()=>{
      const response = await axios.post (`api/driver/driver/set-active-drivers/`,userLocationData,{
         headers:{
          Authorization : `Bearer ${accessToken}`
         }
      }).then((response)=>{
        if (response.status === 201){
          console.log(response)
          console.log("success")
        }else{
          console.log(error)
        }
      }).catch((error)=>{
        console.log("error:",error)
      })

    }




  
  return (
    <div>
       <Navbar/>
      <SecondNavbar/>
      <h1> Click on the button to start ride</h1>
        <br/>
        <button onClick={buttonClickToSetCurrentLocation}>Set Current Location</button>

        <button onClick={buttonClickToSetDefaultAddress}>Choose Default Address</button>
        <br/>
        {driverCurrentLocation ?<LocationComponent getLatLang={getLatLang}/>:null }
        <button onClick={addressConfirmation}>start ride</button>
        
    </div>
  )
}

export default DriverActive