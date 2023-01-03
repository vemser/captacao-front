import { apiSlice } from '../api'
import {
  IPagination,
  Root,
  Inscricao,
  Formulario,
  ITrilha,
  Elemento,
  IEdicao,
  IEmail,
  IAvaliacao
} from './type'

export const getToken = (): string => {
  return localStorage.getItem('token') || ''
}

const avaliacaoSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    listReviews: build.query<Root, IPagination>({
      query: data => ({
        url: 'avaliacao',
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${getToken()}`
        },
        params: {
          pagina: data.pagina,
          sort: 'idAvaliacao',
          tamanho: 10,
          order: 0
        }
      })
    }),
    searchByTrilha: build.mutation<Elemento[] | [], ITrilha>({
      query: data => ({
        url: `avaliacao/list-by-trilha?trilha=${data.trilha}`,
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${getToken()}`
        }
        // params: {

        // }
      })
    }),
    searchByEdition: build.mutation<Elemento[] | [], IEdicao>({
      query: data => ({
        url: `avaliacao/list-by-edicao?edicao=${data.edicao}`,
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${getToken()}`
        }
        // params: {

        // }
      })
    }),
    searchByEmail: build.mutation<Elemento[] | [], IEmail>({
      query: data => ({
        url: `avaliacao/buscar-by-email?email=${data.email}`,
        method: 'GET',
        headers: {
          // Authorization: `Bearer ${getToken()}`
        }
        // params: {

        // }
      })
    }),
    avaliarCandidato: build.mutation<Elemento[] | [], IAvaliacao>({
      query: data => ({
        url: `avaliacao/`,
        method: 'POST',
        body: data,
        responseHandler: response => response.text(),
        headers: {
          // Authorization: `Bearer ${getToken()}`
        }
        // params: {

        // }
      })
    })
  }),

  overrideExisting: false
})

export const {
  useListReviewsQuery,
  useSearchByTrilhaMutation,
  useSearchByEditionMutation,
  useSearchByEmailMutation
} = avaliacaoSlice
