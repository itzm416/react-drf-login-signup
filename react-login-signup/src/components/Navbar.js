import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService'

const Navbar = () => {

  const { access_token } = getToken()

  return (
    <>

    <Box sx={{flexGrow:1}}>
      <AppBar position='static' color='secondary'>
        <Toolbar>

          <Typography variant='h5' component='div' sx={{flexGrow:1}}>
          project
          </Typography>

          <Button component={NavLink} sx={{color:'white', textTransform:'none'}} to='/'>Home</Button>
          <Button component={NavLink} sx={{color:'white', textTransform:'none'}} to='/contact'>Contact</Button>
          
          { access_token ? <Button component={NavLink} sx={{color:'white', textTransform:'none'}} to='/dashboard'>Dashboard</Button> : <Button component={NavLink} sx={{color:'white', textTransform:'none'}} to='/login-reg'>Login/Registration</Button> }

        </Toolbar>
      </AppBar>
    </Box>

    </>
  )
}

export default Navbar