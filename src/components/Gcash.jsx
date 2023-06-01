import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import React, {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { firebaseConfig } from '../utils/utils';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push } from 'firebase/database'
import moment from 'moment';
import { validateNumber } from '../utils/validator';



const Gcash = ({cardId, balance}) => {

  const app = initializeApp(firebaseConfig);

  const [mobileNum , setMobileNum] = useState('');
  const [loadVal, setLoadVal] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [error, setError] = useState('Error : ');
  

  const handleLoad = ()=>{
    setErrorOpen(false);
    let pattern = /^(09|\+639)\d{9}$/
    if(!pattern.test(mobileNum)){
      setError('Invalid Mobile Number, Please Enter a Valid Mobile Number');
      setErrorOpen(true);
    }
    else if(loadVal === '' || loadVal === 0) {
      setError('Please Enter A Valid Amount Greater than Zero!');
      setErrorOpen(true);
    }
    else{
      if(!errorOpen){
        console.log('Load Here')
        const newBalance = parseFloat(loadVal) + parseFloat(balance);
        const database = getDatabase(app);
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
        load_value : parseInt(loadVal)
    }

    const newData = {
        date : moment().format(),
        value : parseInt(loadVal)
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
    <>
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
    <Box
      sx = {{
        // border : '1px solid #000',
        display : 'flex',
        padding : '5px',
        alignItems : 'center',
      }}
    >
      <Box display='flex' alignItems='center'>
        <Typography variant='h5' mx='10px' color = '#0078F7' fontWeight='bold'>GCash Details</Typography>
        <TextField label='Your GCash No.' type='text' sx = {{
          '& .MuiInputLabel-root'  : {
            fontWeight : 'bold',
            color : '#025464',
          }
        }}
          value= {mobileNum}
          onChange={(e)=>{setMobileNum(e.target.value)}}
        />
      </Box>
      <Box display='flex' alignItems='center'>
        <Typography variant='h5' mx='10px' color = 'secondary' fontWeight='bold'>Load</Typography>
        <TextField label='Enter Amount' type='number' sx = {{
          '& .MuiInputLabel-root'  : {
            fontWeight : 'bold',
            color : '#025464',
          }
        }}
        value={loadVal}
        onChange={(e)=>{setLoadVal(validateNumber(e.target.value))}}
        />
      </Box>
      <Button variant='contained'  color='success' sx = {{mx: '10px'}} onClick = {handleLoad}>
        Load Card
      </Button>
    </Box>
    </>
  )
}

export default Gcash
