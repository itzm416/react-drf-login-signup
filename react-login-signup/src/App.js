import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Contact from './pages/Contact'
import LoginReg from './pages/authpage/LoginReg'
import SendResetEmail from './pages/authpage/SendResetEmail'
import ResetPassword from './pages/authpage/ResetPassword'
import Dashboard from './pages/authpage/Dashboard'
import { useSelector } from 'react-redux'
import EmailVerified from './components/authcomponent/EmailVerified'

const App = () => {

  const { access_token } = useSelector(state => state.auth)

  return (
    <>

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login-reg' element={ !access_token ? <LoginReg /> : <Navigate to='/dashboard' />} />
          <Route path='send-reset-email' element={<SendResetEmail />} />
          <Route path='api/user/reset/:id/:token' element={<ResetPassword />} />
          <Route path='dashboard' element={ access_token ? <Dashboard /> : <Navigate to='/login-reg' />} />
          <Route path='verify-user-email/:uid/:token' element={<EmailVerified />} />
        </Route>
        <Route path='*' element={<h1>Error 404</h1>} />
        
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
