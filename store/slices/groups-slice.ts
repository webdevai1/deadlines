import { UpdateAction } from "@/types/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group, GroupsState } from "@/types/store/slices/groups";

const initialState: GroupsState = {
  favoriteGroups: [],
  groups: [],
};

export const groupsSlice = createSlice({
  initialState,
  name: "groups",
  reducers: {
    addFavoriteGroup: (state, action: PayloadAction<string>) => {
      state.favoriteGroups.push(action.payload);
    },
    createGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload,
      );
    },
    removeFavoriteGroup: (state, action: PayloadAction<string>) => {
      state.favoriteGroups = state.favoriteGroups.filter(
        (groupId) => groupId !== action.payload,
      );
    },
    updateGroup: (state, action: UpdateAction<string, Group>) => {
      state.groups = state.groups.map((group) => {
        if (group.id === action.payload.id) {
          return { ...group, ...action.payload.data };
        }
        return group;
      });
    },
  },
});

export const {
  addFavoriteGroup,
  createGroup,
  deleteGroup,
  removeFavoriteGroup,
  updateGroup,
} = groupsSlice.actions;

export default groupsSlice.reducer;
