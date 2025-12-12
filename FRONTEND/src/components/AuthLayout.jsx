import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthLayout = ({children}) => {
  const {isAuthenticated} = useSelector((state)=> state.auth)
  return isAuthenticated ? children : <Navigate to='/auth' />
  
}

export default AuthLayout