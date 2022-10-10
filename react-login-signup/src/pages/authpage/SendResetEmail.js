import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useSendpasswordresetemailMutation } from '../../services/loginsignupapi'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const SendResetEmail = () => {

  const [error, setError] = useState({})
  const [successmsg, setSuccessmsg] = useState('')

  const [userdata, setUserdata] = useState({
    email : ''
  })

  // -----------------------------------------------

  const [sendemail, { isLoading }] = useSendpasswordresetemailMutation()
  const navigate = useNavigate()
  
  const handlechangeN = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name] : e.target.value
    })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const actualData = {
      email : data.get('email')
    }

    const res = await sendemail(actualData)
    console.log(res.error)
    if(res.error){
      setSuccessmsg('')
      setError(res.error.data.errors)
    } 
    if(res.data){
      setError({})
      setSuccessmsg(res.data.msg)
    }

  }

  return (
    <>

<Grid container justifyContent="center">
  <Grid item xs={12} sm={7} md={5} lg={4}>

    <Box component='form' onSubmit={handlesubmit} noValidate sx={{mt:19, mx:3}} id='login-form'>
      <TextField onChange={handlechangeN} value={userdata.email} required fullWidth margin='normal' id='email' type='email' name='email' label='Email' />
      { error.email ? <Typography textAlign='left' style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}> {error.email[0]} </Typography> : ''}

      <Box textAlign='center'>

      { isLoading ? <LoadingButton type='submit' endIcon={<SaveIcon  />} sx={{mt:3, px:4, mb:4}} loading loadingPosition="end" variant="contained">
        Send
      </LoadingButton> : <Box textAlign='center'>
        <Button type='submit' sx={{mt:3, px:5, mb:4}} variant='contained'>Send</Button>
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

export default SendResetEmail
