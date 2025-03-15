import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../Features/leads/leadSlice";
import { salesAgentsSlice } from "../Features/salesAgents/salesAgentSlice";

export const store = configureStore({
  reducer: {
    leads: leadSlice.reducer,
    salesAgents: salesAgentsSlice.reducer,
  },
});
