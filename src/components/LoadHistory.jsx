import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment';

const LoadHistory = ({data}) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(()=>{
    console.log('yoww')
    console.log(data)
    let temp = [];
    for (const i in data) {
      temp.push(data[i])
    }
    setTransactions(temp);
  },[data])

  const getRowId = (row) => row.date; 

  const col = [
    {
      field : 'date',
      headerName : 'Date of Transactions',
      flex : 1,
      valueGetter : (params) => moment(params.row.date).format("MMMM DD YYYY, h:mm:ss a")
    },
    {
      field : 'value',
      headerName : 'Load Amount',
      flex : 1,
      valueGetter : (params) => `₱ ${parseFloat(params.row.value).toFixed(2)}`
    },
  ]
  return (
    data  && 
    
    <Box sx = {{width : '400px', my: '20px'}}>
      <Typography variant='h5' color ='secondary'>Load Transactions</Typography>
        <DataGrid rows={transactions} columns={col} getRowId={getRowId}
        initialState={{
            pagination: {
              paginationModel: { pageSize: 3},
            },
          }}
        />
    </Box>
  )
}

export default LoadHistory
