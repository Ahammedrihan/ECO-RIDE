


import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline  } from '@mui/material';
import { Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';
import UserList from './UserList';

const SideBar = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(false);
  };
  const openToggleBar  = ()=>{
    setOpen(true);
  }

  const list = (
    <List>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Mail" />
      </ListItem>
      
    </List>
    
  );

  return (
    
    <div>
        
      <CssBaseline />
      { open ? 
      <Drawer variant="permanent" anchor="left" open={open}>
        {list}
        <button onClick={toggleDrawer}>
            hello
        </button>
      </Drawer> : <div>
        <button onClick={openToggleBar}>click 3....</button>
      </div>
      }
      

    </div>
   
  );
};

export default SideBar;
