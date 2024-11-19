import { DIALOGS } from "@/types/enums/dialogs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DialogState<T = any> = {
  data: T;
  open: boolean;
};

type DialogsSliceState = {
  [key: string]: DialogState;
};

const initialState: DialogsSliceState = {
  confirmAction: {
    data: {
      onCancel: () => {},
      onConfirm: () => {},
    },
    open: false,
  },
  deadlineDetails: {
    data: null,
    open: false,
  },
  groupDetails: {
    data: null,
    open: false,
  },
};

const dialogsSlice = createSlice({
  initialState,
  name: "dialogs",
  reducers: {
    closeAllDialogs: (state: DialogsSliceState) => {
      for (const dialog in state) {
        state[dialog].open = false;
      }
    },

    closeDialog: (state: DialogsSliceState, action: PayloadAction<DIALOGS>) => {
      const dialogName = action.payload;
      if (state[dialogName]) {
        state[dialogName].open = false;
        state[dialogName].data = undefined;
      }
    },

    openDialog: <T>(
      state: DialogsSliceState,
      action: PayloadAction<{ data?: T; dialogName: DIALOGS }>,
    ) => {
      const { data = null, dialogName } = action.payload;
      if (state[dialogName]) {
        state[dialogName].open = true;
        state[dialogName].data = data;
      }
    },
    setDialogOpen: (
      state: DialogsSliceState,
      action: PayloadAction<{
        clearData?: boolean;
        dialogName: DIALOGS;
        open: boolean;
      }>,
    ) => {
      const { clearData = true, dialogName, open } = action.payload;
      if (state[dialogName]) {
        state[dialogName].open = open;
        if (!open && clearData) {
          state[dialogName].data = null;
        }
      }
    },
  },
});

export const { closeAllDialogs, closeDialog, openDialog, setDialogOpen } =
  dialogsSlice.actions;

export default dialogsSlice.reducer;
