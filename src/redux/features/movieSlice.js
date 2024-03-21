import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieServices from "../services/movieServices";

export const getMovies = createAsyncThunk(
  "movie/getMoviesList",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await movieServices.getMovieList(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  movies: {
    loading: false,
    list: [],
    error: null,
  },
  wishlist: [],
  favorites: [],
  isOnline: navigator.onLine,
  sorting: "",
  language: "",
  genres: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: builder => {
    builder.addCase(getMovies.pending, state => {
      state.movies.loading = true;
    }),
      builder.addCase(getMovies.fulfilled, (state, action) => {
        const updatedList = [...state.movies.list, ...action.payload];
        state.movies.list = updatedList;
        localStorage.setItem("movies", JSON.stringify(updatedList));
        state.movies.loading = false;
      });
    builder.addCase(getMovies.rejected, (state, action) => {
      (state.movies.loading = false), (state.movies.error = action.payload);
    });
  },
  reducers: {
    checkOnlineMode: (state, action) => {
      state.isOnline = action.payload;
    },
    selectFavorites: (state, action) => {
      const movies = JSON.parse(localStorage.getItem("movies"));
      if (state.favorites?.some(item => item.id === action.payload)) {
        const filterFavorites = state.favorites.filter(
          item => item.id !== action.payload
        );
        state.favorites = filterFavorites;
        localStorage.setItem("favorites", JSON.stringify(filterFavorites));
      } else {
        console.log({ movies }, action.payload);
        const selectedFavorites = movies.filter(
          item => item.id === action.payload
        );
        const finalValue = [...state.favorites, selectedFavorites[0]];
        localStorage.setItem("favorites", JSON.stringify(finalValue));
        state.favorites = finalValue;
      }
    },
    selectWishlist: (state, action) => {
      const moviesList = JSON.parse(localStorage.getItem("movies"));

      if (moviesList) {
        if (state.wishlist?.some(item => item.id === action.payload)) {
          const filterWishlist = state.wishlist.filter(
            item => item.id !== action.payload
          );
          state.wishlist = filterWishlist;
          localStorage.setItem("wishlist", JSON.stringify(filterWishlist));
        } else {
          const selectedWishlist = moviesList?.filter(
             item => item.id === action.payload
          );
          const finalValue = [...state.wishlist, selectedWishlist[0]] 
          localStorage.setItem("wishlist", JSON.stringify(finalValue));
          state.wishlist = finalValue;
        }
      }
     
    },
    setLocalWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    setLocalFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setSortingValue: (state, action) => {
      state.sorting = action.payload;
      state.movies.list = [];
    },
    setLanguageValue: (state, action) => {
      state.language = action.payload;
      state.movies.list = [];
    },
    setGenresValue: (state, action) => {
      state.genres = action.payload;
      state.movies.list = [];
    },
  },
});

export const {
  checkOnlineMode,
  selectFavorites,
  selectWishlist,
  setSortingValue,
  setLanguageValue,
  setGenresValue,
  setLocalWishlist,
  setLocalFavorites,
} = movieSlice.actions;
export default movieSlice.reducer;
