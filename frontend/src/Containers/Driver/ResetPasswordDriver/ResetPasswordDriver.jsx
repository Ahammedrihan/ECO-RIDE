import React from 'react'
import {useSelector} from  'react-redux'
import ResetPassword from '../../../Components/ResetPassword/ResetPassword'
import DriverSideBar from '../../../Components/Driver/driverSidebar'


function ResetPasswordDriver() {
    const accessToken = useSelector((store)=>store.driverauth.driverData)
  return (
    <div style={{display :"flex"}}>
    <DriverSideBar/>
    <ResetPassword accessToken={accessToken} />
    </div>
  )
}

export default ResetPasswordDriver