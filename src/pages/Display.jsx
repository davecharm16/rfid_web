import { Box, CircularProgress, Typography } from '@mui/material'
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react'
import { firebaseConfig } from '../utils/utils';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';

const Display = () => {
  const [data, setData] = useState(null);
  const [dataUID , setDataUID] = useState('')
  const [empty, setEmpty] = useState(false);
  const [reference, setReference] = useState(undefined);
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const params = useParams();
  const navigate = useNavigate();
  const {status} = params;


  useEffect(() => {

    let reference = undefined;
    if(status === 'entry' || status === 'exit'){
      (status === 'entry') ? reference  = '/recentTransaction': reference  = '/exitTransaction'
    }
    else{
      navigate('/')
    }

    const dbRef = ref(db, reference);
    onValue(dbRef, (snapshot) => {
      const dataFromFirebase = snapshot.val();
      console.log(dataFromFirebase.UID);
      setData(dataFromFirebase);
      setDataUID(dataFromFirebase.UID);
  
      // Create a new Promise every time new data is fetched
      const displayData = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('yow');
        }, 5000)
      });
  
      displayData.then((val) => {
        console.log(val);
        setEmpty(true); // setEmpty to true after 7 seconds
      });
    });
  }, [reference]);
  

  useEffect(()=>{
    if(dataUID === "") {
      setEmpty(true);
    }
    else{
      setEmpty(false);
    }
  },[data])

  
  return (
    
    <Box minWidth='100vw' minHeight= '100vh' display='flex'  justifyContent = 'center' alignItems='center' flexDirection='column'>
      {
        (data) ?
        <>
          <Typography variant='h2' color='primary' fontWeight='bold' top='0' position='absolute'>RFID PARKING SYSTEM</Typography>
          {
          (empty) &&
            <Typography variant='h1' color='secondary' textAlign='center' fontSize='8vw' fontWeight='bold'> Please Tap Your Card</Typography>
          }
          {
            (!empty) &&
            <>
            <Box display='flex' mb='3rem'>
                <Typography variant='h1' fontWeight='bold' color={(data.checkedAllParams) ? 'primary' : '#c62828'} fontSize='8em' >{data.messagePrompt}
                </Typography>
            </Box>
              {
              (data.checkedAllParams) &&
              <>
                <Box display='flex'>
                    <Typography variant='h1' fontWeight='bold' color='secondary' fontSize='7em'>Card ID:</Typography>
                    <Typography variant='h1' fontWeight='bold' color='#4BB543' fontSize='7em'>{'\u00A0'}{data.UID}</Typography>
                </Box>
                <Box display='flex'>
                    <Typography variant='h1' fontWeight='bold' color='secondary' fontSize='7em'>New Balance:</Typography>
                    <Typography variant='h1' fontWeight='bold' color='#4BB543' fontSize='7em'> {'\u00A0'}{` ₱ ${parseFloat(data.newBal).toFixed(2)}`} </Typography>
                </Box>
              </>
              }
            </>
          }
        </>
        :
        <>
          <CircularProgress  color='primary' size='10em'/>
        </>
      }
    </Box>                                          
  )
}

export default Display
