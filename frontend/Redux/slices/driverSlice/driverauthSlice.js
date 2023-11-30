import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    driverData : localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):null

}

export const driverAuthSlice = createSlice({
    name : "driverauth",
    initialState,
    reducers:{
        driverLogin : (state,action)=>{
            state.driverData = action.payload
            localStorage.setItem("userData",JSON.stringify(action.payload))
        },
        driverLogout : (state)=>{
            console.log(state,"state of driver in slice")
            state.driverData = null
            // localStorage.removeItem("userData")
        }
        
    }
})


export default driverAuthSlice.reducer;
export const {driverLogin, driverLogout} = driverAuthSlice.actions;
export const selectDriver = (state) => state.driverauth.driverData