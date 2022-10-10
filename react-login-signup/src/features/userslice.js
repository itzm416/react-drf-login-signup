import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access_token: null,
}

export const userslice = createSlice({
  name: 'access_token',
  initialState,
  reducers: {
    setUserToken:(state, action) => {
        state.access_token = action.payload.access_token
    },
    unSetUserToken:(state, action) => {
        state.access_token = action.payload.access_token
    },
  },
})

export const { setUserToken, unSetUserToken } = userslice.actions

export default userslice.reducer