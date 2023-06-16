import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./app/pages/bookSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});
