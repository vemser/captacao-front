import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://vemser-dbc.dbccompany.com.br:39000/vemser/captacao-back-prd/",
  }),
  endpoints: () => ({}),
});

export const apiReducer = apiSlice.reducer;
