import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  email: ''
}

export const infoslice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo:(state, action) => {
        state.username = action.payload.username
        state.email = action.payload.email
    },
    unSetUserInfo:(state, action) => {
      state.username = action.payload.username
      state.email = action.payload.email
    },
  },
})

export const { setUserInfo, unSetUserInfo } = infoslice.actions

export default infoslice.reducer