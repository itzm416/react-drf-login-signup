import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useVerifyemailMutation } from '../../services/loginsignupapi'

const EmailVerified = () => {

    const [msg, setMsg] = useState('')
    
    const [verifyemail] = useVerifyemailMutation()
    const {uid,token} = useParams()

    useEffect(() => {
        async function fetchData() {
          // You can await here
          const response = await verifyemail({uid, token})
          // ...
          setMsg(response.data.msg)
        }
        fetchData();
      }, []);

  return (
    <>
        <Box display="flex" justifyContent="center" sx={{padding:2, mt:8}} >
            <Typography variant='h4' component="div" sx={{fontWeight:'bold'}} >--{msg}--</Typography>
        </Box>
    </>
  )
}

export default EmailVerified