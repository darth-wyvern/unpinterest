import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInAPI, register } from "./authFakeAPI";
import StorageAPI from "../common/StorageAPI";

const initialState = {
  loading: false,
};

export const signinAction = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await signInAPI({ email, password });
    return response;
  }
);

export const signin = ({ email, password, remember }) =>
  async (dispatch) => {
    const response = await dispatch(signinAction({ email, password }))
    const token = await response.payload;
    if (remember) {
      StorageAPI.local.set("authToken", token)
    } else {
      StorageAPI.session.set("authToken", token)
    }
    return token;
  }

export const signupAction = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await register(email, password);
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(signinAction.fulfilled, (state, action) => {
      //   state.loading = false;
      // })
      // .addCase(signinAction.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(signinAction.rejected, (state, action) => {
      //   state.loading = false;
      // })

      .addCase(signupAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
