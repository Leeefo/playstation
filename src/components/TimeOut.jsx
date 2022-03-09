import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../features/time/timeSlice'
import playRecordsServices from '../services/playRecords.services';

import { serverTimestamp } from 'firebase/firestore';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const TimeOut = ({
  openTimeOut,
  setOpenTimeOut,
  deviceNumber,
}) => {

  const dispatch = useDispatch()

  let startTime = useSelector((state) => state.time[deviceNumber].startTime);
  let endTime = useSelector((state) => state.time[deviceNumber].endTime);
  let time = useSelector((state) => state.time[deviceNumber].time);
  let cost = useSelector((state) => state.time[deviceNumber].cost);
  let dailyId = useSelector((state) => state.time[4]);


  const handleSave = async () => {

    const newRecord = {
      dailyId,
      startTime,
      endTime,
      time,
      cost,
      createdAt: serverTimestamp()
    }

    try {
      await playRecordsServices.addRecord(newRecord);
    } catch (error) {
      console.log(error)
    }


    dispatch(reset(deviceNumber))
    handleCloseTimeOut()
  }

  const handleCloseTimeOut = () => setOpenTimeOut(false);


  return (
    <div>
      <Modal
        open={openTimeOut}
        onClose={handleCloseTimeOut}
      >
        <Box sx={style}>


          <Typography variant="h6" component="h2">
            Device {deviceNumber + 1} Time Out
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Start Time: {new Date(startTime).toLocaleString().slice(10)}

          </Typography>
          <Typography sx={{ mt: 2 }}>
            End Time: {new Date(endTime).toLocaleString().slice(10)}

          </Typography>
          <Typography sx={{ mt: 2 }}>
            Time: {time}

          </Typography>
          <Typography sx={{ mt: 2 }}>
            Cost: {cost} L.E

          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>

        </Box>
      </Modal>
    </div>
  )
}

export default TimeOut