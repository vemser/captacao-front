import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/vemser/captacao-back/`
  }),
  endpoints: () => ({}),
});

export const apiReducer = apiSlice.reducer;
