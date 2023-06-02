import React, { useEffect } from 'react'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate();

  return (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
          RFID SYSTEM DASHBOARD
        </Typography>
        <Button  sx={{mr : '20px'}} color='info' variant='contained' onClick={()=>{
          navigate('/transactions');
        }}>
          All Transactions
        </Button>
        <Button  sx={{mr : '20px'}} color='info' variant='contained' onClick={()=>{
          navigate('/dashboard');
        }}>
          Dashboard
        </Button>
        <Button  sx={{mr : '20px'}} color='success' variant='contained' onClick={()=>{
          navigate('/register');
        }}>
          Register Card
        </Button>
        <Button color='warning' variant='contained'>Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Nav
