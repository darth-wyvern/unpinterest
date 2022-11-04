import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const unsplashURL = process.env.REACT_APP_UNSPLASH_URL;
const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

const getRequestHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Client-ID ${unsplashAccessKey}`,
});

const initialState = {
  query: "cat",
  page: 1,
  totalPage: undefined,
  errorMessage: undefined,
  data: [],
  loading: false,
  imageChoosing: undefined,
};

export const getImages = createAsyncThunk(
  "image/get",
  async ({ query, page }) => {
    const url = `${unsplashURL}/search/photos?query=${query}&page=${page}&per_page=30`;
    const response = await fetch(url, {
      method: "GET",
      headers: getRequestHeaders(),
      mode: "cors",
    });
    const value = await response.json();
    return value;
  }
);

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageChoosing: (state, action) => {
      state.imageChoosing = action.payload
    },
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.totalPage = action.payload.total_pages;
      })
      .addCase(getImages.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.errorMessage = action.error.message || "internal server error";
        state.loading = false;
      });
  },
});

export const { setQuery, setPage, setImageChoosing } = imageSlice.actions;

export default imageSlice.reducer;
