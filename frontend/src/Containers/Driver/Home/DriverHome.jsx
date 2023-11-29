import React from 'react'
import Navbar from '../../../Components/Driver/Navbar'
import CarousalBar from '../../../Components/Carousal/Carousal'
import SecondNavbar from '../../../Components/Driver/SecondNavbar'
import DriverHomeCarousal from '../../../Components/Driver/DriverHomeCarousal'

function DriverHome() {
  return (
    <div>DriverHome
      <Navbar/>
      <SecondNavbar/>
      <DriverHomeCarousal/>
   
    </div>
  )
}

export default DriverHome

