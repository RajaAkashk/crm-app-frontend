import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSalesAgents = createAsyncThunk(
  "get/salesAgents",
  async () => {
    try {
      const response = await axios.get(
        "https://backend-mp-2.vercel.app/api/salesAgents"
      );
      if (!response) {
        console.log("Failed to get response");
      }
      console.log("response.data from sales agents", response.data.allAgents);
      return response.data.allAgents;
    } catch (error) {
      console.error("Error in getting sales agents", error);
    }
  }
);

export const salesAgentsSlice = createSlice({
  name: "salesAgent",
  initialState: {
    salesAgents: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSalesAgents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSalesAgents.fulfilled, (state, action) => {
      state.status = "success";
      console.log("action.payload ", action.payload);
      state.salesAgents = action.payload;
    });
    builder.addCase(fetchSalesAgents.rejected, (state) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default salesAgentsSlice.reducer;
