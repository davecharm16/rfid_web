import { Box, Button, TextField, Typography, Collapse, Alert } from '@mui/material'
import React, { useState } from 'react'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { formatCreditCardNumber, formatExpirationDate, formatCVC } from '../utils/payment';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { firebaseConfig } from '../utils/utils';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push } from 'firebase/database'
import moment from 'moment';
import { validateNumber } from '../utils/validator';

const CardCC = ({cardId, balance}) => {
  const app = initializeApp(firebaseConfig);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [focused, setFocused] = useState('');
  const [cvc, setCVC] = useState('');
  const [expiry, setExpiry] = useState('');
  const [loadVal, setLoadVal] = useState(0);
  const [errorOpen, setErrorOpen] = useState(false);
  const [error, setError] = useState('Error : ');


  const handleLoad = ()=>{
    setErrorOpen(false);

    if(name === '' || number === '' || cvc === '' || expiry === ''){
      setError('Please Complete the Required Fields!');
      setErrorOpen(true);
    }
    else if(loadVal === '' || loadVal <= 0) {
      setError('Please Enter A Valid Amount Greater than Zero!');
      setErrorOpen(true);
    }
    else{
      if(!errorOpen){
        console.log('Load Here')
        const newBalance = parseFloat(loadVal) + parseFloat(balance);
        const database = getDatabase();
        const valueRef = ref(database, `users/${cardId}/balance`);
        
        set(valueRef, newBalance)
        .then(() => {
            updateTopUpData();
            console.log('Value updated successfully!');
        })
        .catch((error) => {
            alert(error);
            console.error('Error updating value:', error);
        });
      }
    }
  }

  
  const updateTopUpData = () =>{
    const database = getDatabase();
    const dataRef = ref(database, `users/${cardId}/topup`);
    const topUpRef = ref(database, `topups/`);

    const newTopUpRef = push(topUpRef);
    const newDataRef = push(dataRef);

    const newTopUpData = {
        card_id : cardId,
        date : moment().format(),
        load_value : parseInt(loadVal),
        method : 'Card',
    }

    const newData = {
        date : moment().format(),
        value : parseInt(loadVal),
        method : 'Card',
    }

    set(newDataRef,newData)
    .then(() => {
        console.log('New data added successfully! Load Top up');
    })
    .catch((error) => {
        console.error('Error adding new data:', error);
    });

    set(newTopUpRef,newTopUpData)
    .then(() => {
        console.log('New data added successfully!');
        setLoadVal(0);
        alert('Load successful');
    })
    .catch((error) => {
        console.error('Error adding new data:', error);
    });
  }

  return (
    <Box>
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
      <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focused}
          name={name}
          number={number}
        />
        <form>
          <Box display='flex' flexDirection= 'column' my='10px'>
            <TextField variant='outlined' label='Full Name' name='name' sx={{my : '5px'}} 
              onChange={(e)=>{setName(e.target.value)}}
              onFocus={(e)=>{setFocused(e.target.name)}}
              value={name}
            />
            <TextField variant='outlined' label='Credit Card Number' name='number' sx={{my : '5px'}}
              onChange={(e)=>{
                setNumber(formatCreditCardNumber(e.target.value))
              }}
              type='tel'
              onFocus={(e)=>{setFocused(e.target.name)}}
              inputProps={{inputMode : 'numeric', pattern : '[\d| ]{16,22}', maxLength : 19}}
              value={number}
              required
            />
            <Box>
              <TextField  
                name='expiry' 
                sx={{my : '5px', mr:'5px'}}
                type='tel'
                label = 'Expiration Date'
                inputProps={{inputMode : 'numeric', pattern : '\d\d/\d\d'}}
                onChange={(e)=>{
                  setExpiry(formatExpirationDate(e.target.value))
                }}
                onFocus={(e)=>{
                  setFocused(e.target.name)
                }}
                value={expiry}
              />
              <TextField variant='outlined' label='CVC' name='cvc' sx={{my : '5px', ml:'5px'}}
                inputProps={{inputMode : 'numeric', pattern : '\d\d/\d\d'}}
                onChange={(e)=>{
                  setCVC(formatCVC(e.target.value))
                }}
                onFocus={(e)=>{
                  setFocused(e.target.name)
                }}
                value={cvc}
              />
            </Box>
            <TextField label='Load Amount' sx={{my : '5px'}}
              type='number'
              onChange={(e)=>{
                setLoadVal(validateNumber(e.target.value))
              }}
              value={loadVal}
            />
            <Button color='success' variant='contained' sx={{alignSelf : 'center', m:'10px'}} onClick={handleLoad}>Load</Button>
          </Box>
        </form>
    </Box>
  )
}

export default CardCC
