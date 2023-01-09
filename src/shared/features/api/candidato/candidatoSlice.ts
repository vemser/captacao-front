import { getToken } from 'shared/utils/getToken'
import { apiSlice } from '../'
import { CandidatoBody, CandidatoResponse, UpdateNota, UpdateNotaParecerComportamental, UpdateNotaParecerTecnico } from './types'

const candidatoSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    postCandidato: builder.mutation<CandidatoResponse, CandidatoBody>({
      query: data => ({
        url: 'candidato',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`
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
    updateNotaParecerTecnico: builder.mutation<void, UpdateNotaParecerTecnico>({
      query: (data) => ({
        url: `candidato/nota-parecer-tecnico/${data.idCandidato}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          idCandidato: data.idCandidato
        }
      }),
    }),
    updateNotaParecerComportamental: builder.mutation<void, UpdateNotaParecerComportamental>({
      query: (data) => ({
        url: `candidato/nota-comportamental/${data.idCandidato}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          idCandidato: data.idCandidato
        }
      }),
    }),
  }),
  overrideExisting: false
})

export const { usePostCandidatoMutation, useUpdateNotaMutation, useUpdateNotaParecerTecnicoMutation, useUpdateNotaParecerComportamentalMutation  } =
  candidatoSlice
