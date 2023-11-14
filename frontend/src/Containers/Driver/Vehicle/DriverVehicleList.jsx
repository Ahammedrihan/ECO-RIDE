import React from 'react'
import AddVehicle from '../../../Components/Driver/AddVehicle'
import UserProfileSideBar from '../../../Components/User/UserProfileSidebar'
import { selectDriver } from '../../../../Redux/slices/driverSlice/driverauthSlice'
import {  useSelector } from 'react-redux'
import { display } from '@mui/system'

function DriverVehicleList() {
    const  adminStoreDataFetch = useSelector((state)=>state.driverauth.driverData)
  return (
    <div style={{display:"flex"}}>
        <UserProfileSideBar/>
        <AddVehicle storeDetails={adminStoreDataFetch}/>
        </div>

  )
}

export default DriverVehicleList