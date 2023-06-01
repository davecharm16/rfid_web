import React, { useContext, useEffect, useState } from 'react'
import {Box, Card, CardHeader, Typography, useTheme, CardContent, TextField, Button, Collapse, Alert, IconButton} from '@mui/material'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from '../utils/utils';
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Nav from '../components/Nav'
import { getDatabase, set, ref, get, child } from 'firebase/database';


const RegisterCard = () => {
  const app = initializeApp(firebaseConfig);
  const theme = useTheme();

  const [cardId, setCardId] = useState('');
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [error, setError] = useState('Error');
  

  
  const handleSubmit = () =>{
    setErrorOpen(false);
    if(balance <= 0 || name === '' || plate === '' || cardId === ''){
      setError('Error : Please Complete all the Fields!');
      setErrorOpen(true);
    }
    else{
      const data = {
        UID : cardId,
        balance : parseFloat(balance).toFixed(2),
        entryDateTime : '',
        entryStatus : '',
        exitDateTime : '',
        name : name,
        plateNumber : plate,
        topup : {},
      }
      if(!errorOpen){

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${cardId}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            alert('Card Already Registered');
          } else {
            const db = getDatabase();
            set( ref(db, 'users/' + cardId), data)
            .then(()=>{
              alert('Successfully Registered A Card');
            });
            // console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });


      }
    }
  }

  useEffect(()=>{
    
  },[])

  return (
    <>
    <Nav/>
    <Box display='flex' width='100vw' flexDirection='column' alignItems='center' py='40px'>
      <Typography variant='h2' mb='20px' color={theme.palette.primary.main} fontWeight='bold'>
        Register Card
      </Typography>
      <Collapse in={errorOpen}>
      <Alert severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setErrorOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {error}
      </Alert>
      </Collapse>
      <Card variant='outlined' sx={{minWidth : '500px', padding : '10px'}}  >
        <CardHeader subheader = "Enter Card Information Here!" 
        sx ={{ 
          textAlign : 'center', 
          '& .MuiCardHeader-title' : {
          fontSize : '2rem'
          },
          '& .MuiCardHeader-subheader' : {
          fontSize : '1.5rem',
          color : theme.palette.secondary.main
          },
          color : theme.palette.secondary.main
        }}/>
        <CardContent sx = {{
          display : 'flex',
          flexDirection : 'column', 
          paddingX : '50px',
          justifyContent : 'space-around',
          alignItems: 'center'
        }}>
          <Box>
            <TextField variant= 'outlined' name = 'cardId' type='text' label = 'Card UID' sx ={{m: '10px'}}
              value={cardId}
              onChange={(e)=>setCardId(e.target.value)}
            />
            <TextField variant= 'outlined' name = 'balance' type='number' label = 'Initial Balance' sx ={{m: '10px'}}
              onChange={(e)=>setBalance(e.target.value)}
              value={balance}
            />
          </Box>
          <Box>
            <TextField variant= 'outlined' name = 'name' type='text' label = 'Name' sx ={{m: '10px'}}
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
            <TextField variant= 'outlined' name = 'plate' type='text' label = 'Plate Number' sx ={{m: '10px'}}
              inputProps={{maxLength : 6}}
              onChange={(e)=>setPlate(e.target.value)}
              value={plate}
            />
          </Box>
          <Button variant="contained" color='info' sx = {{alignSelf : 'center', color : '#fff'}} onClick={handleSubmit}>Register</Button>
        </CardContent>
      </Card>
    </Box>
    </>
  )
}

export default RegisterCard
