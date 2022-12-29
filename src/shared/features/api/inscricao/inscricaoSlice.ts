import {
	IGetInscritos,
	IInscricao,
	ICandidato,
	IEdicao,
} from "./types";
import { apiSlice } from "..";


interface ITrilha {
	trilha: string
}

export const getToken = (): string => {
	return localStorage.getItem("token") || "";
};

const inscricaoSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getCandidatos: build.query<IInscricao, IGetInscritos>({
			query: data => ({
				url: "inscricao",
				method: "GET",
				params: {pagina: data.pagina, tamanho: 20, sort:"idInscricao", order:0}

				// headers: {Authorization: `Bearer ${getToken()}`},
			}),
		}),
		postCandidato: build.mutation<ICandidato, ICandidato>({
			query: data => ({
				url: "inscricao",
				method: "POST",
				body: data,
				params: {idCandidato: "idCandidato"}
				// headers: { Authorization: `Bearer ${getToken()}`}
			}),
		}),
		getInscricaoByTrilha: build.mutation<IInscricao[] | [], ITrilha>({
			query: data => ({
				url: "inscricao/list-by-trilha",
				method: "GET",
				params: {trilha: data.trilha}
				// headers: { Authorization: `Bearer ${getToken()}`}
			}),
		}),
		getListByEdicao: build.query<IInscricao, IEdicao>({
			query: data => ({
				url: "inscricao/list-by-edicao",
				method: "GET",
				params: {edicao: data.nome}
				// headers: { Authorization: `Bearer ${getToken()}`}
			}),
		}),
		getListById: build.query<IInscricao, ICandidato>({
			query: data => ({
				url: "inscricao/by-id",
				method: "GET",
				params: {id: data.idCandidato}
				// headers: { Authorization: `Bearer ${getToken()}`}
			}),
		}),
		getListByEmail: build.query<IInscricao, ICandidato>({
			query: data => ({
				url: "inscricao/buscar-by-email",
				method: "GET",
				params: {email: data.email}
				// headers: { Authorization: `Bearer ${getToken()}`}
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetCandidatosQuery,
	usePostCandidatoMutation,
	useGetInscricaoByTrilhaMutation,
	useGetListByEdicaoQuery,
	useGetListByIdQuery,
	useGetListByEmailQuery,
} = inscricaoSlice;
