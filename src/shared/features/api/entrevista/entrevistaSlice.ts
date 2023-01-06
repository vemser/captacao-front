// import {  } from "./types";
import { getToken } from "shared/utils/getToken";
import { apiSlice } from "../";
import {
  EntrevistaObsParams,
  EntrevistaUpdateParams,
  NovaEntrevistaBody,
  EntrervistaResponse,
  EntrevistasParams,
  EntrevistasMesParams,
} from "./types";

const entervistaSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateObservacao: builder.mutation<void, EntrevistaObsParams>({
      query: (data) => ({
        url: `entrevista/atualizar-observacao-entrevista/${data.idEntrevista}`,
        method: "PUT",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        params: {
          observacao: data.observacao,
        },
      }),
    }),
    updateEntrevista: builder.mutation<void, EntrevistaUpdateParams>({
      query: (data) => ({
        url: `entrevista/atualizar-entrevista/${data.idEntrevista}`,
        method: "PUT",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        params: {
          observacao: data.legenda,
        },
        body: {
          dataEntrevista: data.body,
        },
      }),
    }),
    postNewEntrevista: builder.mutation<void, NovaEntrevistaBody>({
      query: (data) => ({
        url: `entrevista/marcar-entrevista`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: data,
      }),
    }),
    getEntrevistas: builder.query<EntrervistaResponse, EntrevistasParams>({
      query: (data) => ({
        url: "entrevista",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          pagina: data.pagina, // data.pagina,
          tamanho: data.tamanho, // data.tamanho,
        },
      }),
    }),
    
    getEntrevistaPorMes: builder.query<
      EntrervistaResponse,
      EntrevistasMesParams
    >({
      query: (data) => ({
        url: "entrevista/listar-por-mes",
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        params: {
          pagina: 0, // data.pagina,
          tamanho: 10, // data.tamanho,
          mes: data.mes,
          ano: data.ano,
        },
      }),
    }),
    getEntrevistaByEmail: builder.query<EntrervistaResponse, string>({
      query: (data) => ({
        url: `/entrevista/buscar-entrevista-email-candidato/${data}`,
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      }),
    }),
    // getEntrevistaFiltro: builder.query<EntrervistaResponse, string>({
    //   query: (data) => ({
    //     url: `/entrevista/buscar-entrevista-email-candidato/${data}`,
    //     method: "GET",
    //     headers: {
    //       // Authorization: `Bearer ${token}`,
    //     },
    //   }),
    // }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateObservacaoMutation,
  useUpdateEntrevistaMutation,
  usePostNewEntrevistaMutation,
  useGetEntrevistasQuery,
  useGetEntrevistaPorMesQuery,
  useGetEntrevistaByEmailQuery,
  // useGetEntrevistaFiltroMutation,
} = entervistaSlice;
