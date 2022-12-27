import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface JsonPlaceholderState {
  posts: Post[];
}

const initialState: JsonPlaceholderState = {
  posts: [],

};

export const jsonPlaceholderSlice = createSlice({
  name: "jsonplaceholder",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload)
    },
  },
});

export const jsonPlaceholderActions = jsonPlaceholderSlice.actions;
export const jsonPlaceholderReducer = jsonPlaceholderSlice.reducer;
