// src/redux/slices/moviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch movies from the API
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (searchTerm = 'star', { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://itunes.apple.com/search`, {
        params: {
          term: searchTerm || 'star',  // default search term
          country: 'au',
          media: 'movie',
        },
      });
      return response.data.results;  // Make sure this returns an array of movies
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    moviesList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMovies(state) {
      state.moviesList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.moviesList = action.payload;  // Store the movie list
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch movies';
      });
  },
});

export const { clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
