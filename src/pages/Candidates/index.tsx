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
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import {
	useGetCandidatosQuery,
	useGetInscricaoByTrilhaMutation,
} from "../../shared/features/api/inscricao/inscricaoSlice";
import { IInscricao } from "shared/features/api/inscricao/types";

const columns = [
	{
		field: "status",
		headerName: "Status",
		width: 140,
		renderCell: (params: any) => {
			return (
				<Chip
					label={params.value === "T" ? "Avaliado" : "Não avaliado"}
					sx={{ borderRadius: 1, boxShadow: 1, width: "100%" }}
					color={params.value === "T" ? "success" : "primary"}
				/>
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
	const { data } = useGetCandidatosQuery({ pagina: 0 });

	const [trilhaResult, setTrilhaResult] = useState<IInscricao[]>();
	const [getInscricaoByTrilha] = useGetInscricaoByTrilhaMutation();

	console.log(trilhaResult)

	const lista = data?.elementos;

	const rows = () =>
		lista?.map((dados) => {
			return {
				id: dados.idInscricao,
				nome: dados.candidato.nome,
				email: dados.candidato.email,
				status: dados.avaliacao,
				telefone: dados.candidato.telefone,
				turno: dados.candidato.formulario?.turno,
				estado: dados.candidato.estado,
			};
		});
	// const filtrarPorEmail = () => {setEmail()}

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
									<IconButton edge="end">
										<Search color="primary" />
									</IconButton>
								</InputAdornment>
							}
							//   error={!!errors.nome}
							//   helperText={errors.nome?.message}
							//   {...register("nome")}
							id="registros-search-by-email"
							label="Pesquisar por Email"
						/>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel>Filtrar por trilha</InputLabel>
						<Select
							label="Filtrar por trilha"
							id="registros-filter-by-trilha"
							// error={!!errors.estado}
							defaultValue=""
							onChange={(e) => {
								getInscricaoByTrilha({
									trilha: e.target.value,
								})
									.unwrap()
									.then((data) => setTrilhaResult(data));
							}}
							// {...register("estado")}
						>
							<MenuItem value="" disabled></MenuItem>
							<MenuItem value="QA">QA</MenuItem>
							<MenuItem value="FRONTEND">Front End</MenuItem>
							<MenuItem value="BACKEND">Back End</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel>Filtrar por edição</InputLabel>
						<Select
							label="Filtrar por edição"
							id="registros-filter-by-edition"
							// error={!!errors.estado}
							// defaultValue="AC"
							// {...register("estado")}
							defaultValue=""
						>
							<MenuItem value="" disabled></MenuItem>
							<MenuItem value="10">10°</MenuItem>
							<MenuItem value="9">9</MenuItem>
							<MenuItem value="8">8°</MenuItem>
						</Select>
					</FormControl>
				</Stack>
			</Grid>
			<Grid
				item
				xs={12}
				sx={{ height: "calc(100vh - 211px)", width: "100%" }}
			>
				<DataGrid
					rows={rows() || []}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					onRowClick={({ row }) => {
						navigate("/candidatos/curriculo", { state: row });
					}}
					sx={{
						boxShadow: 2,
					}}
					hideFooter
				/>
			</Grid>
			<Grid item xs={12} display="flex" justifyContent="center">
				<Pagination
					count={5}
					color="primary"
					size="small"
					// onChange={(event, page) => {
					//   getCandidates(page - 1);
					// }}
				/>
			</Grid>
		</Grid>
	);
};
function inscricaoSlice(): { useGetCandidatosQuery: any } {
	throw new Error("Function not implemented.");
}
