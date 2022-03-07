import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



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
  handleOpenTimeOut,
  setOpenTimeOut,
  openTimeOut,
  cost, time,
  endTime, startTime
}) => {

  const handleCloseTimeOut = () => setOpenTimeOut(false);

  const handleSave = () => {
    handleCloseTimeOut()
  }

  return (
    <div>
      <Modal
        open={openTimeOut}
        onClose={handleCloseTimeOut}
      >
        <Box sx={style}>


          <Typography variant="h6" component="h2">
            Device Time Out
          </Typography>

          {/* EndTime: {endTime}
            Time: {time}
            Cost: {cost} */}
          <Typography sx={{ mt: 2 }}>
            Start Time: {2 * 6}

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