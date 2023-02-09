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
	Button,
	Pagination,
	Box,
	LinearProgress,
	Typography,
} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTrilhasQuery } from "shared/features/api/trilha/trilhaSlice";
import { useGetListaEdicoesQuery } from "shared/features/api/edicao/edicaoSlice";
import { useGetCandidatosResultadoMutation } from "shared/features/api/candidato/candidatoSlice";
import { CandidatoByNota } from "shared/features/api/candidato/types";

const columns = [
	{
		field: 'id',
		headerName: 'ID',
		width: 60
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
		headerName: "Trilha",
		minWidth: 230,
	},
	{
		field: "nota",
		headerName: "Média geral",
		minWidth: 130,
	},
	{
		field: 'status',
		headerName: 'Status',
		width: 140,
		renderCell: (params: any) => {
			return (
				<Typography
					sx={{
						color: 'green'
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: 1
						}}
					>
						<CheckBoxIcon />
						<Typography
							sx={{
								fontSize: '14px'
							}}
						>
							Aprovado
						</Typography>
					</Box>
				</Typography>
			)
		}
	},
];

export const Result: React.FC = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const [isLoading, setisLoading] = useState(false);
	const [getCandidatosResultado] = useGetCandidatosResultadoMutation();
	const [listaResultado, setListaResultado] = useState<
		CandidatoByNota | undefined
	>(undefined);

	const { data: getTrilha } = useGetTrilhasQuery();
	const { data: getEdicoes } = useGetListaEdicoesQuery();

	const [email, setEmail] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [edicao, setEdicao] = useState("");
	const [trilha, setTrilha] = useState("");

	useEffect(() => {
		if (!edicao && !email && !trilha) {
			setisLoading(true);
			getCandidatosResultado({ pagina: page, tamanho: 20 })
				.unwrap()
				.then((data) => setListaResultado(data))
				.finally(() => setisLoading(false));
		} else {
			setisLoading(true);
			getCandidatosResultado({
				pagina: page,
				tamanho: 20,
				email: email ? email : undefined,
				edicao: edicao ? edicao : undefined,
				trilha: trilha ? trilha : undefined
			})
				.unwrap()
				.then((data) => setListaResultado(data))
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
		return listaResultado?.elementos.map((dados) => {
			return {
				id: dados.idCandidato,
				nome: dados.nome,
				email: dados.email,
				trilha: dados.formulario?.trilhas
					.map((trilha) => {
						return trilha.nome;
					})
					.join(", "),
				nota: dados.media,
				telefone: dados.telefone,
				turno: dados.formulario?.turno,
				estado: dados.estado,
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
									<IconButton onClick={() => setEmail(emailInput)} edge="end">
										<Search color="primary" />
									</IconButton>
								</InputAdornment>
							}
							id="avaliacao-filtrar-por-email"
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
							id="select-avaliacao-filtro-por-trilha"
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
										id={`opcao-avaliacao-filtro-trilha-${trilha.nome}`}
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
							id="avaliacao-filtro-por-editicao"
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
										id={`opcao-avaliacao-filtro-edicao-${edicao.nome}`}
									>
										{edicao.nome}
									</MenuItem>
								);
							})}
							;
						</Select>
					</FormControl>
					<Box display="flex" alignItems="center" justifyContent="center">
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

			<Grid item xs={12} sx={{ height: "calc(100vh - 211px)", width: "100%" }}>
				{isLoading ? (
					<LinearProgress />
				) : (
					<DataGrid
						rows={rows() || []}
						columns={columns}
						sx={{
							boxShadow: 2,
						}}
						onRowClick={({ row }) => {
							navigate("/resultado/curriculo", { state: row });
						}}
						hideFooter
					/>
				)}
			</Grid>
			<Grid
				item
				xs={12}
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Pagination
					count={listaResultado?.quantidadePaginas}
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
