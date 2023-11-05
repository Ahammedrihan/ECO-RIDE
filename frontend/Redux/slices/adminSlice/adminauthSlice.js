import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {

    adminAuthTokenData : localStorage.getItem("adminData")?JSON.parse(localStorage.getItem("adminData")):null,
}

export const adminauthSlice = createSlice({
    name: 'adminauth',
    initialState,
    reducers:{
        setAdminLoginCredentials :(state,action)=>{
            state.adminAuthTokenData = action.payload
            console.log(state.adminAuthTokenData,"admin token")
            localStorage.setItem('adminData', JSON.stringify(action.payload)); 

        },
        logoutAdmin:(state)=>{
            state.adminAuthTokenData =  null
            localStorage.removeItem('adminData');
        }

    }
})

export const {setAdminLoginCredentials,logoutAdmin} = adminauthSlice.actions
export default adminauthSlice.reducer;
