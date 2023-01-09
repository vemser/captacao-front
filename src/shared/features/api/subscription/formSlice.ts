import {
  IFormResponse,
  IFormSubscribeFormResponse,
  IFormSubscribeTextResponse
} from 'shared/interfaces'
import { apiSlice } from '../'

const token = '1031609a66722e535e436d70d478ce'
const formSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInputs: builder.query<IFormResponse, void>({
      query: () => ({
        url: 'https://graphql.datocms.com/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          query: `
          query MyQuery {
            formulario {
              email
              nome
              estado
              cpf
              rg
              dataNascimento
              cidade
              telefone
              neurodiversidade
            }
          }
        `
        })
      })
    }),
    getSubscribeForm: builder.query<IFormSubscribeFormResponse, void>({
      query: () => ({
        url: 'https://graphql.datocms.com/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          query: `
          query MyQuery {
            formulario {
              s2Matriculado
              s2Turno
              s2Instituicao
              s2Curso
              s2InglS
              s2Espanhol
              s2OriSexual
              s2GNero
              s2Trilha
              s2DeficiNcia
              s2DefDesc
              s2TextoMotivacao
              s2SubtTextmotivacao
              s2OutroMotivo
              s2AlgoImp
              s2TextoLingProva
              s2TextoDisp
              s2DispHaula
              s2Github
              s2Linkedin
              s2Curriculo
              s2ConfiguraEsDaMQuina
            }
          }
        `
        })
      })
    }),
    getSubscribeText: builder.query<IFormSubscribeTextResponse, void>({
      query: () => ({
        url: 'https://graphql.datocms.com/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          query: `
          query MyQuery {
            formulario {
              titulo
              content
              backgroundImage {
                url
              }
            }
          }
        `
        })
      })
    })
  }),
  overrideExisting: false
})

export const {
  useGetInputsQuery,
  useGetSubscribeTextQuery,
  useGetSubscribeFormQuery
} = formSlice
