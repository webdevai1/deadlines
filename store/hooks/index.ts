import { AppDispatch, RootState } from "@/types/store";
import {
  useDispatch as useNotTypedDispatch,
  useSelector as useNotTypedSelector,
} from "react-redux";

export const useDispatch = useNotTypedDispatch.withTypes<AppDispatch>();
export const useSelector = useNotTypedSelector.withTypes<RootState>();
