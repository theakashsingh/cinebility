import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: {},
  wishlist: {},
  favorites: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState
});


export default movieSlice.reducer
