import React, { useEffect } from 'react'
import {Box, Card, CardHeader, Typography, useTheme, CardContent, TextField, Button} from '@mui/material'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from '../utils/utils';
import { initializeApp } from "firebase/app";


const app = initializeApp(firebaseConfig);

const Login = () => {
  const theme = useTheme();

  const handleSubmit = (email, password) =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  useEffect(()=>{

  },[])

  return (
    <Box display='flex' justifyContent='center' width='100vw' height='100vh' flexDirection='column' alignItems='center'>
      <Typography variant='h1' mb='20px' color={theme.palette.primary.main}>
        RFID SYSTEM
      </Typography>
      <Card variant='outlined' sx={{minWidth : '500px', width: '800px', padding : '10px'}}  >
        <CardHeader title="ADMIN LOGIN" subheader = "Log in your admin account here!" 
        sx ={{ 
          textAlign : 'center', 
          '& .MuiCardHeader-title' : {
          fontSize : '2rem'
          },
          '& .MuiCardHeader-subheader' : {
          fontSize : '1.5rem'
          },
          color : theme.palette.primary.main
        }}/>
        <CardContent sx = {{
          display : 'flex',
          flexDirection : 'column', 
          paddingX : '50px',
          justifyContent : 'space-around'
        }}>
          <TextField variant= 'outlined' name = 'email' type='email' label = 'Email' sx ={{mb: '10px'}}/>
          <TextField variant= 'outlined' name = 'password' type='password' label = 'Password' sx ={{mb: '10px'}}/>
          <Button variant="contained" sx = {{alignSelf : 'center'}} onClick={handleSubmit}>Login</Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
