import React from 'react'
import { useTheme, Typography, Box, TextField, Button} from '@mui/material'

const Home = () => {
  const theme = useTheme();

  return (
    <Box display='flex' justifyContent= 'center' alignItems = 'center' minWidth='100vw' minHeight = '100vh' flexDirection='column'
      sx = {{
        // backgroundImage: "linear-gradient(to bottom, rgba(245, 245, 245, 0.3), rgba(245, 246, 252, 0.3)),url('./bg.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Typography variant='h1' color={theme.palette.primary.main} fontWeight='bold'>RFID PARKING</Typography>
      <Typography variant='h2' color={theme.palette.secondary.main} fontWeight='bold' >Load your Card Here</Typography>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <TextField type='text' name='card_name' variant='outlined' label='CARD NUMBER' sx = {{m: '20px', 
        }}/>
        <Button variant='contained' color='success'>Search</Button>
      </Box>
    </Box>
  )
}

export default Home
