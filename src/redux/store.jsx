import { configureStore } from "@reduxjs/toolkit";
import movieReduces from "./features/movieSlice";

export const store = configureStore({
  reducer: {
    movie: movieReduces,
  },
});
