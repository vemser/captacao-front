import { getToken } from "shared/utils/getToken";
import { apiSlice } from "../";
import { Trilha, Trilhas } from "./types";

const trilhaSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrilhas: builder.query<Trilhas[], void>({
      query: () => ({
        url: "trilha/listar",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    postNewTrilha: builder.mutation<Trilhas, Trilha>({
      query: (data) => ({
        url: "trilha",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: data,
      }),
    }),
    deleteTrilha: builder.mutation<void, number>({
      query: (id) => ({
        url: `trilha/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTrilhasQuery,
  usePostNewTrilhaMutation,
  useDeleteTrilhaMutation,
} = trilhaSlice;
