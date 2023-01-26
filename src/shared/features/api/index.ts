import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://189.45.56.34:39000/vemser/captacao-back-prd/"
  }),
  endpoints: () => ({}),
});

export const apiReducer = apiSlice.reducer;
