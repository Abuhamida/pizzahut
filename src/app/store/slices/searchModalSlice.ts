import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSearch: false,
};

export const searchModalSlice = createSlice({
  name: "searchModal",
  initialState,
  reducers: {
    setOpenSearch: (state, action) => {
      state.openSearch = action.payload;
    },
  },
});

export const { setOpenSearch } = searchModalSlice.actions;
export default searchModalSlice.reducer;
