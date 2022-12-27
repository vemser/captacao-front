import { ILoggedUser, IUser } from 'shared/interfaces'
import { apiSlice } from '../'

export const getToken = (): string => {
  return localStorage.getItem('token') || ''
}

const authSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    authLogin: build.mutation<string, IUser>({
      query: user => ({
        url: 'http://vemser-dbc.dbccompany.com.br:39000/vemser/usuario-back/usuario/login',
        method: 'POST',
        body: user,
        responseHandler: response => response.text()
      })
    }),
    getLoggedUser: build.query<ILoggedUser, void>({
      query: () => ({
        url: 'http://vemser-dbc.dbccompany.com.br:39000/vemser/usuario-back/usuario/logged-user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    }),
    changeImage: build.mutation<string, any>({
      query: data => ({
        url: 'http://vemser-dbc.dbccompany.com.br:39000/vemser/usuario-back/foto/upload-image-perfil',
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    })
  }),
  overrideExisting: false
})

export const {
  useAuthLoginMutation,
  useGetLoggedUserQuery,
  useChangeImageMutation
} = authSlice
