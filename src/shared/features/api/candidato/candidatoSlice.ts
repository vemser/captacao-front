import { getToken } from 'shared/utils/getToken'
import { apiSlice } from '../'
import {
  CandidatoBody,
  CandidatoByNota,
  CandidatoByNotaBody,
  CandidatoResponse,
  Elemento,
  UpdateNota,
  UpdateNotaParecerComportamental,
  UpdateNotaParecerTecnico
} from './types'

interface IFiltros {
  email?: string
  trilha?: string
  edicao?: string
  pagina: number
  tamanho: number
}

const candidatoSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    postCandidato: builder.mutation<CandidatoResponse, CandidatoBody>({
      query: data => ({
        url: 'candidato',
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${getToken()}`
        },
        body: data
      })
    }),
    updateNota: builder.mutation<void, UpdateNota>({
      query: data => ({
        url: `candidato/nota-prova/${data.idCandidato}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: data.nota
      })
    }),
    getCandidatosByNota: builder.mutation<CandidatoByNota, CandidatoByNotaBody>(
      {
        query: data => ({
          url: 'candidato/find-by-nota',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getToken()}`
          },
          params: {
            pagina: data.pagina,
            tamanho: data.tamanho
          }
        })
      }
    ),
    getCandidatosByEmail: builder.mutation<Elemento, string>({
      query: data => ({
        url: 'candidato/findbyemails',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          email: data
        }
      })
    }),
    updateNotaParecerTecnico: builder.mutation<void, UpdateNotaParecerTecnico>({
      query: data => ({
        url: `candidato/nota-parecer-tecnico/${data.idCandidato}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          idCandidato: data.idCandidato
        }
      })
    }),
    updateNotaParecerComportamental: builder.mutation<
      void,
      UpdateNotaParecerComportamental
    >({
      query: data => ({
        url: `candidato/nota-comportamental/${data.idCandidato}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        params: {
          idCandidato: data.idCandidato
        }
      })
    }),
    getCandidatosEntrevista: builder.mutation<CandidatoByNota, IFiltros>({
      query: data => ({
        url: `candidato/filtro-candidato-entrevista?pagina=${data.pagina}&tamanho=${data.tamanho}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${getToken()}` },
        params: {
          email: data.email,
          edicao: data.edicao,
          trilha: data.trilha
        }
      })
    }),
    getCandidatosResultado: builder.mutation<CandidatoByNota, IFiltros>({
      query: data => ({
        url: `/candidato/filtro-candidato-resultado?pagina=0&tamanho=20`,
        method: 'GET',
        headers: { Authorization: `Bearer ${getToken()}` },
        params: {
          email: data.email,
          edicao: data.edicao,
          trilha: data.trilha
        }
      })
    }),
    getExportCsvCandidatos: builder.mutation<any, void>({
      query: data => ({
        url: `entrevista/export-xlsx`,
        method: 'GET',
        responseType: 'blob',
        responseHandler: response =>
          response.blob().then(blob => URL.createObjectURL(blob)),
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: data
      })
    })
  }),
  overrideExisting: false
})

export const {
  usePostCandidatoMutation,
  useUpdateNotaMutation,
  useUpdateNotaParecerTecnicoMutation,
  useUpdateNotaParecerComportamentalMutation,
  useGetCandidatosByNotaMutation,
  useGetCandidatosByEmailMutation,
  useGetCandidatosEntrevistaMutation,
  useGetCandidatosResultadoMutation,
  useGetExportCsvCandidatosMutation
} = candidatoSlice
