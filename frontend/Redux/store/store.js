import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "../slices/userSlice/authSlice";
import authAdminReducer from '../slices/adminSlice/adminauthSlice'

const store = configureStore({
    reducer :{
        authuser:authUserReducer, 
        adminauth: authAdminReducer,

        

    }  
    
})



export default store