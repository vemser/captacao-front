import { apiSlice } from '../api'
import { IPagination, Root } from './type'

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
    })
  }),
  overrideExisting: false
})

export const { useListReviewsQuery } = avaliacaoSlice
