import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'

const ValidateAdmin = ({children}) => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate();

    useEffect (()=>{
        if(!user){
            navigate('/admin')
        }
    },[])

    if(user) {
        return children
    }
}

export default ValidateAdmin
