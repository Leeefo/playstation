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
import { useDispatch, useSelector } from 'react-redux';
import {

  timeIntervalId,
  start,
  end,
  started,
  reset,
  timeSetter,
  costSetter,
} from './../features/time/timeSlice';





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

const NewTime = ({ deviceNumber }) => {

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);

  const [timeSwitch, setTimeSwitch] = useState(true)
  const [inputHours, setInputHours] = useState('')
  const [inputMinutes, setInputMinutes] = useState('')
  const [openTimeOut, setOpenTimeOut] = useState(false);
  const [controller, setController] = useState(15)

  const endTime = useSelector((state) => state.time[deviceNumber].endTime)
  const startTime = useSelector((state) => state.time[deviceNumber].startTime)
  const isStarted = useSelector((state) => state.time[deviceNumber].isStarted);

  useEffect(() => {
    dispatch(timeSetter({
      deviceNumber,
      time: convertTime(endTime - startTime)
    }))
    dispatch(costSetter({
      deviceNumber,
      cost: Math.round(((endTime - startTime) / (1000 * 60 * 60)) * controller)
    }))

  }, [endTime])




  const convertTime = (ms) => {

    let first = (ms / (1000 * 60 * 60)).toString().split('.');
    let second = (Number(['0', first[1]].join('.')) * 60).toString().split('.');
    let third = Math.round(Number(['0', second[1]].join('.')) * 60).toString()

    if (third === 60) {
      third = 0;
      second[0] = Number(second[0]) + 1
    }
    if (second[0] === 60) {
      second = 0;
      first[0] = Number(first[0]) + 1

    }
    return (`${first[0]}:${second[0]}:${third}`)
  }



  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInputHours('')
    setInputMinutes('')
    setController(15)
  }
  const handleOpenTimeOut = () => setOpenTimeOut(true);
  const handleCloseTimeOut = () => setOpenTimeOut(false);



  const handleController = (e, newController) => {
    setController(newController)
  }

  const handleTimeSwitch = (e) => {
    setTimeSwitch(e.target.checked)
  }

  const handleStart = () => {

    if (!timeSwitch) {
      const timeSetted = (inputHours) * (60 * 60 * 1000) + (inputMinutes) * (60 * 1000);
      dispatch(started({
        deviceNumber,
        deviceStarted: true
      }));
      dispatch(start(deviceNumber));
      dispatch(
        end(
          {
            time: (new Date().getTime()) + timeSetted,
            deviceNumber
          }
        ));
      handleClose()
      setTimeout(() => {
        handleOpenTimeOut()
        playSound(soundSrc)
        dispatch(reset(deviceNumber))
      }, timeSetted)

    } else {
      dispatch(started({
        deviceNumber,
        deviceStarted: true
      }))

      dispatch(start(deviceNumber));
      dispatch(end({ deviceNumber }));
      dispatch(
        timeIntervalId({
          deviceNumber,
          intervalId: setInterval(() => { dispatch(end({ deviceNumber })) }, 3000)
        })
      )

      handleClose()
    }
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
        handleOpenTimeOut={handleOpenTimeOut}
        openTimeOut={openTimeOut}
        setOpenTimeOut={setOpenTimeOut}
        handleCloseTimeOut={handleCloseTimeOut}
      />



      <Button
        style={!isStarted ? { display: "block" } : { display: "none" }}

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