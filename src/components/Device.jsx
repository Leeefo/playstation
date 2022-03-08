import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useDispatch, useSelector } from 'react-redux';
import {
  reset
} from './../features/time/timeSlice';

import NewTime from './NewTime';

const Device = ({ deviceNumber }) => {



  const dispatch = useDispatch()

  const startTime = useSelector((state) => state.time[deviceNumber].startTime);
  const endTime = useSelector((state) => state.time[deviceNumber].endTime);
  const isStarted = useSelector((state) => state.time[deviceNumber].isStarted);
  const time = useSelector((state) => state.time[deviceNumber].time);
  const cost = useSelector((state) => state.time[deviceNumber].cost);
  const intervalId = useSelector((state) => state.time[deviceNumber].intervalId);









  const handleEnd = () => {
    dispatch(reset(deviceNumber))
    clearInterval(intervalId)


  }

  return (
    <>


      <Accordion>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Device {deviceNumber + 1} {isStarted && "Runnig 🎮"} </Typography>

        </AccordionSummary>

        <AccordionDetails>



          <NewTime deviceNumber={deviceNumber} />


          <Button variant="contained"
            onClick={handleEnd}
            style={isStarted ? { display: "block" } : { display: "none" }}
          >
            End
          </Button>
          <Typography>
            {startTime ? new Date(startTime).toLocaleString().slice(10, -3) : 0}
          </Typography>
          <Typography>
            {endTime ? new Date(endTime).toLocaleString().slice(10, -3) : 0}
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