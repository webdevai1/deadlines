import { combineReducers } from "@reduxjs/toolkit";

import themeSlice from "../slices/theme-slice";
import groupsSlice from "../slices/groups-slice";
import dialogsSlice from "./../slices/dialogs-slice";
import deadlinesSlice from "../slices/deadlines-slice";
import welcomeScreenSlice from "../slices/welcome-screen-slice";

const rootReducer = combineReducers({
  deadlines: deadlinesSlice,
  dialogs: dialogsSlice,
  groups: groupsSlice,
  theme: themeSlice,
  welcomeScreen: welcomeScreenSlice,
});

export default rootReducer;
