import React from 'react'
import Login from './Containers/User/Login/';
import Navbar from './Components/Navbar/Navbar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Containers/User/Home';
import Register from './Containers/User/Register';
import Simple from './Containers/User/Simple';
import AdminLogin from './Containers/Admin/Login/AdminLogin';
import AdminHome from './Containers/Admin/Home/AdminHome';
import SignIn from './Containers/User/Login.jsx';
import SignUp from './Containers/User/Register';
import PrivateRouteUser from './Utils/PrivateRouteUser';
import PrivateRouteAdmin from './Utils/PrivateRouteAdmin';
import {useSelector} from 'react-redux'
 
import DriverList from './Containers/Admin/Home/DriverList';
import SideBar from './Containers/Admin/Home/SideBar';
import UserList from './Containers/Admin/Home/UserList';
import Profile from './Containers/User/Profile/Profile.jsx';
import Address from './Containers/User/Address/Address.jsx';
import DriverRegister from './Containers/Driver/Register/DriverRegister.jsx';
import DriverLogin from './Containers/Driver/Login/Login.jsx';
import DriverHome from './Containers/Driver/Home/DriverHome.jsx';
import LocationComponent  from './Containers/User/Address/UserLocation.jsx';
import PrivateDriverRoute from './Utils/PrivateRouteDriver.jsx';
import DriverProfile from './Containers/Driver/Profile/DriverProfile.jsx';
import AddVehicle from './Components/Driver/AddVehicle.jsx';
import DriverVehicleList from './Containers/Driver/Vehicle/DriverVehicleList.jsx';
import AddressDriver from './Containers/Driver/Address/AddressDriver.jsx';
import DriverActive from './Containers/Driver/DriverActivate.jsx/DriverActive.jsx';
import RequestRide from './Containers/User/RequestRide/RequestRide.jsx';
import BookVehicle from './Containers/User/BookVehicle/BookVehicle.jsx';
import DriverTrip from './Containers/Driver/Trips/DriverTrip.jsx';
import BasicModal from './Components/Driver/DriverRules.jsx';
import DriverAllTrips from './Containers/Driver/Trips/DriverAllTrips.jsx';
import UserTripDetails from './Containers/User/Trips/Trips.jsx';
import ResetPasswordUser from './Containers/User/ResetPassword/ResetPasswordUser.jsx';
import ResetPasswordDriver from './Containers/Driver/ResetPasswordDriver/ResetPasswordDriver.jsx';
const Routers = ()=>{

  return(
    <Router>
    <Routes>
        {/* {<---------------------USER ROUTES-------------->} */}
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<SignIn/>} />
        <Route path='/register' element={<SignUp/>} />
        

        


        <Route path='/location' element={<LocationComponent/>} />
        
            <Route element={<PrivateRouteUser/>}>
              <Route path='/profile' element={<Profile/>} />
              <Route path='/reset-password' element={<ResetPasswordUser/>} />
              <Route path='/address' element={<Address/>} />
              <Route path='/request-ride' element={<RequestRide/>} />
              <Route path='/book-vehicle' element={<BookVehicle/>} />
              <Route path='/user-trips' element={<UserTripDetails/>} />
              
            </Route>
        
        
        {/* <--------------ADMIN ROUTE---------------------> */}
 
        <Route path="/admin" element={<AdminLogin/>}/>
          <Route element={<PrivateRouteAdmin/>}>
            <Route path="/admin/home" element={<AdminHome/>}/>
            <Route path="/admin/driver-list" element={<DriverList/>}/>
            <Route path="/admin/user-list" element={<UserList/>}/>
         </Route>


          {/* <--------------Driver Route---------------------> */}
          <Route path='/driver/register' element = {<DriverRegister/>}/>
          <Route path='/driver/login' element = {<DriverLogin/>}/>
          <Route path='/rules' element={<BasicModal/>} />
          <Route element= {<PrivateDriverRoute/>} >
    
          <Route path='/driver/home' element = {<DriverHome/>}/>
          <Route path='/driver/trips' element = {<DriverTrip/>}/>
          <Route path='/driver/all/trips' element = {<DriverAllTrips/>}/>
          <Route path='/driver/profile' element = {<DriverProfile/>}/>
          <Route path='/driver/add-vehicle' element = {<AddVehicle/>}/>
          <Route path='/driver/add-driver-vehicle' element = {<DriverVehicleList/>}/>
          <Route path='/driver/address' element={<AddressDriver/>}/>
          <Route path='/driver/location-set-activate' element={<DriverActive/>}/>
          <Route path='/driver/reset-password' element={<ResetPasswordDriver/>}/>
          



          </Route>
         

    </Routes>
    </Router>
  )
}

function App() {
  return (
    <div> 
      <Routers>
         <Navbar/>
      </Routers>
    </div>
  )
}

export default App



