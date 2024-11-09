import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites_movies';

// Thunk to load favorites from AsyncStorage
export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk to save favorites to AsyncStorage
export const saveFavorites = createAsyncThunk(
  'favorites/saveFavorites',
  async (favorites, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return favorites;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteMovies: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleFavorite(state, action) {
        const movie = action.payload;
        const index = state.favoriteMovies.findIndex((fav) => fav.trackId === movie.trackId);
      
        if (index >= 0) {
          // Remove from favorites if it exists
          state.favoriteMovies.splice(index, 1);
        } else {
          // Add to favorites if it doesn't exist
          state.favoriteMovies.push(movie);
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favoriteMovies = action.payload;
        state.loading = false;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveFavorites.fulfilled, (state, action) => {
        state.favoriteMovies = action.payload;
      });
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;