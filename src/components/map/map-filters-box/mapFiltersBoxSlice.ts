import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

export interface MapFiltersBoxState {
  viewportArea: {
    north: number|null;
    east: number|null;
    south: number|null;
    west: number|null;
  };
}

const initialState: MapFiltersBoxState = {
  viewportArea: {
    north: null,
    east: null,
    south: null,
    west: null,
  },
};

export const mapFiltersBoxSlice = createSlice({
  name: "mapFilteBox",
  initialState,
  reducers: {
    viewportAreaAction: (
      state,
      action: PayloadAction<{
        north: number;
        east: number;
        south: number;
        west: number;
      }>
    ) => {
      state.viewportArea.north = action.payload.north;
      state.viewportArea.east = action.payload.east;
      state.viewportArea.south = action.payload.south;
      state.viewportArea.west = action.payload.west;
    },
  },
});

export const { viewportAreaAction } = mapFiltersBoxSlice.actions;

export const mapFiltersBox = (state: RootState) => state.mapFiltersBoxState;

export default mapFiltersBoxSlice.reducer;
