import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loginStatus: false,
  userdata:{}
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state,action) => {
        state.loginStatus=true;
        state.userdata=action.payload.userdata;
    },
    logout: (state,action) => {
      state.loginStatus=false;
      state.userdata=null
  },

  },
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer