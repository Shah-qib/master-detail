// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import favoritesReducer from './slices/favoritesSlice';
import viewReducer from './slices/viewSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        favorites: favoritesReducer,
        view: viewReducer,
    },
});

export default store;
