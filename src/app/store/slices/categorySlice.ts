// src/app/store/slices/categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = categorySlice.actions;
export default categorySlice.reducer;
