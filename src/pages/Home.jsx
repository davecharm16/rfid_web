import React, { useEffect, useState } from 'react'
import { useTheme, Typography, Box, TextField, Button, Card, CardContent} from '@mui/material'
import { firebaseConfig } from '../utils/utils';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';


const Home = () => {
  const theme = useTheme();
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const [card, setCard] = useState(null);
  const [cardId , setCardId] = useState('');

  const handleCard = () => {
    console.log(cardId);
    const starCountRef = ref(db, `users/${cardId}`);
    onValue(starCountRef, (snapshot) => {
      const d = snapshot.val();
      setCard(d);
    });
  }

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
        <TextField type='text' name='card_name' variant='outlined' label='CARD NUMBER' 
          sx = {{m: '20px', 
          }}
          onChange={(e)=>{
            setCardId(e.target.value);
          }}
        />
        <Button variant='contained' color='success' onClick={handleCard}>Search</Button>
      </Box>
      <Box>
      {
        card &&
        <>
        <Card sx = {{width : '300px'}}>
          <CardContent sx= {{display:'flex', justifyContent:'center'}}>
            <Typography variant='h6' color={theme.palette.primary.main} fontWeight='bold' mx='10px' sx = {{flex : 1}}>Card Number</Typography>
            <Typography variant='h6' color={theme.palette.secondary.main}>04 2F EG 1C</Typography>
          </CardContent>
          <CardContent sx= {{display:'flex', justifyContent:'center'}}>
            <Typography variant='h6' color={theme.palette.primary.main} fontWeight='bold' mx='10px' sx = {{flex : 1}}>Card Holder</Typography>
            <Typography variant='h6' color={theme.palette.secondary.main}>Jane Doe</Typography>
          </CardContent>
          <CardContent sx= {{display:'flex', justifyContent:'center'}}>
            <Typography variant='h6' color={theme.palette.primary.main} fontWeight='bold' mx='10px' sx = {{flex : 1}}>Card Balance</Typography>
            <Typography variant='h6' color={theme.palette.secondary.main}>20.00</Typography>
          </CardContent>
        </Card>
        <Typography my='20px'>Select Payment Method</Typography>
        <Box>
          
        </Box>
        </>
      }
        
      </Box>
    </Box>
  )
}

export default Home
