import { apiSlice } from "../api";
import {
  IPagination,
  IAvaliacao,
  IListaAvaliacao,
} from "./type";
import { getToken } from "shared/utils/getToken";

interface IFiltros {
  email?: string;
  trilha?: string;
  edicao?: string;
}
const avaliacaoSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    listReviews: build.mutation<IListaAvaliacao, IPagination>({
      query: (data) => ({
        url: "avaliacao",
        method: "GET",
        providesTags: ["Avaliacao"],
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          pagina: data.pagina,
          sort: "idAvaliacao",
          tamanho: 10,
          order: 0,
        },
        invalidatesTags: ["Avaliacao"],
      }),
    }),
    avaliarCandidato: build.mutation<void, IAvaliacao>({
      query: (data) => ({
        url: "avaliacao",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        // params: {

        // }
      }),
    }),
    getAvaliacaoFiltro: build.mutation<IListaAvaliacao, IFiltros>({
      query: (data) => ({
     
        url: `avaliacao/filtro-avaliacao?pagina=0&tamanho=20`,
        method: "GET",
        headers: { Authorization: `Bearer ${getToken()}`},
        params: {
          email: data.email,
          edicao: data.edicao,
          trilha: data.trilha,
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useListReviewsMutation,
  useAvaliarCandidatoMutation,
  useGetAvaliacaoFiltroMutation,
} = avaliacaoSlice;
