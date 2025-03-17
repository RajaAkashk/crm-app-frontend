import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTags = createAsyncThunk("get/tags", async () => {
  try {
    const response = await axios.get(
      "https://backend-mp-2.vercel.app/api/tags"
    );

    if (!response.data) {
      console.log("Not getting response.");
      return "No response from tags api";
    }
    console.log("response data form fetch tags", response.data.allTags);
    return response.data.allTags;
  } catch (error) {
    console.error("Error in getting tags", error);
    return "Error in fetching tags";
  }
});

export const tagSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTags.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.status = "success";
      console.log("fetchTags action.payload", action.payload);
      state.tags = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default tagSlice.reducer;
