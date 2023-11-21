import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import UserHomeCarousal from '../../Components/User/HomeCarousal/UserHomeCarousal'
import WhyChoose from '../../Components/User/HomeCarousal/WhyChoose'
import Faq from '../../Components/User/Faq'

function Home() {
  return (
    <div>
      <Navbar/>
      <UserHomeCarousal/>
      <WhyChoose/>

      <Faq />
   
      <h1> user home</h1>


    </div>
  )
}

export default Home