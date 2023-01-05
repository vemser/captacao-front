import { getToken } from "shared/utils/getToken";
import { apiSlice } from "../";

export interface Edicao {
  slice(arg0: number): unknown;
  nome: string;
}
export type Lista = Edicao[];

const edicaoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEdicaoAtual: builder.mutation<string, void>({
      query: () => ({
        url: "edicao/edicao-atual",
        headers: {
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRhbmllbC5qYWNvbiIsImp0aSI6Ijk4IiwiY2FyZ29zIjpbIlJPTEVfSU5TVFJVVE9SIiwiUk9MRV9HRVNUQU9fREVfUEVTU09BUyIsIlJPTEVfQURNSU4iLCJST0xFX0FMVU5PIl0sImlhdCI6MTY3Mjg3ODA2OSwiZXhwIjoxNjc1NDcwMDY5fQ.LuuvwlX674eBlAgvKY3S4-ZzpCiKp-RPjB9K7vJRPFU`,
        },
        responseHandler: (response) => response.text(),
      }),
    }),
    getListaEdicoes: builder.query<Edicao[], void>({
      query: () => ({
        url: "edicao/listar-todas",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    postNewEdicao: builder.mutation<void, Edicao>({
      query: (data) => ({
        url: "edicao/criar-edicao",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: data,
      }),
    }),
    deleteEdicao: builder.mutation<void, number>({
      query: (id) => ({
        url: `edicao/delete-fisico/${id}`,
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
  useGetEdicaoAtualMutation,
  usePostNewEdicaoMutation,
  useDeleteEdicaoMutation,
  useGetListaEdicoesQuery,
} = edicaoSlice;
