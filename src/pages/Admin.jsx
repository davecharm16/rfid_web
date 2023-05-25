import { Box } from '@mui/material'
import React, {useEffect, useState} from 'react'
import Nav from '../components/Nav'

const Admin = () => {

  const [data, setData]  = useState();
  
  useEffect(() => {
    
  }, [])

  return (
    <Box>
      <Nav/>
      <Box p='20px' width='100vw' height='100vh'>
        
      </Box>
    </Box>
  )
}

export default Admin
