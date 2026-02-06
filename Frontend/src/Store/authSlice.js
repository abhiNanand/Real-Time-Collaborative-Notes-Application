import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated:false,
  token: null,
  userName: null,
  email:null,
};

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    login:(state,action)=>{
      state.isAuthenticated = true;
      state.token=action.payload.token;
      state.userName = action.payload.userName;
      state.email=action.payload.email;
    },
    logout:(state)=>{
      state.isAuthenticated = false;
      state.userName = null;
      state.token = null;
      state.email = null;
    },
  },
});

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;