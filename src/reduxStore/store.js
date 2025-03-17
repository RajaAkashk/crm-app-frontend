import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../Features/leads/leadSlice";
import { salesAgentsSlice } from "../Features/salesAgents/salesAgentSlice";
import { tagSlice } from "../Features/tags/tagSlice";

export const store = configureStore({
  reducer: {
    leads: leadSlice.reducer,
    tags: tagSlice.reducer,
    salesAgents: salesAgentsSlice.reducer,
  },
});
