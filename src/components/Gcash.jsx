import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Gcash = () => {
  return (
    <Box
      sx = {{
        // border : '1px solid #000',
        display : 'flex',
        padding : '5px',
        alignItems : 'center',
      }}
    >
      <Box display='flex' alignItems='center'>
        <Typography variant='h5' mx='10px' color = 'secondary' fontWeight='bold'>Enter Details</Typography>
        <TextField label='Your GCash No.' type='text' sx = {{
          '& .MuiInputLabel-root'  : {
            fontWeight : 'bold',
            color : '#025464',
          }
        }}/>
      </Box>
      <Box display='flex' alignItems='center'>
        <Typography variant='h5' mx='10px' color = 'secondary' fontWeight='bold'>Load</Typography>
        <TextField label='Enter Amount' type='text' sx = {{
          '& .MuiInputLabel-root'  : {
            fontWeight : 'bold',
            color : '#025464',
          }
        }}/>
      </Box>
      <Button variant='contained'  color='success' sx = {{mx: '10px'}}>
        Load Card
      </Button>
    </Box>
  )
}

export default Gcash
