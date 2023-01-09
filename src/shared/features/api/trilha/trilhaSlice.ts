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
          // Authorization: `Bearer ${getToken()}`,
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRhbmllbC5qYWNvbiIsImp0aSI6Ijk4IiwiY2FyZ29zIjpbIlJPTEVfSU5TVFJVVE9SIiwiUk9MRV9HRVNUQU9fREVfUEVTU09BUyIsIlJPTEVfQURNSU4iLCJST0xFX0FMVU5PIl0sImlhdCI6MTY3Mjg3ODA2OSwiZXhwIjoxNjc1NDcwMDY5fQ.LuuvwlX674eBlAgvKY3S4-ZzpCiKp-RPjB9K7vJRPFU`,
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
