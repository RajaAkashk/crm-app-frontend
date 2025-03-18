import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
  "get/comments",
  async (leadId) => {
    try {
      const response = axios.get(
        `https://backend-mp-2.vercel.app/api/comments/leads/${leadId}/comments`
      );
      if (!response.data) {
        console.log("Not getting response from fetch comments");
      }
      console.log("fetchComments response.data", response.data);
      return response.data.comments;
    } catch (error) {
      console.error("error in fetching comments", error);
      return error;
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "success";
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default commentSlice.reducer;
