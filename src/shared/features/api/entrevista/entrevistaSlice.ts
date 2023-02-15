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
  Elemento,
  EntrevistaUpdateBody,
  EntrevistaByEmail
} from './types'


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
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          legenda: data.legenda
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
    getEntrevistas: builder.mutation<Elemento[], void>({
      query: data => ({
        url: 'entrevista',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
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
    getEntrevistaByEmail: builder.query<EntrevistaByEmail, string>({
      query: data => ({
        url: `/entrevista/buscar-entrevista-email-candidato/${data}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    confirmaEntrevista: builder.mutation<void, string>({
      query: data => ({
        url: `entrevista/confirmar-entrevista?tokenEntrevista=${data}`,
        method: 'PUT',

      })
    }),
    deleteEntrevista: builder.mutation<void, string>({
      query: (email) => ({
        url: `entrevista/deletar-entrevista-email-candidato/${email}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
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
  useConfirmaEntrevistaMutation,
  useDeleteEntrevistaMutation,
} = entervistaSlice;
