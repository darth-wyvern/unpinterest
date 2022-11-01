import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInAPI, register } from "./authFakeAPI";
import StorageAPI from "../common/StorageAPI";

const initialState = {
  loading: false,
  token: "",
  toastSignup: undefined,
  toastSignin: undefined,
};

export const signinAction = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await signInAPI({ email, password });
    return response;
  }
);

export const signin =
  ({ email, password, remember }) =>
    async (dispatch) => {
      const response = await dispatch(signinAction({ email, password }));
      const token = await response.payload;
      if (remember) {
        StorageAPI.local.set("authToken", token);
      } else {
        StorageAPI.session.set("authToken", token);
      }
      return token;
    };

export const signupAction = createAsyncThunk(
  "auth/register",
  async ({ firstname, lastname, email, password }) => {
    const response = await register(firstname, lastname, email, password);
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state) => {
      state.token = "";
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinAction.fulfilled, (state, action) => {
        state.toastSignin = action.payload;
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(signinAction.pending, (state) => {
        state.toastSignin = undefined;
        state.loading = true;
      })
      .addCase(signinAction.rejected, (state, action) => {
        state.toastSignin = action.error;
        state.loading = false;
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        state.toastSignup = action.payload;
        state.loading = false;
      })
      .addCase(signupAction.pending, (state) => {
        state.toastSignup = undefined
        state.loading = true;
      })
      .addCase(signupAction.rejected, (state, action) => {
        state.toastSignup = action.error;
        state.loading = false;
      });
  },
});

export const { signout, setToken, resetSignupState } = authSlice.actions;

export default authSlice.reducer;
