import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInAPI, register } from "./authFakeAPI";
import StorageAPI from "../common/StorageAPI";

const initialState = {
  loading: false,
  token: "",
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
      console.log(action.payload)
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(signinAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinAction.rejected, (state) => {
        state.loading = false;
      })
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

export const { signout, setToken } = authSlice.actions;

export default authSlice.reducer;
