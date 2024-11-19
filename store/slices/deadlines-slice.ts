import { UpdateAction } from "@/types/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deadline, DeadlinesState } from "@/types/store/slices/deadlines";

const initialState: DeadlinesState = {
  deadlines: [],
};

export const deadlinesSlice = createSlice({
  initialState,
  name: "deadlines",
  reducers: {
    createDeadline: (state, action: PayloadAction<Deadline>) => {
      state.deadlines.push(action.payload);
    },
    deleteDeadline: (state, action: PayloadAction<string>) => {
      state.deadlines = state.deadlines.filter(
        (deadline) => deadline.id !== action.payload,
      );
    },
    updateDeadline: (state, action: UpdateAction<string, Deadline>) => {
      state.deadlines = state.deadlines.map((deadline) => {
        if (deadline.id === action.payload.id) {
          return { ...deadline, ...action.payload.data };
        }
        return deadline;
      });
    },
  },
});

export const { createDeadline, deleteDeadline, updateDeadline } =
  deadlinesSlice.actions;

export default deadlinesSlice.reducer;
