import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme, ThemeState } from "@/types/store/slices/theme";

const initialState: ThemeState = {
  theme: "light",
};

export const themeSlice = createSlice({
  initialState,
  name: "theme",
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
