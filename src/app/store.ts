import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import mapFiltersBoxReducer from "../components/map/map-filters-box/mapFiltersBoxSlice";

export const store = configureStore({
  reducer: {
    mapFiltersBoxState: mapFiltersBoxReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
