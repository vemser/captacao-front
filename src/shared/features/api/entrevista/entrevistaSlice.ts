// import {  } from "./types";
import { getToken } from 'shared/utils/getToken'
import { apiSlice } from '../'
import { CandidatoByNota } from '../candidato/types'
import {
  EntrevistaObsParams,
  EntrevistaUpdateParams,
  NovaEntrevistaBody,
  EntrervistaResponse,
  EntrevistasParams,
  EntrevistasMesParams,
  EntrevistaPorTrilhaParams,
  Elemento
} from './types'

interface IFiltros {
  email?: string
  trilha?: string
  edicao?: string
}

const entervistaSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updateObservacao: builder.mutation<void, EntrevistaObsParams>({
      query: data => ({
        url: `entrevista/atualizar-observacao-entrevista/${data.idEntrevista}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          observacao: data.observacao
        }
      })
    }),
    updateEntrevista: builder.mutation<void, EntrevistaUpdateParams>({
      query: data => ({
        url: `entrevista/atualizar-entrevista/${data.idEntrevista}`,
        method: 'PUT',
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        params: {
          observacao: data.legenda
        },
        body: {
          dataEntrevista: data.body
        }
      })
    }),
    postNewEntrevista: builder.mutation<void, NovaEntrevistaBody>({
      query: data => ({
        url: `entrevista/marcar-entrevista?token=${getToken()}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: data
      })
    }),
    getEntrevistas: builder.mutation<EntrervistaResponse, EntrevistasParams>({
      query: data => ({
        url: 'entrevista',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          pagina: data.pagina, // data.pagina,
          tamanho: data.tamanho // data.tamanho,
        }
      })
    }),

    getEntrevistasPorTrilha: builder.mutation<
      Elemento[],
      EntrevistaPorTrilhaParams
    >({
      query: data => ({
        url: 'entrevista/por-trilha',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          trilha: data.trilha
        }
      })
    }),

    getEntrevistaPorMes: builder.query<
      EntrervistaResponse,
      EntrevistasMesParams
    >({
      query: data => ({
        url: 'entrevista/listar-por-mes',
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        params: {
          pagina: 0, // data.pagina,
          tamanho: 10, // data.tamanho,
          mes: data.mes,
          ano: data.ano
        }
      })
    }),
    getEntrevistaByEmail: builder.query<EntrervistaResponse, string>({
      query: data => ({
        url: `/entrevista/buscar-entrevista-email-candidato/${data}`,
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getExportCsvEntrevista: builder.mutation<any, void>({
      query: (data) => ({
        url: `entrevista/export-xlsx`,
        method: "GET",
        responseType: "blob",
        responseHandler:(response) => response.blob().then(blob => URL.createObjectURL(blob)),
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: data,
      }),
    }),
  }),
  overrideExisting: false
})

export const {
  useUpdateObservacaoMutation,
  useUpdateEntrevistaMutation,
  usePostNewEntrevistaMutation,
  useGetEntrevistasMutation,
  useGetEntrevistaPorMesQuery,
  useGetEntrevistasPorTrilhaMutation,
  useGetEntrevistaByEmailQuery,
  useGetExportCsvEntrevistaMutation
} = entervistaSlice;
