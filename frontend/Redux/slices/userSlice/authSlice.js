import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData : localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):null  
}


export const authUserSlice = createSlice({
    name:'authuser',
    initialState,
    reducers:{
        userLogin:(state,action)=>{
            console.log(action.payload,"payload")
            state.userData = action.payload
            localStorage.setItem('userData',JSON.stringify(action.payload))
        },
        userLogout:(state)=>{
            state.userData = null
            localStorage.removeItem('userData');
        }
       
        
    }
})


export const {userLogin,userLogout} = authUserSlice.actions;
export default authUserSlice.reducer;

export const selectUser = (state) => state.authuser.userData;