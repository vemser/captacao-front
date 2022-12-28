import { IElemento, IInscricao} from 'shared/interfaces'
import { apiSlice } from '../'

export const getToken = (): string => {
  return localStorage.getItem('token') || ''
}

const inscricaoSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    getCandidatos: build.query<IElemento[], IInscricao>({
      query: elementos => ({
        url: 'http://vemser-dbc.dbccompany.com.br:39000/vemser/captacao-back/inscricao?pagina=${pagina}&tamanho=${tamanho}&sort=${idInscricao}&order=${order}',
        method: 'GET',
        headers: {
                  Authorization: `Bearer ${getToken()}`
                },
        responseHandler: response => response.text(),
        body: elementos,
      })
    }),
    // getLoggedUser: build.query<ILoggedUser, void>({
    //   query: () => ({
    //     url: 'http://vemser-dbc.dbccompany.com.br:39000/vemser/usuario-back/usuario/logged-user',
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${getToken()}`
    //     }
    //   })
    // }),
    // changeImage: build.mutation<string, void>({
    //   query: () => ({
    //     url: 'http://vemser-dbc.dbccompany.com.br:39000/vemser/usuario-back/foto/upload-image-perfil',
    //     method: 'PUT',
    //     headers: {
    //       Authorization: `Bearer ${getToken()}`
    //     },
    //     responseHandler: response => response.text()
    //   })
    // }),
  }),
  overrideExisting: false
})

export const { useGetCandidatosQuery } = inscricaoSlice
