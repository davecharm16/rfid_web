import { Box, Button, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'
import Nav from '../components/Nav'
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../utils/utils';
import { getDatabase, ref, onValue} from "firebase/database";
import moment from 'moment/moment';

const Admin = () => {

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const [data, setData]  = useState([]);
  const db = getDatabase(app);

  const columns = [
    { field: 'UID', headerName: 'CARD ID', width: 90 },
    {
      field: 'balance',
      headerName: 'Load Balance',
      width: 150,
      valueGetter : (params) => `₱ ${parseFloat(params.row.balance).toFixed(2)}`
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'plateNumber',
      headerName: 'Plate Number',
      width: 110,
    },
    {
      field: 'entryDateTime',
      headerName: 'Entry Date Time',
      width: 200,
      valueGetter: (params) =>
        (params.row.entryDateTime != "") ? moment(params.row.entryDateTime).format("MMMM DD YYYY, h:mm:ss a") : '',
    },
    {
      field: 'exitDateTime',
      headerName: 'Exit Date Time',
      sortable: false,
      width: 200,
      valueGetter: (params) =>{
        if(params.row.exitDateTime == ''){
          return ""
        }
        else{
          return moment(params.row.exitDateTime).format("MMMM DD YYYY, h:mm:ss a")
        }
      },
    },
    {
      field : 'load',
      flex : 1,
      headerName : 'Load ID',
      renderCell: (params)=>{
        return (
          <Button color='primary' variant='contained'
          sx = {{
            paddingX : '20px'
          }}
          > Load Card </Button>
        )
      }
    },
  ];

  useEffect(() => {

    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      const d = snapshot.val();
      console.log(d);
      let d_array = []
      for (const key in d) {
        d_array.push(d[key]);
      }
      setData(d_array);
    });
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  const getRowId = (row) => row.UID; 

  return (
    <Box>
      <Nav/>
      <Box p='20px' width='100vw'>
        <Typography variant='h2' sx ={{
          textAlign:'center',
          mb : '20px'
        }}> LIST OF CARDS</Typography>
        <Box maxWidth='1100px' width='80vw' mx='auto'>

          <DataGrid columns={columns} rows = {data} getRowId={getRowId}
           initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Admin
