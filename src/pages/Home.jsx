import React from 'react'
import { useTheme, Typography } from '@mui/material'

const Home = () => {
  const theme = useTheme();

  return (
    <div>
      <Typography variant='h1'>Home</Typography>
    </div>
  )
}

export default Home
