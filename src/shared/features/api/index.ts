import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://vemser-dbc.dbccompany.com.br:39000/vemser/dbc-pessoa-api/",
  }),
  endpoints: () => ({}),
});

export const apiReducer = apiSlice.reducer;
