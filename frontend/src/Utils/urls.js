export const baseUrl = "http://127.0.0.1:8000";



export const signup = "api/user/register/"; 
export const userLoginUrl = "api/token/";
export const driverLoginUrl = "api/token/";
export const getUsers = "/api/user/get-users/";
export const getDrivers = "/api/user/get-drivers/";
export const resetPassword ="/api/user/reset-password/"
export const userLogout = "/api/user/user-logout/"


// <<<<<<<<DRIVER>>>>>>>

export const signupDriver = "/api/user/driver-register/"

export const userAddressAdd = "/api/user/user-address/<int:user_id>"
export const addVehicle = "/api/user/add-vehicle/<int:user_id>/";

export const driverProfile = "api/driver/driver/profile/"
export const userProfileurl = "api/user/profile/"

// export const userBlock = baseUrl+"user-block/<int:user_id>/"

export const driverManageVehicleUrl = "api/driver/profile/manage-vehicle/<int:vehicle_id>/"



export const basicProfileUrl = "/api/user/basic-profile-fetch"

