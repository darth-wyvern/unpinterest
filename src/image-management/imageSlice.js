import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const unsplashURL = process.env.REACT_APP_UNSPLASH_URL
const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY

const getRequestHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Client-ID ${unsplashAccessKey}`
})

const initialState = {
  query: 'sea',
  page: {
    number: 1,
    perPage: 30,
    totalPage: 1,
  },
  errorMessage: null,
  data: [],
  loading: false,
};

export const getImages = createAsyncThunk('image/get', async ({ query, page }) => {
  const url = `${unsplashURL}/search/photos?query=${query}&page=${page.number}&per_page=${page.perPage}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getRequestHeaders(),
    mode: 'cors',
  });
  const value = await response.json();
  return value;
});

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    querySearch: (state, action) => {
      state.query = action.payload
    },
    nextPage: (state) => {
      if (state.page.number < state.page.totalPage) {
        state.page.number += 1
      }
    },
    prevPage: (state) => {
      if (state.page.number > 1) {
        state.page.number -= 1
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getImages.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.results;
      state.page.totalPage = action.payload.total_pages;
    })
      .addCase(getImages.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'internal server error'
        state.loading = false;
      })
  }
});

export const { prevPage, nextPage, querySearch } = imageSlice.actions;

export default imageSlice.reducer;
