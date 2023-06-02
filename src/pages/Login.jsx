import React, { useContext, useEffect, useState } from 'react'
import {Box, Card, CardHeader, Typography, useTheme, CardContent, TextField, Button, Alert} from '@mui/material'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from '../utils/utils';
import { initializeApp } from "firebase/app";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';



const Login = () => {
  const app = initializeApp(firebaseConfig);
  const theme = useTheme();
  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate('/dashboard');

  const [email, setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const handleSubmit = () =>{
    const auth = getAuth(app);
    console.log(email,password)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        updateUser(user);
        navigate('/dashboard')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        setError('Error Logging In : ' + errorMessage);
      });
  }

  useEffect(()=>{
    
  },[])

  return (
    <Box display='flex' justifyContent='center' width='100vw' height='100vh' flexDirection='column' alignItems='center'>
      <Typography variant='h1' mb='20px' color={theme.palette.primary.main}>
        RFID PARKING SYSTEM
      </Typography>
      {
        (error) &&
        <Alert severity='error'>{error}</Alert>
      }
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
          <TextField variant= 'outlined' name = 'email' type='email' label = 'Email' sx ={{mb: '10px'}}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField variant= 'outlined' name = 'password' type='password' label = 'Password' sx ={{mb: '10px'}}
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
          />
          <Button variant="contained" sx = {{alignSelf : 'center'}} onClick={handleSubmit}>Login</Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
