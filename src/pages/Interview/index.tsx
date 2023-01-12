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
	Typography,
  LinearProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useGetCandidatosEntrevistaMutation,
} from "shared/features/api/candidato/candidatoSlice";
import { useGetTrilhasQuery } from "shared/features/api/trilha/trilhaSlice";
import { useGetListaEdicoesQuery } from "shared/features/api/edicao/edicaoSlice";
import { CandidatoByNota } from "shared/features/api/candidato/types";

export const Interview: React.FC = () => {
	const [page, setPage] = useState<number>(0);
	const [isLoading, setisLoading] = useState(false);
	const navigate = useNavigate();
	
	const [getCandidatosEntrevista] = useGetCandidatosEntrevistaMutation();

	const [listaEntrevistas, setListaEntrevistas] = useState<
		CandidatoByNota | undefined
	>(undefined);

	const [email, setEmail] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [edicao, setEdicao] = useState("");
	const [trilha, setTrilha] = useState("");

	const { data: getTrilha } = useGetTrilhasQuery();
	const { data: getEdicoes } = useGetListaEdicoesQuery();

	useEffect(() => {
		setisLoading(true);
		if (!edicao && !email && !trilha) {
			getCandidatosEntrevista({ pagina: page, tamanho: 20})
				.unwrap()
				.then((data) => setListaEntrevistas(data))
				.finally(() => setisLoading(false));
		} else {
			setisLoading(true);
			getCandidatosEntrevista({pagina: page, tamanho: 20, email, edicao, trilha })
				.unwrap()
				.then((data) => setListaEntrevistas(data))
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
		return listaEntrevistas?.elementos.map((dados) => {
			return {
				id: dados.idCandidato,
				nome: dados.nome,
				email: dados.email,
				trilha: dados?.formulario?.trilhas
					.map((trilha) => {
						return trilha.nome;
					})
					.join(", "),
				notas: dados?.notaProva,
			};
		});
	};

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
			field: "notas",
			headerName: "Notas",
			minWidth: 90,
			renderCell: (params: any) => {
				return (
					<Typography
						variant="body2"
						sx={{
							color:
								params.value >= 60
									? "success.main"
									: "error.main",
						}}
					>
						{params.value}
					</Typography>
				);
			},
		},
		{
			field: "entrervista",
			headerName: "Agendar entrevista",
			width: 160,
			renderCell: () => {
				return <Button variant="contained">Agendar</Button>;
			},
		},
	];

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
							id="registros-filtrar-por-email"
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
							id="select-entrevistas-filtro-por-trilha"
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
										id={`opcao-entrevistas-filtro-trilha-${trilha.nome}`}
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
							id="entrevistas-filtro-por-editicao"
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
										id={`opcao-entrevistas-filtro-edicao-${edicao.nome}`}
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
						onRowClick={({ row }) => {
							navigate(`/entrevista/curriculo`, { state: row });
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
					count={listaEntrevistas?.quantidadePaginas}
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
