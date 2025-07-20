// src/store/slices/activeCategorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveCategoryState {
  id: string | null;
}

const initialState: ActiveCategoryState = {
  id: null,
};

const activeCategorySlice = createSlice({
  name: "activeCategory",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearActiveCategory: (state) => {
      state.id = null;
    },
  },
});

export const { setActiveCategory, clearActiveCategory } =
  activeCategorySlice.actions;

export default activeCategorySlice.reducer;
