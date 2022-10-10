import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginuserMutation } from '../../services/loginsignupapi'
import { getToken, storeToken } from '../../services/LocalStorageService'
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../features/userslice';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const Login = () => {

  const [error, setError] = useState({})
  const [successmsg, setSuccessmsg] = useState('')

  const [userdata, setUserdata] = useState({
    email : '',
    password : ''
  })

  const [loginuser, {isError, isLoading, isSuccess}] = useLoginuserMutation()

  const dispatch = useDispatch()

  // -----------------------------------------------------------

  const handlechangedata = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name] : e.target.value
    })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const actualData = {
      email : data.get('email'),
      password : data.get('password')
    }

    const res = await loginuser(actualData)

    if(res.error){
      setError(res.error.data.errors)
    }
    
    if(res.data){
      setError({})
      setSuccessmsg(res.data.msg)

      setUserdata({
        email : '',
        password : ''
      })

      setTimeout( () => {

      // storing token acess and refresh in the local storage
      storeToken(res.data.token)

      // set state in slice
      let { access_token } = getToken()
      dispatch( setUserToken({access_token : access_token}) )

      }, 3000 )

    }

  }

  // ---------------------------------------

  let { access_token } = getToken()      
  useEffect( () => {
      dispatch( setUserToken({access_token : access_token}) )
  }, [access_token, dispatch] )

  return (
    <>

<Grid container justifyContent="center">
  <Grid item xs={12} sm={7} md={5} lg={4}>

    <Box component='form' onSubmit={handlesubmit} noValidate sx={{mt:4}} id='login-form'>
      
      <TextField onChange={handlechangedata} value={userdata.email} required fullWidth margin='normal' id='email' type='email' name='email' label='Email' />
      { error.email ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.email[0]} </Typography> : ''}
      
      <TextField onChange={handlechangedata} value={userdata.password} required fullWidth margin='normal' id='password' name='password' type='password' label='Password' />
      { error.password ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.password[0]} </Typography> : ''}

      { isLoading ? <LoadingButton type='submit' endIcon={<SaveIcon  />} sx={{mt:3, px:4, mb:4}} loading loadingPosition="end" variant="contained">
        Login
      </LoadingButton> : <Box textAlign='center'>
        <Button type='submit' sx={{mt:3, px:5, mb:4}} variant='contained'>Login</Button>
      </Box>
      }

      <Box textAlign='left'>
        <NavLink to='/send-reset-email'>Forgot Password ?</NavLink>
      </Box>

      { error.non_field_errors ? <Alert severity="error" sx={{mt:3}}>{error.non_field_errors}</Alert> : ''}
      { successmsg ? <Alert severity="success" sx={{mt:3}}>{successmsg}</Alert> : ''}

    </Box>

  </Grid>
</Grid>

    </>
  )
}

export default Login