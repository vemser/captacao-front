import {
  FormularioResponse,
  IFormularioBody,
  IFormUpdate,
  UploadFile
} from './types'
import { apiSlice } from '../'
import { getToken } from 'shared/utils/getToken'

const formularioSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    postNewFormulario: builder.mutation<FormularioResponse, IFormularioBody>({
      query: data => ({
        url: 'formulario/cadastro',
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        body: data
      })
    }),
    uploadFile: builder.mutation<void, UploadFile>({
      query: data => ({
        url: `formulario/upload-print-config-pc/${data.idFormulario}`,
        method: 'PUT',
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        body: data.file
      })
    }),
    uploadCurriculo: builder.mutation<void, UploadFile>({
      query: data => ({
        url: `formulario/upload-curriculo/${data.idFormulario}`,
        method: 'PUT',
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        body: data.file
      })
    }),
    getCurriculo: builder.mutation<string, number>({
      query: idFormulario => ({
        url: `formulario/recuperar-curriculo?idFormulario=${idFormulario}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        responseHandler: response => response.text()
      })
    }),
    updateForm: builder.mutation<FormularioResponse, IFormUpdate>({
      query: data => ({
        url: `formulario/atualizar-formulario/${data.idFormulario}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: data.formulario
      })
    })
  }),

  overrideExisting: false
})

export const {
  usePostNewFormularioMutation,
  useUploadCurriculoMutation,
  useUploadFileMutation,
  useGetCurriculoMutation,
  useUpdateFormMutation
} = formularioSlice
