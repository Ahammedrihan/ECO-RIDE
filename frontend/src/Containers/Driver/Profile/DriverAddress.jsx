import React from 'react'
import AddressPage from '../../../Components/Profile/AddressPage'

function DriverAddress() {

  return (
    <div>
        <AddressPage/>
    </div>
  )
}

export default DriverAddress






// import UserProfileSideBar from '../../../Components/User/UserProfileSidebar'
// import {useSelector } from 'react-redux'

// function Address() {

//   const userStoreData = useSelector((state)=> state.authuser.userData)
//   const userId = userStoreData.user.user_id;
//   const userAccessToken = userStoreData.data.access;
//   console.log( userStoreData.data.access)
//   console.log(userId,"user")




//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',paddingTop:"30px"}}>
//       <UserProfileSideBar/>
//       <AddressPage accessToken ={userAccessToken} userId={userId} />
     
//     </div>
//   )
// }

// export default Address