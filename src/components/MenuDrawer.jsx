import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useNavigate } from 'react-router-dom';






const MenuDrawer = ({ drawerState, handleDrawerClose }) => {


  const navigate = useNavigate();


  return (
    <div>
      <Drawer
        anchor='left'
        open={drawerState}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{ width: 220 }}
          role="presentation"
        >


          <List
            sx={{ mt: 5 }}
          >
            <ListItem
              button
              onClick={() => { handleDrawerClose(); navigate('/'); }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>


            <ListItem
              button
              onClick={() => { handleDrawerClose(); navigate('/records') }}
            >
              <ListItemIcon>
                <FormatListNumberedIcon />
              </ListItemIcon>
              <ListItemText primary='Records' />
            </ListItem>

            <ListItem
              button
              onClick={() => { handleDrawerClose(); navigate('/'); }}
            >
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary='Analytics' />
            </ListItem>


          </List>

        </Box>
      </Drawer>
    </div>
  )
}

export default MenuDrawer