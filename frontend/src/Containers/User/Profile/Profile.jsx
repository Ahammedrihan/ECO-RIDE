
import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerWidth = 240; // Adjust the width of the sidebar as needed




const darkTheme = createTheme({
    palette: {
      mode: 'dark', // Set the theme mode to dark
      primary: {
        main: '#90caf9', // Adjust the primary color to your preference
      },
      background: {
        default: '#121212', // Set the background color to a dark shade
        paper: '#1e1e1e', // Set the sidebar background color
      },
    },
  });
  

const UserProfileSideBar = () => {
  return (
    <ThemeProvider theme={darkTheme}>
    <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
      
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    
    </Drawer>
    </ThemeProvider>
  );
};




function Profile() {
  return (
    <>
    <div style={{ display: 'flex' }}>
    <UserProfileSideBar/>
    <section className='container'>      
       <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
           <table className="w-full text-sm text-left text-gray-500">
               <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                   <tr>
                       <th scope="col" className="px-6 py-3">
                           Sl.No
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Name
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Email
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Blood Group
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Options
                       </th>
                   </tr>
               </thead>
               <tbody className='border-2'>
                
                    <tr className="bg-white border-b  hover:bg-gray-200 ">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        
                      </th>
                      <td className="px-6 py-4">
                        user.name
                      </td>
                      <td className="px-6 py-4">
                       user.email
                      </td>
                      <td className="px-6 py-4">
                        user.blood
                      </td>
                    
                          <td className="px-6 py-4">
                            <button  className="bg-yellow-100 hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
                              Unblock
                            </button>
                          </td>
                    
                          <td className="px-6 py-4">
                            <button  className="bg-red-100 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                              Block
                            </button>
                          </td>
                       
                    </tr>
               
                  <tr className="bg-white border-b hover:bg-gray-200">
                    <td colSpan={8} className="px-6 py-4 font-medium text-gray-900 text-center">
                      No users Found
                    </td>
                  </tr>
             
              </tbody>
          </table>
      </div>
    </section>
    </div>

    </>
  )
}

export default Profile



