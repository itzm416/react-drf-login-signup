import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import { usePasswordresetMutation } from '../../services/loginsignupapi';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const ResetPassword = () => {

  const [error, setError] = useState({})
  const [successmsg, setSuccessmsg] = useState('')

  const [userdata, setUserdata] = useState({
    password : '',
    password2 : ''
  })

  // ------------------------------------------------

  const navigate = useNavigate()
  const [resetpassword, { isLoading }] = usePasswordresetMutation()
  const {id,token} = useParams()

  // ---------------------------------------------------

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
    
    const res = await resetpassword({actualData, id, token})
    
    if(res.error){
      console.log(res.error)
      setSuccessmsg('')
      setError(res.error.data.errors)
    } 
    if(res.data){
      setError({})
      setSuccessmsg(res.data.msg)

      setTimeout( () => {

      navigate('/login-reg')
  
        }, 3000 )

    }

  
  }

  return (
    <>

<Grid container justifyContent="center">
  <Grid item xs={12} sm={7} md={5} lg={4}>

  <Box display="flex" justifyContent="center" sx={{padding:2, mt:8}} >
    <Typography variant='h5' component="div" sx={{fontWeight:'bold'}} >--Password Reset--</Typography>
  </Box>

    <Box component='form' onSubmit={handlesubmit} noValidate sx={{mt:3}} id='login-form'>
      <TextField onChange={handlechangeP} value={userdata.password} required fullWidth margin='normal' id='password' type='password' name='password' label='Password' />
      { error.password ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.password[0]} </Typography> : ''}

      <TextField onChange={handlechangeP} value={userdata.password2} required fullWidth margin='normal' id='password2' type='password' name='password2' label='Password Confirmation' />
      { error.password2 ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.password2[0]} </Typography> : ''}

      <Box textAlign='center'>

      { isLoading ? <LoadingButton type='submit' endIcon={<SaveIcon  />} sx={{mt:3, px:4, mb:4}} loading loadingPosition="end" variant="contained">
      Signup
      </LoadingButton> : <Box textAlign='center'>
        <Button type='submit' sx={{mt:3, px:5, mb:4}} variant='contained'>Signup</Button>
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

export default ResetPassword
