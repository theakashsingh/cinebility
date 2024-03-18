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
      checkOnlineMode:(state,action)=>{
          state.isOnline = action.payload
      },
      // selectFavorites:(state,action)=>{
          
      // }
  },
});

export const {checkOnlineMode} = movieSlice.actions
export default movieSlice.reducer;
