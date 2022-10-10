import { Box, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <>
    <Box display="flex" justifyContent="center" sx={{padding:2, mx:1, mb:15, mt:20}} >
      <Typography variant='h5' component="div" sx={{fontWeight:'bold'}} >--Welcome to login/signup--</Typography>
    </Box>
    </>
  )
}

export default Home
