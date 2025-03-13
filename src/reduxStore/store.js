import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../Features/leadSlice";

export const store = configureStore({
  reducer: {
    leads: leadSlice.reducer,
  },
});
