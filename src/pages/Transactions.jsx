import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { firebaseConfig } from '../utils/utils'
import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, ref } from 'firebase/database'
import moment from 'moment'

const Transactions = () => {
  const [loadData, setLoadData] = useState(null);

  useEffect(()=>{
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

    const dataRef = ref(db, '/topups');

    onValue(dataRef, (snapshot)=>{
      const data = snapshot.val();
      console.log(data);
      let temp = [];
      for (const i in data) {
        temp.push(data[i]);
      }
      setLoadData(temp);
    })

  },[])


  const col = [
    {
      field : 'card_id',
      headerName : 'Card UID',
      flex : 1,
    },
    {
      field : 'date',
      headerName : 'Date',
      flex : 1,
      valueGetter : (params) => moment(params.row.date).format("MMMM DD YYYY hh:mm:ss a")
    },
    {
      field : 'load_value',
      headerName : 'Load Amount',
      flex : 1,
    },
    {
      field : 'method',
      headerName : 'Payment Method',
      flex : 1,
    },
  ]

  const getRowId = (row) => row.card_id + row.date; 

  return (
    <Box>
      <Nav/>
      <Box display='flex' alignItems='center' flexDirection='column' p='40px'>
        <Typography variant='h2' fontWeight='bold' color='primary'>All Load Transactions</Typography>
        {
          (loadData === null) ? 
            <CircularProgress/> 
            :
            <Box m='20px' width='100%' maxWidth='800px'>
            <DataGrid rows={loadData} columns={col} getRowId={getRowId}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10},
                },
              }}
              slots={
               {
                toolbar : GridToolbar
               }
              }
            />
            </Box> 
        }
      </Box>
    </Box>
  )
}

export default Transactions
