import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { onSnapshot, query, orderBy } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { playRecordsCollectionRef } from '../services/playRecords.services'
import { useSelector, useDispatch } from 'react-redux';
import { dailyIdSetter } from '../features/time/timeSlice';

const Records = () => {

  const dispatch = useDispatch();
  const [records, setRecords] = useState([])
  const q = query(playRecordsCollectionRef, orderBy('createdAt', 'desc'))

  useEffect(() =>
    onSnapshot(q,
      (snapshot) => {
        setRecords(snapshot.docs.map((doc) => {

          return { id: doc.id, ...doc.data() }
        }))
      })
    , [])



  const rows = records;

  return (


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Daily ID</TableCell>
            <TableCell >Day</TableCell>
            <TableCell >Start Time</TableCell>
            <TableCell >End Time</TableCell>
            <TableCell >Time</TableCell>
            <TableCell >Cost (L.E)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dailyId.split("D")[0]}
              </TableCell>
              <TableCell >{new Date(row.startTime).toLocaleDateString()}</TableCell>
              <TableCell >{new Date(row.startTime).toLocaleString().slice(10)}</TableCell>
              <TableCell >{new Date(row.endTime).toLocaleString().slice(10)}</TableCell>
              <TableCell >{row.time}</TableCell>
              <TableCell >{row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>






    // <div>Records
    //   {records.map(
    //     (record, index) => {
    //       return (<p key={index}>
    //         time: {record.time}
    //       </p>)
    //     }
    //   )}

    // </div>
  )
}

export default Records