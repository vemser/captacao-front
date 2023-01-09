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
	Skeleton,
	Box,
	CircularProgress,
	Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
	useGetAvaliacaoFiltroMutation,
	useListReviewsQuery,
} from "shared/features/avaliacao/avaliacaoSlice";
import { Elemento, IListaAvaliacao } from "shared/features/avaliacao/type";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { useGetTrilhasQuery } from "shared/features/api/trilha/trilhaSlice";
import { useGetListaEdicoesQuery } from "shared/features/api/edicao/edicaoSlice";

export const Prova: React.FC = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const { data, isLoading } = useListReviewsQuery({ pagina: page });

	//esperando a requisição
	const [getAvaliacaoFiltro] = useGetAvaliacaoFiltroMutation();

	const { data: getTrilha } = useGetTrilhasQuery();
	const { data: getEdicoes } = useGetListaEdicoesQuery();

	const [emailResult, setEmailResult] = useState<Elemento[]>();
	const [editionResult, setEditionResult] = useState<Elemento[]>();
	const [trilhaResult, setTrilhaResult] = useState<Elemento[]>();

	const [email, setEmail] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [edicao, setEdicao] = useState("");
	const [trilha, setTrilha] = useState("");

	const [lista, setLista] = useState<IListaAvaliacao | undefined>(undefined);

	//esperando a requisição
	// useEffect(() => {
	// 	if (!edicao && !email && !trilha) {
	// 		useListReviewsQuery({ pagina: page })
	// 			.unwrap()
	// 			.then((data) => setLista(data));
	// 	} else {
	// 		getAvaliacaoFiltro({ email, edicao, trilha })
	// 			.unwrap()
	// 			.then((data) => setInscricoes(data));
	// 	}
	// }, [email, edicao, trilha, page]);

	const resetFiltro = () => {
		setEmail("");
		setEmailInput("");
		setEdicao("");
		setTrilha("");
	};

	const list = data?.elementos;

	const columns = [
		{
			field: "status",
			headerName: "Status",
			width: 140,
			renderCell: (params: any) => {
				return (
					<Typography
						sx={{
							color:
								params.row.resultado === "T" ? "green" : "red",
						}}
					>
						{params.row.resultado === "T" ? (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									gap: 1,
								}}
							>
								<CheckBoxIcon />
								<Typography
									sx={{
										fontSize: "14px",
									}}
								>
									Apto
								</Typography>
							</Box>
						) : (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									gap: 1,
								}}
							>
								<IndeterminateCheckBoxIcon />{" "}
								<Typography
									sx={{
										fontSize: "14px",
									}}
								>
									Inapto
								</Typography>
							</Box>
						)}
					</Typography>
				);
			},
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
			field: "telefone",
			headerName: "Telefone",
			minWidth: 160,
		},
		{
			field: "turno",
			headerName: "Turno",
			minWidth: 90,
		},
		{
			field: "estado",
			headerName: "Estado",
			minWidth: 90,
		},
		{
			field: "nota",
			headerName: "Adicionar nota",
			width: 140,
			renderCell: (params: any) => {
				return <Button variant="contained">Adicionar</Button>;
			},
		},
	];

	const rows = () => {
		if (trilhaResult) {
			return trilhaResult?.map((d) => {
				return {
					id: d.inscricao.idInscricao,
					idCandidato: d.inscricao.candidato.idCandidato,
					nome: d.inscricao.candidato.nome,
					email: d.inscricao.candidato.email,
					status: d.inscricao.avaliacao,
					telefone: d.inscricao.candidato.telefone,
					turno: d.inscricao.candidato.formulario?.turno,
					estado: d.inscricao.candidato.estado,
					notaProva: d.inscricao.candidato.notaProva,
					resultado: d.aprovado,
				};
			});
		} else if (editionResult) {
			return editionResult?.map((d) => {
				return {
					id: d.inscricao.idInscricao,
					idCandidato: d.inscricao.candidato.idCandidato,
					nome: d.inscricao.candidato.nome,
					email: d.inscricao.candidato.email,
					status: d.inscricao.avaliacao,
					telefone: d.inscricao.candidato.telefone,
					turno: d.inscricao.candidato.formulario?.turno,
					estado: d.inscricao.candidato.estado,
					notaProva: d.inscricao.candidato.notaProva,
					resultado: d.aprovado,
				};
			});
		} else if (emailResult) {
			return emailResult?.map((d) => {
				return {
					id: d.inscricao.idInscricao,
					idCandidato: d.inscricao.candidato.idCandidato,
					nome: d.inscricao.candidato.nome,
					email: d.inscricao.candidato.email,
					status: d.inscricao.avaliacao,
					telefone: d.inscricao.candidato.telefone,
					turno: d.inscricao.candidato.formulario?.turno,
					estado: d.inscricao.candidato.estado,
					notaProva: d.inscricao.candidato.notaProva,
					resultado: d.aprovado,
				};
			});
		} else {
			return list?.map((dados) => {
				return {
					id: dados.inscricao.idInscricao,
					idCandidato: dados.inscricao.candidato.idCandidato,
					nome: dados.inscricao.candidato.nome,
					email: dados.inscricao.candidato.email,
					status: dados.inscricao.avaliacao,
					telefone: dados.inscricao.candidato.telefone,
					turno: dados.inscricao.candidato.formulario?.turno,
					estado: dados.inscricao.candidato.estado,
					notaProva: dados.inscricao.candidato.notaProva,
					resultado: dados.aprovado,
				};
			});
		}
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
							id="registros-search-by-email"
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
							id="registros-filter-by-trilha"
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
							id="registros-search-by-edition"
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
					<CircularProgress />
				) : (
					<DataGrid
						rows={rows() || []}
						columns={columns}
						pageSize={20}
						rowsPerPageOptions={[5]}
						onRowClick={({ row }) => {
							navigate("/prova/curriculo", { state: row });
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
					count={data?.quantidadePaginas}
					color="primary"
					size="small"
					onChange={(event, page) => {
						setPage(page - 1);
					}}
				/>
			</Grid>
		</Grid>
	);
};
