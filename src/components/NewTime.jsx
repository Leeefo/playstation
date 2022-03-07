import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import TimeOut from './TimeOut';

import soundSrc from '../static/deduction.mp3'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup/';
import ToggleButton from '@mui/material/ToggleButton/';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

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

const playSound = (src) => {
  const sound = new Howl({
    src,
    html5: true
  });
  sound.play()
}

const NewTime = ({
  controller, setController,
  startTime, setStartTime,
  endTime, setEndTime,
  setId,
  started, setStarted,
  handleEnd,
  setCost, setTime, convertTime, time, cost

}) => {

  const [open, setOpen] = useState(false);

  const [timeSwitch, setTimeSwitch] = useState(true)
  const [inputHours, setInputHours] = useState('')
  const [inputMinutes, setInputMinutes] = useState('')
  const [openTimeOut, setOpenTimeOut] = useState(false);

  useEffect(() => {
    setTime(convertTime(endTime - startTime))
    setCost(Math.round(((endTime - startTime) / (1000 * 60 * 60)) * controller))


  }, [endTime])



  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInputHours('')
    setInputMinutes('')
    setController(15)
  }
  const handleOpenTimeOut = () => setOpenTimeOut(true);



  const handleController = (e, newController) => {
    setController(newController)
  }

  const handleTimeSwitch = (e) => {
    setTimeSwitch(e.target.checked)
  }

  const handleStart = () => {

    if (!timeSwitch) {
      const timeSetted = (inputHours) * (60 * 60 * 1000) + (inputMinutes) * (60 * 1000);
      setStarted(!started);
      setStartTime(new Date());
      setEndTime(new Date(new Date().getTime()
        + timeSetted
      ));
      setTimeout(() => {
        handleOpenTimeOut()
        playSound(soundSrc)
        handleEnd()
        setStarted(false)
      }, timeSetted)

    } else {
      setStarted(!started)

      setStartTime(new Date());
      setEndTime(new Date());
      setId(
        setInterval(() => {
          setEndTime(new Date())


        }, 3000)
      )
    }


    handleClose()
  }

  const handleInputHours = (e) => {
    setInputHours(e.target.value)
  }
  const handleInputMinutes = (e) => {
    setInputMinutes(e.target.value)
  }


  return (
    <div>

      <TimeOut
        openTimeOut={openTimeOut}
        setOpenTimeOut={setOpenTimeOut}
        handleOpenTimeOut={handleOpenTimeOut}
        startTime={startTime}
        endTime={endTime}
        time={time}
        cost={cost}
      />



      <Button
        style={!started ? { display: "block" } : { display: "none" }}

        variant='contained'
        onClick={handleOpen}>
        New
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>


          <Typography variant="h6" component="h2">
            Start New Time
          </Typography>


          {/* MY CODE */}
          <SportsEsportsIcon
            fontSize='large'
          />
          <ToggleButtonGroup
            value={controller}
            exclusive
            onChange={handleController}
          >
            <ToggleButton value={15}>
              <LooksTwoIcon />
            </ToggleButton>
            <ToggleButton value={20}>
              <Looks3Icon />
            </ToggleButton>
            <ToggleButton value={25}>
              <Looks4Icon />
            </ToggleButton>

          </ToggleButtonGroup>



          <FormGroup>
            <FormControlLabel
              control={

                <Switch
                  checked={timeSwitch}
                  onChange={handleTimeSwitch}
                />
              }
              label="Open"
            />
          </FormGroup>

          <TextField
            required
            disabled={timeSwitch}
            style={{ width: "7ch" }}
            label="HH"
            value={inputHours}
            variant="outlined"
            type="number"
            onChange={handleInputHours}
          />
          <span> : </span>
          <TextField
            disabled={timeSwitch}
            style={{ width: "7ch" }}
            label="MM"
            value={inputMinutes}
            variant="outlined"
            type="number"
            onChange={handleInputMinutes}
          />

          <Button variant="contained"
            onClick={handleStart}
          >
            Start
          </Button>




        </Box>
      </Modal>
    </div>
  )
}

export default NewTime