import React from 'react'
import ProfilePage from '../../../Components/Profile/ProfilePage'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import {userProfile} from "../../../Utils/urls"

function Profile() {
  const userStoreData = useSelector((store)=> store.authuser.userData)
  const userId = userStoreData.user.user_id;
  const userAccessToken = userStoreData.data.access;
  const path = userProfile+userId
  const role = userStoreData.user.role
  return (
    <div >
      <ProfilePage endPoint ={path} accessToken={userAccessToken} role={role}/>
    </div>
  )
}

export default Profile