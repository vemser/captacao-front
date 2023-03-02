import { getToken } from "shared/utils/getToken";
import { apiSlice } from "../";

export interface RelatorioQuantidadePessoasInscritasPorPCDDTO {
  pcd: string;
  quantidade: number;
}

export interface RelatorioQuantidadePessoasInscritasEdicaoDTO {
  edicao: string;
  quantidade: number;
}

export interface RelatorioQuantidadePessoasInscritasEstadoDTO {
  estado: string;
  quantidade: number;
}

export interface RelatorioQuantidadePessoasInscritasGeneroDTO {
  genero: string;
  quantidade: number;
}
export interface RelatorioQuantidadePessoasInscritasNeurodiversidadeDTO {
  neurodiversidade: string;
  quantidade: number;
}
const relatoriosSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    recuperarQuantidadeDePessoasInscritasPorPCD: builder.mutation<RelatorioQuantidadePessoasInscritasPorPCDDTO[], void>({
      query: () => ({
        url: "relatorios/quantidade-de-pessoas-inscritas-por-pcd",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    recuperarQuantidadeDePessoasInscritasPorEdicao: builder.mutation<RelatorioQuantidadePessoasInscritasEdicaoDTO[], void>({
      query: () => ({
        url: "relatorios/quantidade-de-pessoas-inscritas-por-edicao",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    recuperarQuantidadeDePessoasInscritasPorEstado: builder.mutation<RelatorioQuantidadePessoasInscritasEstadoDTO[], void>({
      query: () => ({
        url: "relatorios/quantidade-de-pessoas-inscritas-por-estado",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    recuperarQuantidadeDePessoasInscritasPorGenero: builder.mutation<RelatorioQuantidadePessoasInscritasGeneroDTO[], void>({
      query: () => ({
        url: "relatorios/quantidade-de-pessoas-inscritas-por-genero",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    recuperarQuantidadeDePessoasInscritasPorNeurodiversidade: builder.mutation<RelatorioQuantidadePessoasInscritasNeurodiversidadeDTO[], void>({
      query: () => ({
        url: "relatorios/quantidade-de-pessoas-inscritas-por-neurodiversidade",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRecuperarQuantidadeDePessoasInscritasPorPCDMutation,
  useRecuperarQuantidadeDePessoasInscritasPorEdicaoMutation,
  useRecuperarQuantidadeDePessoasInscritasPorEstadoMutation,
  useRecuperarQuantidadeDePessoasInscritasPorGeneroMutation,
  useRecuperarQuantidadeDePessoasInscritasPorNeurodiversidadeMutation,
} = relatoriosSlice;
