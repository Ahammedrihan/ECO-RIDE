import React from 'react'
import UserProfileSideBar from '../../../Components/User/UserProfileSidebar'
import ResetPassword from '../../../Components/ResetPassword/ResetPassword'
import {useSelector} from  'react-redux'


function ResetPasswordUser() {
  const accessToken = useSelector((state) => state.authuser.userData);
  return (
    
    <div style={{display :"flex"}}>
    <UserProfileSideBar/>
    <ResetPassword accessToken={accessToken} />
    </div>
    
  )
}

export default ResetPasswordUser