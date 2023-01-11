import {
	FormControl,
	Grid,
	InputLabel,
	Select,
	Stack,
	MenuItem,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Chip,
	Button,
	Pagination,
	Box,
	CircularProgress,
	LinearProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
	useGetCandidatosMutation,
	useGetInscricaoFiltroMutation,
} from "../../shared/features/api/inscricao/inscricaoSlice";
import { IElementos, IInscricao } from "shared/features/api/inscricao/types";
import { useGetTrilhasQuery } from "shared/features/api/trilha/trilhaSlice";
import { useGetListaEdicoesQuery } from "shared/features/api/edicao/edicaoSlice";

const columns = [
	{
		field: "id",
		headerName: "ID",
		width: 60,
	},
	{
		field: "nome",
		headerName: "Nome",
		minWidth: 180,
		flex: 1,
	},
	{
		field: "email",
		headerName: "Email",
		minWidth: 230,
		flex: 1,
	},
	{
		field: "trilha",
		headerName: "Trilhas",
		minWidth: 90,
		maxWidth: 200,
		flex: 1,
	},
	{
		field: "status",
		headerName: "Status",
		width: 140,
		renderCell: (params: any) => {
			return (
				<Chip
					label={params.value === null ? "Não avaliado" : "Avaliado"}
					sx={{ borderRadius: 1, boxShadow: 1, width: "100%" }}
				/>
			);
		},
	},
	{
		field: "acoes",
		headerName: "Ações",
		width: 120,
		renderCell: () => {
			return (
				<Button variant="contained" id="">
					Avaliar
				</Button>
			);
		},
	},
];

export const Registers: React.FC = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const [isLoading, setisLoading] = useState(false);
	const [getCandidatos] = useGetCandidatosMutation();
	
	const [getInscricaoFiltro] = useGetInscricaoFiltroMutation();

	const { data: getTrilha } = useGetTrilhasQuery();
	const { data: getEdicoes } = useGetListaEdicoesQuery();
	const [inscricoes, setInscricoes] = useState<IInscricao | undefined>(
		undefined
	);

	const [email, setEmail] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [edicao, setEdicao] = useState("");
	const [trilha, setTrilha] = useState("");

	console.log(inscricoes);

	useEffect(() => {
		setisLoading(true);
		if (!edicao && !email && !trilha) {
			getCandidatos({ pagina: page })
				.unwrap()
				.then((data) => setInscricoes(data))
				.finally(() => setisLoading(false));
		} else {
			setisLoading(true);
			getInscricaoFiltro({ email, edicao, trilha })
				.unwrap()
				.then((data) => setInscricoes(data))
				.finally(() => setisLoading(false));
		}
	}, [email, edicao, trilha, page]);

	const resetFiltro = () => {
		setEmail("");
		setEmailInput("");
		setEdicao("");
		setTrilha("");
	};

	const rows = () => {
		return inscricoes?.elementos.map((dados) => {
			return {
				id: dados.idInscricao,
				nome: dados.candidato.nome,
				email: dados.candidato.email,
				trilha: dados.candidato.formulario?.trilhas
					.map((trilha) => {
						return trilha.nome;
					})
					.join(", "),
				status: dados.avaliado,
				telefone: dados.candidato.telefone,
				turno: dados.candidato.formulario?.turno,
				estado: dados.candidato.estado,
			};
		});
	};
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Stack
					direction={{
						xs: "column",
						sm: "row",
					}}
					spacing={2}
				>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Pesquisar por Email</InputLabel>
						<OutlinedInput
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										onClick={() => setEmail(emailInput)}
										edge="end"
									>
										<Search color="primary" />
									</IconButton>
								</InputAdornment>
							}
							id="candidatos-search-by-email"
							label="Pesquisar por Email"
							value={emailInput}
							onChange={(e) => {
								setEmailInput(e.target.value);
							}}
						/>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel>Filtrar por trilha</InputLabel>
						<Select
							label="Filtrar por trilha"
							id="candidatos-filter-by-trilha"
							defaultValue=""
							value={trilha}
							onChange={(e) => {
								setTrilha(e.target.value);
							}}
						>
							{getTrilha?.map((trilha) => {
								return (
									<MenuItem
										key={trilha.nome}
										value={trilha.nome}
										id={`filtro-trilha-${trilha.nome}`}
									>
										{trilha.nome}
									</MenuItem>
								);
							})}
							;
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel>Filtrar por edição</InputLabel>
						<Select
							label="Filtrar por edição"
							id="registros-filter-by-edition"
							defaultValue=""
							value={edicao}
							onChange={(e) => {
								setEdicao(e.target.value);
							}}
						>
							{getEdicoes?.map((edicao) => {
								return (
									<MenuItem
										key={edicao.nome}
										value={edicao.nome}
										id={`filtro-edicao-${edicao.nome}`}
									>
										{edicao.nome}
									</MenuItem>
								);
							})}
							;
						</Select>
					</FormControl>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<Button
							fullWidth
							sx={{
								height: "3rem",
							}}
							variant="contained"
							onClick={resetFiltro}
						>
							Limpar
						</Button>
					</Box>
				</Stack>
			</Grid>
			<Grid
				item
				xs={12}
				sx={{ height: "calc(100vh - 211px)", width: "100%" }}
			>
				{isLoading ? (
					 <LinearProgress />
				) : (
					<DataGrid
						rows={rows() || []}
						columns={columns}
						pageSize={20}
						rowsPerPageOptions={[5]}
						onRowClick={({ row }) => {
							navigate("/candidatos/curriculo", { state: row });
						}}
						sx={{
							boxShadow: 2,
						}}
						hideFooter
					/>
				)}
			</Grid>
			<Grid item xs={12} display="flex" justifyContent="center">
				<Pagination
					count={inscricoes?.quantidadePaginas}
					color="primary"
					size="small"
					onChange={(_, page) => {
						setPage(page - 1);
					}}
				/>
			</Grid>
		</Grid>
	);
};
