import { apiSlice } from "../";

export interface Edicao {
  nome: string;
}

const edicaoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEdicaoAtual: builder.query<string, void>({
      query: () => ({
        url: "edicao/edicao-atual",
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
