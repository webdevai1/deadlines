import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WelcomeScreenState } from "@/types/store/slices/welcome-screen";

const initialState: WelcomeScreenState = {
  isShown: false,
};

export const welcomeScreenSlice = createSlice({
  initialState,
  name: "welcome-screen",
  reducers: {
    setIsShown: (state, action: PayloadAction<boolean>) => {
      state.isShown = action.payload;
    },
  },
});

export const { setIsShown } = welcomeScreenSlice.actions;

export default welcomeScreenSlice.reducer;
