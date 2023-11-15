import React from 'react'
import AddVehicle from '../../../Components/Driver/AddVehicle'
import { selectDriver } from '../../../../Redux/slices/driverSlice/driverauthSlice'
import {  useSelector } from 'react-redux'
import { display } from '@mui/system'
import DriverSideBar from '../../../Components/Driver/driverSidebar'

function DriverVehicleList() {
    const  adminStoreDataFetch = useSelector((state)=>state.driverauth.driverData)
  return (
    <div style={{display:"flex"}}>
        <DriverSideBar/>
        <AddVehicle storeDetails={adminStoreDataFetch}/>
        </div>

  )
}

export default DriverVehicleList