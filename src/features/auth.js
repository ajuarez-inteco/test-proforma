import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';

const initialState = {
  user: {},
  islogin: false,
  isVerify: false,
};

export const awsAuth = createAsyncThunk('/auth', async () => {
  try {
    const res = await Auth.currentAuthenticatedUser();
    if (!!res.attributes && Object.keys(res.attributes).length > 0) {
      return res.attributes;
    }
    return {};
  } catch (error) {
    return {};
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setVerify: (state, action) => {
      state.islogin = action.payload;
    },
    setLogin: (state, action) => {
      state.isVerify = action.payload;
    },
    logout: (state) => {
      state.user = {};
      state.islogin = false;
      state.isVerify = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(awsAuth.fulfilled, (state, action) => {
        const user = action.payload;
        state.islogin = Object.keys(user).length > 0;
        state.user = user;
      })
      .addCase(awsAuth.rejected, (state) => {
        state.islogin = false;
        state.user = {};
      });
  },
});
// Action creators are generated for each case reducer function
export const {
  setUser,
  logout,
  setVerify,
  setLogin,
} = authSlice.actions;

export default authSlice.reducer;
