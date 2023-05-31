import React, { useEffect, useState } from 'react'
import { useTheme, Typography, Box, TextField, Button, Card, CardContent} from '@mui/material'
import { firebaseConfig } from '../utils/utils';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import Gcash from '../components/Gcash';
import PayMaya from '../components/PayMaya';


const Home = () => {
  const theme = useTheme();
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const [card, setCard] = useState(null);
  const [cardId , setCardId] = useState('');
  const [payment, setPayment] = useState('');
  const [search, setSearch] = useState(false);

  const handleCard = () => {
    setSearch(true);
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
      <Typography variant='h2' color={theme.palette.secondary.main} fontWeight='bold' >Load your card here</Typography>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <TextField type='text' name='card_name' variant='outlined' label='CARD NUMBER' 
          sx = {{m: '10px', 
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
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Card sx = {{width : '300px'}}>
          <CardContent sx= {{display:'flex', justifyContent:'center'}}>
            <Typography variant='h6' color={theme.palette.primary.main} fontWeight='bold' mx='10px' sx = {{flex : 1}}>Card Number</Typography>
            <Typography variant='h6' color={theme.palette.secondary.main}>{card.UID}</Typography>
          </CardContent>
          <CardContent sx= {{display:'flex', justifyContent:'center'}}>
            <Typography variant='h6' color={theme.palette.primary.main} fontWeight='bold' mx='10px' sx = {{flex : 1}}>Card Holder</Typography>
            <Typography variant='h6' color={theme.palette.secondary.main}>{card.name}</Typography>
          </CardContent>
          <CardContent sx= {{display:'flex', justifyContent:'center'}}>
            <Typography variant='h6' color={theme.palette.primary.main} fontWeight='bold' mx='10px' sx = {{flex : 1}}>Card Balance</Typography>
            <Typography variant='h6' color={theme.palette.secondary.main}>₱ {parseFloat(card.balance).toFixed(2)}</Typography>
          </CardContent>
        </Card>
        <Typography my='20px' fontWeight='bold'>Select Payment Method</Typography>
        <Box>
              <Box className="cc-selector" display='flex' justifyContent='center' alignItems='center' >
                <Box mx='10px'>
                  <input id="gcash" type="radio" name="payment" value="gcash" onChange={(e)=>{
                    setPayment(e.target.value)
                  }}/>
                  <label className="drinkcard-cc gcash" htmlFor="gcash"></label>
                </Box>
                <Box mx='10px'>
                  <input id="paymaya" type="radio" name="payment" value="paymaya" onChange={(e)=>{
                    setPayment(e.target.value)
                  }}/>
                  <label className="drinkcard-cc paymaya" htmlFor="paymaya"></label>
                </Box>
                <Box mx='10px'>
                  <input id="visa" type="radio" name="payment" value="visa" onChange={(e)=>{
                    setPayment(e.target.value)
                  }}/>
                  <label className="drinkcard-cc visa" htmlFor="visa"></label>
                </Box>
                <Box mx='10px'>
                  <input id="mastercard" type="radio" name="payment" value="mastercard" onChange={(e)=>{
                    setPayment(e.target.value)
                  }} />
                  <label className="drinkcard-cc mastercard" htmlFor="mastercard"></label>
                </Box>
              </Box>
              { (payment === 'gcash') && <Gcash cardId={cardId} balance={card.balance}/>}
              { (payment === 'paymaya') && <PayMaya/>}
              { (payment === 'visa') && <Card/>}
              { (payment === 'mastercard') && <Card/>}
        </Box>
      </Box>
    }

    {
      (card === null && search === true) && 
      <Typography variant='h2' color='#DF4554'>Card is Not Registered / Found</Typography> 
    }
        
      </Box>
    </Box>
  )
}

export default Home
