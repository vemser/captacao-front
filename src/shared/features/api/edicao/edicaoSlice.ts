import { apiSlice } from "../";

export interface Edicao {
  slice(arg0: number): unknown;
  nome: string;
}
export type Lista = Edicao[]

const edicaoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEdicaoAtual: builder.mutation<string, void>({
      query: () => ({
        url: "edicao/edicao-atual",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        responseHandler: (response) => response.text(),
      }),
    }),
    getListaEdicoes: builder.query<Edicao[], void>({
      query: () => ({
        url: "edicao/listar-todas",
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      }),
    }),
    postNewEdicao: builder.mutation<void, Edicao>({
      query: (data) => ({
        url: "edicao/criar-edicao",
        method: "POST",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
    deleteEdicao: builder.mutation<void, number>({
      query: (id) => ({
        url: `edicao/delete-fisico/${id}`,
        method: "DELETE",
        headers: {
          // Authorization: `Bearer ${token}`,
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
