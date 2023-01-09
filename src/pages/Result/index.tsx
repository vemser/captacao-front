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
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTrilhasQuery } from "shared/features/api/trilha/trilhaSlice";
import { useGetListaEdicoesQuery } from "shared/features/api/edicao/edicaoSlice";

const columns = [
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
    field: "nota",
    headerName: "Nota da Prova",
    minWidth: 130,
  },
  {
    field: "telefone",
    headerName: "Telefone",
    minWidth: 160,
  },
  {
    field: "estado",
    headerName: "Estado",
    minWidth: 90,
  },
];

export const Result: React.FC = () => {
  const navigate = useNavigate();

  const { data: getTrilha } = useGetTrilhasQuery();
	const { data: getEdicoes } = useGetListaEdicoesQuery();

  const [email, setEmail] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [edicao, setEdicao] = useState("");
	const [trilha, setTrilha] = useState("");

  // useEffect(() => {
	// 	if (!edicao && !email && !trilha) {
	// 		getCandidatosByNota({ pagina: page, tamanho: 20 })
	// 			.unwrap()
	// 			.then((data) => setListaEntrevistas(data))		
	// 	} else {
	// 		getCandidatosFiltro({ email, edicao, trilha })
	// 			.unwrap()
	// 			.then((data) => setListaEntrevistas(data))	
	// 	}
	// }, [email, edicao, trilha, page]);

	const resetFiltro = () => {
		setEmail("");
		setEmailInput("");
		setEdicao("");
		setTrilha("");
	};

  const rows = [
    {
      id: 1,
      nome: "Daniel Jacon",
      email: "danieljacon@dbccompany.com.br",
      nota: 10,
      telefone: "(19)98765-7829",
      turno: "Manhã",
      estado: "SP",
    },
    {
      id: 2,
      nome: "Daniel Jacon",
      email: "danieljacon@dbccompany.com.br",
      nota: 6,
      telefone: "(19)98765-7829",
      turno: "Manhã",
      estado: "SP",
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
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            boxShadow: 2,
          }}
          onRowClick={({ row }) => {
            navigate("/resultado/curriculo", { state: row });
          }}
          hideFooter
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Pagination
          // count={lista?.quantidadePaginas}
          // color="primary"
          // size="small"
          // onChange={(_, page) => {
          //   setPage(page - 1);
          // }}
        />
      </Grid>
    </Grid>
  );
};
