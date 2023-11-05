import {useSelector} from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'
import { selectUser } from '../../Redux/slices/userSlice/authSlice'


const PrivateRouteUser = ()=>{
    const user = useSelector(selectUser)
    return(
        user?<Outlet/> : <Navigate to= '/login'/>
    )

}

export default PrivateRouteUser