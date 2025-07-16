// src/store/slices/menuItemSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  base_price: number;
  image_url: string;
  category_id: string;
  is_available: boolean;
  is_new?: boolean;
}

interface MenuItemState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuItemState = {
  items: [],
  loading: false,
  error: null,
};

const menuItemSlice = createSlice({
  name: "menuItems",
  initialState,
  reducers: {
    fetchMenuItemsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMenuItemsSuccess(state, action: PayloadAction<MenuItem[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchMenuItemsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMenuItemsStart,
  fetchMenuItemsSuccess,
  fetchMenuItemsFailure,
} = menuItemSlice.actions;

export default menuItemSlice.reducer;