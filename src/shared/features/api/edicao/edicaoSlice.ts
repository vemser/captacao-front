import { apiSlice } from "../";

export interface Edicao {
  nome: string;
}

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
} = edicaoSlice;
