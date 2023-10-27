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

const Routers = ()=>{
  return(
    <Router>
    <Routes>

        <Route  path='/' element={<Simple />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/register" element={<Register />}/>
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



