import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchLeads = createAsyncThunk("get/leads", async () => {
//   try {
//     const response = await axios.get(
//       "https://backend-mp-2.vercel.app/api/leads"
//     );
//     if (!response) {
//       console.log("Failed to get response");
//     }
//     console.log("response.data.leads:-", response.data.leads);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return error.response?.data?.message || "Failed to fetch projects";
//   }
// });

export const fetchLeads = createAsyncThunk(
  "get/leads",
  async ({ salesAgent = "", status = "" }) => {
    try {
      let url = "https://backend-mp-2.vercel.app/api/leads";
      const queryParams = [];
      if (salesAgent) queryParams.push(`salesAgent=${salesAgent}`);
      if (status) queryParams.push(`status=${status}`);
      if (queryParams.length) url += `?${queryParams.join("&")}`;

      const response = await axios.get(url);
      console.log("Fetched Leads response.data:", response.data.leads);
      return response.data.leads;
    } catch (error) {
      console.error(error);
      return error.response?.data?.message || "Failed to fetch projects";
    }
  }
);

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
  async ({ id, formData }, { rejectWithValue }) => {
    console.log("Updating Lead with ID:", id);
    try {
      const response = await axios.put(
        `https://backend-mp-2.vercel.app/api/leads/${id}`,
        formData
      );
      console.log("Updated Lead:", response.data.updatedLead);
      return response.data.updatedLead;
    } catch (error) {
      console.error("Update Lead Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update lead"
      );
    }
  }
);

// delete lead by id
export const deleteLead = createAsyncThunk("delete/lead", async (leadId) => {
  try {
    const response = await axios.delete(
      `https://backend-mp-2.vercel.app/api/leads/${leadId}`
    );

    if (!response.data) {
      console.log("Failed to delete lead");
    }
    console.log("Lead deleted successfully", response.data.deletedLead);
    return response.data.deletedLead;
  } catch (error) {
    console.error(error);
    return error.response?.data?.message || "Failed to delete lead";
  }
});

export const addNewLead = createAsyncThunk("post/newLead", async (newLead) => {
  try {
    const response = await axios.post(
      "https://backend-mp-2.vercel.app/api/leads",
      newLead
    );
    console.log("addNewLead :-", response.data.savedLead);
    return response.data.savedLead;
  } catch (error) {
    return error.response?.data?.message || "Failed to Add lead";
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
      console.log("fetchLeads action.payload", action.payload);
      state.leads = action.payload;
    });
    builder.addCase(fetchLeads.rejected, (state) => {
      state.status = "error";
      state.error = action.error.message;
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
      state.error = action.error.message;
    });
    // Update Lead
    builder.addCase(updateLead.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.status = "success";
      console.log("updateLead action.payload", action.payload);
      if (state.leads.length > 0) {
        state.leads = state.leads.map((lead) =>
          lead._id === action.payload._id ? action.payload : lead
        );
      }
    });
    builder.addCase(updateLead.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    // delete Lead
    builder.addCase(deleteLead.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteLead.fulfilled, (state, action) => {
      state.status = "success";
      console.log("deleteLead action.payload", action.payload);
      console.log("deleteLead state.leads", state.leads);
      if (state.leads.length > 0) {
        state.leads = state.leads.filter(
          (lead) => lead._id !== action.payload._id
        );
      }
    });
    builder.addCase(deleteLead.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    // add New Lead
    builder.addCase(addNewLead.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewLead.fulfilled, (state, action) => {
      state.status = "success";
      console.log("addNewLead action.payload: ", action.payload);
      state.leads = Array.isArray(state.leads)
        ? [...state.leads, action.payload]
        : [action.payload];
    });
    builder.addCase(addNewLead.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default leadSlice.reducer;
