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
        }
    }
})


export default driverAuthSlice.reducer;
export const {driverLogin} = driverAuthSlice.actions;
export const selectDriver = (state) => state.driverauth.driverData