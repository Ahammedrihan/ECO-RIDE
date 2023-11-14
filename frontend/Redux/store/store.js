import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "../slices/userSlice/authSlice";
import authAdminReducer from '../slices/adminSlice/adminauthSlice'
import authDriverReducer from '../slices/driverSlice/driverauthSlice'

const store = configureStore({
    reducer :{
        authuser:authUserReducer, 
        adminauth: authAdminReducer,
        driverauth : authDriverReducer,

        

    }  
    
})



export default store