import React, { useEffect } from 'react'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'

const Nav = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
          RFID SYSTEM
        </Typography>
        <Button color='warning' variant='contained'>Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Nav
