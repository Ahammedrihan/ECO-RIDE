import React from 'react'
import Headers from './Components/Header/Headers'
import Login from './Containers/User/Login/';
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Containers/User/Home';
import Register from './Containers/User/Register';
import Simple from './Containers/User/Simple';
import AdminLogin from './Containers/Admin/Login/AdminLogin';
import AdminHome from './Containers/Admin/Home/AdminHome';
import SignIn from './Containers/User/login';
import SignUp from './Containers/User/Register';
import PrivateRouteUser from './Utils/PrivateRouteUser';
import PrivateRouteAdmin from './Utils/PrivateRouteAdmin';
import {useSelector} from 'react-redux'
 
import DriverList from './Containers/Admin/Home/DriverList';
import SideBar from './Containers/Admin/Home/SideBar';
import UserList from './Containers/Admin/Home/UserList';
import Profile from './Containers/User/Profile/Profile.jsx';
const Routers = ()=>{

  return(
    <Router>
    <Routes>
        {/* {<---------------------USER ROUTES-------------->} */}
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<SignIn/>} />
        <Route path='/register' element={<SignUp/>} />
           <Route element={<PrivateRouteUser/>}>
           <Route path='/profile' element={<Profile/>} />
        

        </Route>
        
        
        {/* <--------------ADMIN ROUTE---------------------> */}
 
        <Route path="/admin" element={<AdminLogin/>}/>
        
        <Route element={<PrivateRouteAdmin/>}>
          <Route path="/admin/home" element={<AdminHome/>}/>
          <Route path="/admin/driver-list" element={<DriverList/>}/>
          <Route path="/admin/user-list" element={<UserList/>}/>

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
         <Footer/>
      </Routers>
    </div>
  )
}

export default App



