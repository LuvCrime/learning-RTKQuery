import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../../models/models";

export const jsonplaceholderApi = createApi({
  reducerPath: "jsonplaceholder/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getPosts: build.query<IPost[], void>({
      query: () => "posts",
    }),
    getPost: build.query<IPost, string>({
      query: (id: string) => ({
        url: `posts/${id}/`,
      }),
    }),
    setPost: build.mutation({
      query: (patch) => ({
        url: "posts",
        method: "POST",
        body: patch,
      }),
    }),
    deletePost: build.mutation<{ id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
    }),
    editPost: build.mutation({
      query: (patch) => ({
        url: `posts/${patch.postId}`,
        method: "PATCH",
        body: patch.inputs,
      }),
    }),
    filterPosts: build.query({
      query: (id: number) => ({
        url: `posts?userId=${id}/`,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useSetPostMutation,
  useLazyGetPostQuery,
  useEditPostMutation,
  useDeletePostMutation,
  useFilterPostsQuery,
} = jsonplaceholderApi;
