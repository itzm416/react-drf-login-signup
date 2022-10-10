import { Grid } from '@mui/material'
import React from 'react'

import Box from '@mui/material/Box';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Login from '../../components/authcomponent/Login'
import Signup from '../../components/authcomponent/Signup'

const LoginReg = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>

    <Grid>
      <Grid sx={{textAlign:'center'}}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt:3, mb:3, mx:8 }}>
              <TabList textColor="secondary" indicatorColor="secondary" centered onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Login" value="1" />
                <Tab label="Signup" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Login />
            </TabPanel>

            <TabPanel value="2">
              <Signup />
            </TabPanel>

          </TabContext>
        </Box>
      </Grid>
    </Grid>

    </>
  )
}

export default LoginReg