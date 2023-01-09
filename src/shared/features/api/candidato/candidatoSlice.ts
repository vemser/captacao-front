import { getToken } from "shared/utils/getToken";
import { apiSlice } from "../";
import {
  CandidatoBody,
  CandidatoByNota,
  CandidatoByNotaBody,
  CandidatoResponse,
  Elemento,
  UpdateNota,
} from "./types";

interface IFiltros {
  email?: string;
  trilha?: string;
  edicao?: string;
}

const candidatoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postCandidato: builder.mutation<CandidatoResponse, CandidatoBody>({
      query: (data) => ({
        url: "candidato",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: data,
      }),
    }),
    updateNota: builder.mutation<void, UpdateNota>({
      query: (data) => ({
        url: `candidato/nota-prova/${data.idCandidato}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: data.nota,
      }),
    }),
    getCandidatosByNota: builder.mutation<CandidatoByNota, CandidatoByNotaBody>({
      query: (data) => ({
        url: "candidato/find-by-nota",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          pagina: data.pagina,
          tamanho: data.tamanho,
        },
      }),
    }),
    getCandidatosByEmail: builder.mutation<Elemento, string>({
      query: (data) => ({
        url: "candidato/findbyemails",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          email: data,
        },
      }),
    }),
    getCandidatosFiltro: builder.mutation<CandidatoByNota, IFiltros>({
      query: (data) => ({
        url: `candidato/filtro-candidato?pagina=0&tamanho=20`,
        method: "GET",
        headers: { Authorization: `Bearer ${getToken()}`},
        params: {
          email: data.email,
          edicao: data.edicao,
          trilha: data.trilha,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  usePostCandidatoMutation,
  useUpdateNotaMutation,
  useGetCandidatosByNotaMutation,
  useGetCandidatosByEmailMutation,
  useGetCandidatosFiltroMutation
} = candidatoSlice;
