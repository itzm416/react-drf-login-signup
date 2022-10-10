// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const loginsignupapi = createApi({
  reducerPath: 'loginsignupapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
  
  endpoints: (builder) => ({
    
    registeruser: builder.mutation({
      query: (user) => {
        return {
            url : 'register/',
            method : 'POST',
            body : user,
            headers : {
                'Content-type' : 'application/json'
            }
        }
      }
    }),


    verifyemail: builder.mutation({
      query: ({uid, token}) => {
        return {
            url: `verify-email/${uid}/${token}/`,
            method : 'POST',
            headers : {
              'Content-type' : 'application/json'
            }
        }
      }
    }),
    

    loginuser: builder.mutation({
      query: (user) => {
        return {
            url : 'login/',
            method : 'POST',
            body : user,
            headers : {
                'Content-type' : 'application/json'
            }
        }
      }
    }),

    getuser: builder.query({
      query: (access_token) => {
        return {
            url : 'profile/',
            method : 'GET',
            headers : {
                'authorization' : `Bearer ${access_token}`
            }
        }
      }
    }),

    changeuserpassword: builder.mutation({
      query: ({ actualData, access_token}) => {
        return {
            url : 'change-password/',
            method : 'POST',
            body : actualData,
            headers : {
                'authorization' : `Bearer ${access_token}`
            }
        }
      }
    }),

    sendpasswordresetemail: builder.mutation({
      query: (actualData) => {
        return {
            url : 'send-reset-password-email/',
            method : 'POST',
            body : actualData,
            headers : {
              'Content-type' : 'application/json'
            }
        }
      }
    }),

    passwordreset: builder.mutation({
      query: ({actualData, id, token}) => {
        return {
            url: `passwordreset/${id}/${token}/`,
            method : 'POST',
            body : actualData,
            headers : {
              'Content-type' : 'application/json'
            }
        }
      }
    }),


  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisteruserMutation, useVerifyemailMutation, useLoginuserMutation, useGetuserQuery, useChangeuserpasswordMutation, useSendpasswordresetemailMutation, usePasswordresetMutation } = loginsignupapi