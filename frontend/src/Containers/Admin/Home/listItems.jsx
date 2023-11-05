import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/admin/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, link: '/admin/users' },
    { text: 'Reports', icon: <BarChartIcon />, link: '/admin/reports' },
  ];

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} component={Link} to={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
