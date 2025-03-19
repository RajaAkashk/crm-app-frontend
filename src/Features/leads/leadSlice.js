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
    console.log("response.data.leads:-", response.data.leads);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response?.data?.message || "Failed to fetch projects";
  }
});

// fetch lead by id
export const fetchLeadById = createAsyncThunk("get/lead", async (leadId) => {
  try {
    const response = await axios.get(
      `https://backend-mp-2.vercel.app/api/leads/${leadId}`
    );

    if (!response.data) {
      console.log("failed to get response from fetch Lead By Id");
    }
    console.log("response.data.lead", response.data.lead);
    return response.data.lead;
  } catch (error) {
    console.error(error);
    return error.response?.data?.message || "Failed to fetch projects";
  }
});

export const updateLead = createAsyncThunk(
  "put/lead",
  async ({ leadId, updatedData }) => {
    try {
      const response = await axios.put(
        `https://backend-mp-2.vercel.app/api/leads/${leadId}`,
        updatedData
      );
      return response.data.updatedLead;
    } catch (error) {
      console.error(error);
      return error.response?.data?.message || "Failed to update lead";
    }
  }
);

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
    // fetchLeadById
    builder.addCase(fetchLeadById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLeadById.fulfilled, (state, action) => {
      state.status = "success";
      state.leads = action.payload;
    });
    builder.addCase(fetchLeadById.rejected, (state) => {
      state.status = "error";
      state.error = action.errro.message;
    });
    // Update Lead
    builder.addCase(updateLead.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.status = "success";
      state.leads = state.leads.map((lead) =>
        lead._id === action.payload._id ? action.payload : lead
      );
    });
    builder.addCase(updateLead.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default leadSlice.reducer;
