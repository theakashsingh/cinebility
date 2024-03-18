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
      console.log(movies.some(item => item.id === action.payload));
      if (state.favorites.some(item => item.id === action.payload)) {
        state.favorites = state.favorites.filter(
          item => item.id !== action.payload
        );
      } else {
        console.log({ movies }, action.payload);
        const selectedFavorites = movies.filter(
          item => item.id === action.payload
        );
        state.favorites = [...state.favorites, selectedFavorites[0]];
      }
    },
    selectWishlist: (state, action) => {
      const movies = JSON.parse(localStorage.getItem("movies"));

      if (state.wishlist.some(item => item.id === action.payload)) {
        state.wishlist = state.wishlist.filter(
          item => item.id !== action.payload
        );
      } else {
        const selectedWishlist = movies.filter(
          item => item.id === action.payload
        );
        state.wishlist = [...state.wishlist, selectedWishlist[0]];
      }
    },
  },
});

export const { checkOnlineMode, selectFavorites, selectWishlist } =
  movieSlice.actions;
export default movieSlice.reducer;
