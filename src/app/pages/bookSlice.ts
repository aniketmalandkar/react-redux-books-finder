import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "process";

interface Book {
  id: number;
  book_author: string[];
  book_title: string;
  book_publication_year: number;
  book_publication_country: string;
  book_publication_city: string;
  book_pages: number;
}

export interface CounterState {
  books: Book[];
  count: number;
  page: number;
  filter: string;
  loading: boolean;
  error: string;
}

const initialState: CounterState = {
  books: [],
  count: 0,
  page: 0,
  filter: "",
  loading: false,
  error: "",
};

export const fetchBooks = createAsyncThunk("book/fetchBooks", async () => {
  return await axios
    .post("http://nyx.vima.ekt.gr:3000/api/books", {
      page: 1,
      itemsPerPage: 20,
      filters: [],
    })
    .then((res) => res.data);
});

export const counterSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.error = action.error.message || "";
    });
  },
});

export default counterSlice.reducer;
