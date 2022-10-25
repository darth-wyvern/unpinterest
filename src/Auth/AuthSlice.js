import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn } from './authFakeAPI';

const initialState = {
};

export const signinAction = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await signIn(email, password);
  return response;
});

export const signupAction = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await signIn(email, password);
  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  }
});

export default authSlice.reducer;
