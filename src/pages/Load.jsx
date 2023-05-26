import React from 'react'
import { Box, Typography } from '@mui/material'
import Nav from '../components/Nav'
import { useParams } from 'react-router-dom'

const Load = () => {
    const { id } = useParams();

  return (
    <Box>
      <Nav/>
      <Box p='20px' width='100vw'>
        <Typography variant='h2' sx ={{
          textAlign:'center',
          mb : '20px'
        }}> Card Details</Typography>
        <Box>
            {id}
        </Box>
      </Box>
    </Box>
  )
}

export default Load
