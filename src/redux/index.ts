import { configureStore } from "@reduxjs/toolkit";
import { jsonplaceholderApi } from "./jsonplaceholder.api/jsonplaceholder.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jsonPlaceholderReducer } from "./jsonplaceholder.api/jsonplaceholder.slice";

export const store = configureStore({
  reducer: {
    [jsonplaceholderApi.reducerPath]: jsonplaceholderApi.reducer,
    jsonplaceholder: jsonPlaceholderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonplaceholderApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
