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

export const addNewAgent = createAsyncThunk(
  "post/newAgent",
  async (newAgent, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://backend-mp-2.vercel.app/api/salesAgents",
        newAgent
      );

      if (!response) {
        console.error("Cannot get response");
      }
      console.log("addNewAgent reponse:- ", response.data.newSalesAgent);
      return response.data.newSalesAgent;
    } catch (error) {
      console.error("error in adding new agent", error);
      return rejectWithValue(error.response?.data || "An error occurred");
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
    //  Add new agent
    builder.addCase(addNewAgent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewAgent.fulfilled, (state, action) => {
      state.status = "success";
      console.log("addNewAgent action.payload", action.payload);
      state.salesAgents = [...state.salesAgents, action.payload];
    });
    builder.addCase(addNewAgent.rejected, (state, action) => {
      state.status = "Error";
      state.error = action.error.message;
    });
  },
});

export default salesAgentsSlice.reducer;
