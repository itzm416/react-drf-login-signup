import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { loginsignupapi } from '../services/loginsignupapi'

import userslice from '../features/userslice'
import infoslice from '../features/infoslice'


export const store = configureStore({
  reducer: {
    [loginsignupapi.reducerPath]: loginsignupapi.reducer,
    auth : userslice,
    user: infoslice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginsignupapi.middleware),
})

setupListeners(store.dispatch)