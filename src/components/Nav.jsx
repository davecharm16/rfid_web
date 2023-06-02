import React, { useContext, useEffect } from 'react'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const Nav = () => {
  const navigate = useNavigate();
  const {setLogOut} = useContext(UserContext);

  return (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
          RFID PARKING SYSTEM DASHBOARD
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
        <Button color='warning' variant='contained'
          onClick={()=>{
            setLogOut();
            navigate('/admin')
          }}
        >Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Nav
