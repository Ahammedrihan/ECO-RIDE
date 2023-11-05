import {Navigate , Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'



const PrivateAdminRoute = ()=>{
    const {  adminAuthTokenData } = useSelector((state) => state.adminauth);
    console.log(adminAuthTokenData,"you are in admin private route")
    return(
       
        adminAuthTokenData? <Outlet/>:<Navigate to='/admin' />
    )
}

export default PrivateAdminRoute