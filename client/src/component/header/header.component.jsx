import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import useAppContext from '../../hooks/useAppcontext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const {token, loggedInUserRole,setToken} = useAppContext();
  const navigate = useNavigate();

  const onButtonClick = (event) =>   navigate(event.target.name|| '/')
  const onLogoutButtonClicked = () => setToken(null)
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, margin: 1, cursor: 'pointer' }} onClick={onButtonClick} >
          Product Management
          </Typography>
           {loggedInUserRole ==="ADMIN" && <Button name ='create-user' color="inherit" onClick={onButtonClick}>Create user</Button> }
           {token && <Button name= 'create-product' color="inherit" onClick={onButtonClick}>Create Product</Button> }
           {token && <Button  color="inherit"onClick={onLogoutButtonClicked}>Logout</Button> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
