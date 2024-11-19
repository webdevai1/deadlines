import store from "@/store";
import rootReducer from "@/store/reducers";
import { PayloadAction } from "@reduxjs/toolkit";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export type UpdateAction<ID_TYPE, DATA_TYPE> = PayloadAction<{
  data: Partial<DATA_TYPE>;
  id: ID_TYPE;
}>;
