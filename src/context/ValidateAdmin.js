import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import { Navigate } from 'react-router-dom'

const ValidateAdmin = ({children}) => {
    const {user, isLoggedIn} = useContext(UserContext)
    const navigate = useNavigate();

    if(!isLoggedIn) {
        return <Navigate to='/admin' />
    }
    
    return children
}

export default ValidateAdmin
