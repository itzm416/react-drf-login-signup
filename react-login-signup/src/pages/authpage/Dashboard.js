import LoadingButton from '@mui/lab/LoadingButton'
import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserInfo, unSetUserInfo } from '../../features/infoslice'
import { unSetUserToken } from '../../features/userslice'
import { getToken, removeToken } from '../../services/LocalStorageService'
import { useChangeuserpasswordMutation, useGetuserQuery } from '../../services/loginsignupapi'
import SaveIcon from '@mui/icons-material/Save';

const Dashboard = () => {
    
  const [error, setError] = useState({})
  const [successmsg, setSuccessmsg] = useState('')

  const [userdata, setUserdata] = useState({
    password : '',
    password2 : ''
  })

  // ----------------------------------------------

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [changeuserpassword, {isError, isLoading}] = useChangeuserpasswordMutation()
  
  const { access_token } = getToken()
  const {data, isSuccess} = useGetuserQuery(access_token)

  const users = useSelector(state => state.user)

  // -----------------------------------------

  useEffect(() => {
    if (data && isSuccess) {

      dispatch(setUserInfo({
        email: data.email,
        username: data.username
      }))
    }

  }, [data, isSuccess, dispatch])

  // --------------------------------------
  
  const handlelogout = () => {
    dispatch( unSetUserInfo({
      username : '',
      email : ''
    } ))
    dispatch( unSetUserToken({access_token : null}) )
    removeToken()
    navigate('/login-reg')
  }
  
  const handlechangeP = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name] : e.target.value
    })
  }
  
  const handlesubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const actualData = {
      password : data.get('password'),
      password2 : data.get('password2')
    }
    const res = await changeuserpassword({actualData, access_token})
    if(res.error){
      setSuccessmsg('')
      setError(res.error.data.errors)
    }
    if(res.data){
      setError({})
      setSuccessmsg(res.data.msg)
      setUserdata({
        password : '',
        password2 : ''
      })
    }
    
  }
  
  return (
    <>

<Grid container justifyContent="center">
    

    <Grid item xs={12} sm={5} md={4} lg={3}>

        <Box display="flex" justifyContent="center" sx={{padding:2, mx:1, mb:15}} >
            <Typography variant='h5' component="div" sx={{fontWeight:'bold'}} >--User--</Typography>
        </Box>

        <Box display="flex" justifyContent="center" sx={{padding:2, mx:1}} >
            <Typography variant='h6' component="div" sx={{fontWeight:'bold'}} >Username : {users.username}</Typography>
        </Box>
        
        <Box display="flex" justifyContent="center" sx={{padding:2, mx:1}} >
            <Typography variant='h6' component="div" sx={{fontWeight:'bold'}} >Email : {users.email}</Typography>
        </Box>

        <Box textAlign='center'>
            <Button onClick={handlelogout} sx={{mt:3, px:5, mb:4}} variant='contained'>Logout</Button>
        </Box>

    </Grid>

    <Grid item xs={12} sm={7}>

        <Box display="flex" justifyContent="center" sx={{padding:2}} >
            <Typography variant='h5' component="div" sx={{fontWeight:'bold'}} >--Password Change--</Typography>
        </Box>

        <Box component='form' onSubmit={handlesubmit} noValidate sx={{mt:15}} id='login-form'>
     
      <TextField onChange={handlechangeP} value={userdata.password} required fullWidth margin='normal' id='password' type='password' name='password' label='Password' />
      { error.password ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.password[0]} </Typography> : ''}
     
      <TextField onChange={handlechangeP} value={userdata.password2} required fullWidth margin='normal' id='password2' type='password' name='password2' label='Password Confirmation' />
      { error.password2 ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.password2[0]} </Typography> : ''}

      <Box textAlign='center'>
        
      { isLoading ? <LoadingButton type='submit' endIcon={<SaveIcon  />} sx={{mt:3, px:4, mb:4}} loading loadingPosition="end" variant="contained">
        Change Password
      </LoadingButton> : <Box textAlign='center'>
        <Button type='submit' sx={{mt:3, px:5, mb:4}} variant='contained'>Change Password</Button>
      </Box>
      }

      </Box>

      { error.non_field_errors ? <Alert severity="error" sx={{mt:1}}>{error.non_field_errors}</Alert> : ''}
      { successmsg ? <Alert severity="success" sx={{mt:1}}>{successmsg}</Alert> : ''}

    </Box>


    </Grid>

</Grid>




    </>
  )
}

export default Dashboard