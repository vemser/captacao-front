import { apiSlice } from "../";
import { CandidatoBody, CandidatoResponse, UpdateNota } from "./types";

const candidatoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postCandidato: builder.mutation<CandidatoResponse, CandidatoBody>({
      query: (data) => ({
        url: "candidato",
        method: "POST",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
    updateNota: builder.mutation<void, UpdateNota>({
      query: (data) => ({
        url: `candidato/NotaProva/${data.idCandidato}`,
        method: "PUT",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        body: data.nota,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { usePostCandidatoMutation, useUpdateNotaMutation } = candidatoSlice;
