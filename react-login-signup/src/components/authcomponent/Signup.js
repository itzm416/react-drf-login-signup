import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRegisteruserMutation } from '../../services/loginsignupapi'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const Signup = () => {

  const [error, setError] = useState({})
  const [successmsg, setSuccessmsg] = useState('')

  const [userdata, setUserdata] = useState({
    username : '',
    first_name : '',
    last_name : '',
    email : '',
    password : '',
    password2 : ''
  })
  
  const [checked, setChecked] = useState();

  // ----------------------------------------------------
  
  const [registeruser, {isError, isLoading, isSuccess}] = useRegisteruserMutation()

  // -------------------------------------------
  
  const handleChange = (event) => {
    if(event.target.checked){
      setChecked(event.target.checked);
    } else {
      setChecked();
    }
  };

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
      username : data.get('username'),
      first_name : data.get('first_name'),
      last_name : data.get('last_name'),
      email : data.get('email'),
      password : data.get('password'),
      password2 : data.get('password2'),
      tc : checked
    }

    const res = await registeruser(actualData)

    if(res.error){
      setError(res.error.data.errors)
      setSuccessmsg('')
    }
    
    if(res.data){
      setError({})
      setSuccessmsg(res.data.msg)

      setUserdata({
        username : '',
        first_name : '',
        last_name : '',
        email : '',
        password : '',
        password2 : ''
      })

    }

  }

  return (
    <>


<Grid container justifyContent="center">
  <Grid item xs={12} sm={7} md={5} lg={4}>

    <Box component='form' onSubmit={handlesubmit} noValidate sx={{mt:0}} id='signup-form'>
      
      <TextField onChange={handlechangedata} value={userdata.username} required fullWidth margin='normal' id='name' type='text' name='username' label='Username' />
      { error.username ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.username[0]} </Typography> : ''}
      
      <TextField onChange={handlechangedata} value={userdata.first_name} required fullWidth margin='normal' id='name' type='text' name='first_name' label='First Name' />
      { error.first_name ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.first_name[0]} </Typography> : ''}
      
      <TextField onChange={handlechangedata} value={userdata.last_name} required fullWidth margin='normal' id='name' type='text' name='last_name' label='Last Name' />
      { error.last_name ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.last_name[0]} </Typography> : ''}
      
      <TextField onChange={handlechangedata} value={userdata.email} required fullWidth margin='normal' id='email' type='email' name='email' label='Email' />
      { error.email ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.email[0]} </Typography> : ''}
      
      <TextField onChange={handlechangedata} value={userdata.password} required fullWidth margin='normal' id='password1' name='password' type='password' label='Password' />
      { error.password ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.password[0]} </Typography> : ''}
      
      <TextField onChange={handlechangedata} value={userdata.password2} required fullWidth margin='normal' id='password2' name='password2' type='password' label='Password Confirmation' />
      { error.password2 ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.password2[0]} </Typography> : ''}

      <Box textAlign='left' sx={{mt:2}}>
        <FormControlLabel control={<Checkbox />} label="I agree to terms and conditions" labelPlacement="end" checked={checked} onChange={handleChange} />
      </Box>
      { error.tc ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.tc[0]} </Typography> : ''}

      { isLoading ? <LoadingButton type='submit' endIcon={<SaveIcon  />} sx={{mt:3, px:4, mb:4}} loading loadingPosition="end" variant="contained">
      Signup
      </LoadingButton> : <Box textAlign='center'>
        <Button type='submit' sx={{mt:3, px:5, mb:4}} variant='contained'>Signup</Button>
      </Box>
      }

      { error.non_field_errors ? <Alert severity="error" sx={{mt:1}}>{error.non_field_errors}</Alert> : ''}
      { successmsg ? <Alert severity="success" sx={{mt:1}}>{successmsg}</Alert> : ''}

    </Box>

  </Grid>
</Grid>

    </>
  )
}

export default Signup