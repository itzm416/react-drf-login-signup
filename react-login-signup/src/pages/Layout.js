import { CssBaseline } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

// outlet means render child of layout

const layout = () => {
  return (
    <>
        <CssBaseline />
        
        <Navbar />

        <Outlet />

    </>
  )
}

export default layout