import {Navigate,Outlet} from 'react-router-dom'
import { selectDriver } from '../../Redux/slices/driverSlice/driverauthSlice'
import { useSelector } from 'react-redux'


const PrivateDriverRoute = ()=>{
    const driver = useSelector(selectDriver)
    return(
        driver ? <Outlet/> : <Navigate to ="/driver/login"/>
    )
}

export default PrivateDriverRoute;