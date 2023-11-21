import { fontWeight } from '@mui/system'
import React from 'react'

function UserHomeCarousal() {
  return (


    <div style={{backgroundColor:"black",height:"200px",borderWidth:"1px",borderColor:"white"}}>



        <div style={{alignItems: 'center',color: 'white', textAlign:"center",display: 'flex',justifyContent: 'center',height:"100px",fontWeight:"bold",fontSize:"30px"}}>
            For Better Ride
        </div>
        <div style={{alignItems: 'center',color: 'white', textAlign:"center",display: 'flex',justifyContent: 'center',height:"10px",paddingLeft:"20px",paddingRight:"20px",marginLeft:"20px",marginRight:"20px" ,fontSize:"15px"}}>
           Introducing eco-ride, the newest way to Book Ride. Now you have the option to request a taxi using your eco-ride app.
        </div>
        <button style={{backgroundColor:"white",border:"none",borderRadius:"9px",display:"block", margin: "auto",marginTop:"30px",height:"40px",width:"120px",fontSize:"15px",fontWeight:"bold"}}>Request taxi</button>
 
    


    </div>
  )
}

export default UserHomeCarousal