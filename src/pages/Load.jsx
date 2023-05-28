import React, { useEffect, useState } from 'react'
import { Box, Card, Typography, CardContent, useTheme, TextField, Button } from '@mui/material'
import Nav from '../components/Nav'
import { useParams } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, set, push } from 'firebase/database'
import { firebaseConfig } from '../utils/utils'
import moment from 'moment'

const Load = () => {
    const { id } = useParams();
    const theme = useTheme();
    const [loadVal, setLoadVal] = useState(0);
    const [data, setData] = useState(undefined);

    useEffect(()=>{
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const starCountRef = ref(db, `users/${id}`);
        onValue(starCountRef, (snapshot) => {
          const d = snapshot.val();
          console.log(d);
          setData(d);
        });
    }, [])


    const  handleLoad = ()=>{
        console.log(loadVal);

        if(loadVal === 0 || loadVal === ''){
            alert('Please enter a value greater than 0');
        }else{
            const newBalance = parseFloat(loadVal) + parseFloat(data.balance);
            const database = getDatabase();
            const valueRef = ref(database, `users/${id}/balance`);
            
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

    const updateTopUpData = () =>{
        const database = getDatabase();
        const dataRef = ref(database, `users/${id}/topup`);
        const topUpRef = ref(database, `topups/`);

        const newTopUpRef = push(topUpRef);
        const newDataRef = push(dataRef);

        const newTopUpData = {
            card_id : id,
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
    (data) &&
    <Box>
      <Nav/>
      <Box p='20px' width='100vw' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Typography variant='h2' sx ={{
          textAlign:'center',
          mb : '20px'
        }}> Card Details</Typography>
        <Box>
            <Card variant='outlined' 
            sx={{
                minWidth : '500px',
                 width: '900px', 
                 padding : '10px',
                 display : 'flex',
                 borderRadius : '20px',
                 alignItems : 'center',
            }}  >
                <CardContent sx = {{
                    display : 'flex',
                    flexDirection : 'column',
                    paddingX : '50px',
                    justifyContent : 'start'
                }}>
                    <Box display='flex' sx = {{mb : '10px'}}>
                        <Typography variant='h3' color={theme.palette.secondary.main} mr='10px'> CARD ID : </Typography>
                        <Typography variant='h3' color={theme.palette.primary.main} fontWeight='bold'> {id} </Typography>
                    </Box>
                    <Box display='flex' >
                        <Typography variant='h3' color={theme.palette.secondary.main} mr='10px'> Balance : </Typography>
                        <Typography variant='h3' color={theme.palette.primary.main} fontWeight='bold'> {`₱ ${parseFloat(data.balance).toFixed(2)}`} </Typography>
                    </Box>
                </CardContent>
                <CardContent sx = {{
                    display : 'flex',
                    flexDirection : 'column',
                    paddingX : '50px',
                    justifyContent : 'start',
                }}>
                    <Box display='flex' sx = {{mb : '10px'}}>
                        <Typography variant='h3' color={theme.palette.secondary.main} mr='10px'> CARD NAME : </Typography>
                        <Typography variant='h3' color={theme.palette.primary.main} fontWeight='bold'> {data.name} </Typography>
                    </Box>
                    <Box display='flex' sx = {{mb : '10px', alignItems : 'center', width : '330px'}}>
                        <Button variant='contained' color='primary' flex= {1}
                            onClick={handleLoad}
                        >Load Card</Button>
                        <TextField type='number' variant='outlined' label ='Load Value' name='load' sx={{ ml: '10px'}}
                            value={loadVal}
                            onChange={(e)=>{
                                if(isNaN(e.target.value)){
                                    setLoadVal(0);
                                }
                                else{
                                    setLoadVal(e.target.value);
                                }
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default Load
