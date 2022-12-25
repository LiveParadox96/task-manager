import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./tasks/Task.slice";
import {
  shallowEqual,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;

type TAppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatchBase<TAppDispatch>();

export const useAppSelector = <TSelected = unknown>(
  selector: (state: TRootState) => TSelected
): TSelected => useSelectorBase<TRootState, TSelected>(selector, shallowEqual);
