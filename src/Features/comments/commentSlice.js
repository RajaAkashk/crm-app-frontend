import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
  "get/comments",
  async (leadId) => {
    console.log("fetchComments leadId", leadId);
    try {
      const response = await axios.get(
        `https://backend-mp-2.vercel.app/api/comments/leads/${leadId}/comments`
      );
      console.log("fetchComments response.data", response.data);
      return response.data.comments;
    } catch (error) {
      console.error("error in fetching comments", error);
      return error;
    }
  }
);

export const addNewComment = createAsyncThunk(
  "post/newComment",
  async ({ newComment, leadId }) => {
    try {
      const response = await axios.post(
        `https://backend-mp-2.vercel.app/api/comments/leads/${leadId}/comments`,
        newComment
      );

      console.log("addNewComment response.data", response.data);
      return response.data;
    } catch (error) {
      console.log("Error in adding new comment", error);
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
      console.log("fetchComments:-", action.payload);
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    // add New Comment
    builder.addCase(addNewComment.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.status = "success";
      state.comments = [...state.comments, action.payload];
    });
    builder.addCase(addNewComment.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default commentSlice.reducer;
