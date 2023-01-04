import { IGetInscritos, IInscricao, ICandidato, IElementos } from "./types";
import { apiSlice } from "..";
import { getToken } from "shared/utils/getToken";

interface ITrilha {
  trilha: string;
}
interface IEdicao {
  edicao: string;
}
interface IEmail {
  email: string;
}
interface IEdicao {
  edicao: string;
}
interface IEmail {
  email: string;
}

const inscricaoSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCandidatos: build.query<IInscricao, IGetInscritos>({
      query: (data) => ({
        url: "inscricao",
        method: "GET",
        params: {
          pagina: data.pagina,
          tamanho: 20,
          sort: "idInscricao",
          order: 0,
        },
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
    }),
    postInscricao: build.mutation<void, number>({
      query: (data) => ({
        url: "inscricao/cadastro",
        method: "POST",
        params: { idCandidato: data },
      }),
    }),
    getListInscricaoByTrilha: build.mutation<IElementos[] | [], ITrilha>({
      query: (data) => ({
        url: "inscricao/list-by-trilha",
        method: "GET",
        params: { trilha: data.trilha },
        headers: { Authorization: `Bearer ${getToken()}`}
      }),
    }),
    getListInscricaoByEdicao: build.mutation<IElementos[] | [], IEdicao>({
      query: (data) => ({
        url: "inscricao/list-by-edicao",
        method: "GET",
        params: { edicao: data.edicao },
        headers: { Authorization: `Bearer ${getToken()}`}
      }),
    }),
    getInscricaoById: build.mutation<IElementos, number>({
      query: (data) => ({
        url: "inscricao/find-by-idInscricao",
        method: "GET",
        params: { id: data },
        headers: { Authorization: `Bearer ${getToken()}`}
      }),
    }),
    getListInscricaoByEmail: build.mutation<IElementos[] | [], IEmail>({
      query: (data) => ({
        url: "inscricao/buscar-by-email",
        method: "GET",
        params: { email: data.email },
        headers: { Authorization: `Bearer ${getToken()}`}
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCandidatosQuery,
  usePostInscricaoMutation,
  useGetListInscricaoByTrilhaMutation,
  useGetListInscricaoByEdicaoMutation,
  useGetInscricaoByIdMutation,
  useGetListInscricaoByEmailMutation,
} = inscricaoSlice;
