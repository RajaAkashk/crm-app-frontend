import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeads = createAsyncThunk("get/leads", async () => {
  try {
    const response = await axios.get(
      "https://backend-mp-2.vercel.app/api/leads"
    );
    if (!response) {
      console.log("Failed to get response");
    }
    console.log("response.data.leads:-",response.data.leads);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response?.data?.message || "Failed to fetch projects";
  }
});

export const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeads.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.status = "success";
      console.log(action.payload.leads);
      state.leads = action.payload;
    });
    builder.addCase(fetchLeads.rejected, (state) => {
      state.status = "error";
      state.error = action.errro.message;
    });
  },
});

export default leadSlice.reducer;
