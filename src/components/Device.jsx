import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import NewTime from './NewTime';

const Device = ({ deviceNumber }) => {

  const [started, setStarted] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [id, setId] = useState(0)
  const [controller, setController] = useState(15)
  const [time, setTime] = useState(0)
  const [cost, setCost] = useState(0)


  const convertTime = (ms) => {

    let first = (ms / (1000 * 60 * 60)).toString().split('.');
    let second = (Number(['0', first[1]].join('.')) * 60).toString().split('.');
    let third = Math.round(Number(['0', second[1]].join('.')) * 60).toString()

    if (third == 60) {
      third = 0;
      second[0] = Number(second[0]) + 1
    }
    if (second[0] == 60) {
      second = 0;
      first[0] = Number(first[0]) + 1

    }
    return (`${first[0]}:${second[0]}:${third}`)
  }








  const handleEnd = () => {
    setStarted(!started);
    clearInterval(id)
    setEndTime(0)
    setStartTime(0)
    setTime(0)
    setCost(0)

  }

  return (
    <>


      <Accordion>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Device {deviceNumber} {started && "Runnig"} </Typography>

        </AccordionSummary>

        <AccordionDetails>



          <NewTime
            controller={controller}
            setController={setController}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            setId={setId}
            setStarted={setStarted}
            started={started}
            handleEnd={handleEnd}
            time={time}
            setTime={setTime}
            convertTime={convertTime}
            setCost={setCost}
            cost={cost}

          />


          <Button variant="contained"
            onClick={handleEnd}
            style={started ? { display: "block" } : { display: "none" }}
          >
            End
          </Button>
          <Typography>
            {startTime ? (startTime.toLocaleString().slice(10, -3)) : 0}
          </Typography>
          <Typography>
            {endTime ? (endTime.toLocaleString().slice(10, -3)) : 0}
          </Typography>
          <Typography>
            {(time) ?
              time : `0:0:0`}
          </Typography>
          <Typography>
            {`${cost} L.E`}
          </Typography>
        </AccordionDetails>

      </Accordion>
    </>
  )
}


export default Device