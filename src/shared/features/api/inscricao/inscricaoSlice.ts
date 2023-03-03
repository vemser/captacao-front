import {IElementos, IGetInscritos, IInscricao} from './types'
import {apiSlice} from '..'
import {getToken} from 'shared/utils/getToken'

interface IFiltros {
  email?: string
  trilha?: string
  edicao?: string
  quantidadePaginas?: number
  pagina?: number
  tamanho?: number
  url?: string
}

const inscricaoSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    getCandidatos: build.mutation<IInscricao, IGetInscritos>({
      query: data => ({
        url: 'inscricao',
        method: 'GET',
        params: {
          pagina: data.pagina,
          tamanho: 20,
          sort: 'idInscricao',
          order: 0
        },
        headers: {Authorization: `Bearer ${getToken()}`}
      })
    }),
    postInscricao: build.mutation<void, number>({
      query: data => ({
        url: 'inscricao/cadastro',
        method: 'POST',
        params: {idCandidato: data}
      })
    }),
    getInscricaoById: build.mutation<IElementos, number>({
      query: data => ({
        url: 'inscricao/find-by-idInscricao',
        method: 'GET',
        params: {id: data},
        headers: {Authorization: `Bearer ${getToken()}`}
      })
    }),
    getInscricaoFiltro: build.mutation<IInscricao, IFiltros>({
      query: data => ({
        url: `inscricao/filtro-inscricao?${data.url}`,
        method: 'GET',
        headers: {Authorization: `Bearer ${getToken()}`}
      })
    }),
    deleteInscricao: build.mutation<void, number>({
      query: (id) => ({
        url: `inscricao/${id}`,
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
  useGetCandidatosMutation,
  usePostInscricaoMutation,
  useGetInscricaoByIdMutation,
  useGetInscricaoFiltroMutation,
  useDeleteInscricaoMutation,
} = inscricaoSlice
