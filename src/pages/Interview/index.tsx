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
  Skeleton,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetEntrevistasQuery } from "shared/features/api/entrevista/entrevistaSlice";

export const Interview: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetEntrevistasQuery({
    pagina: 0,
    tamanho: 20,
  });
  const lista = data?.elementos;

  const rows = () => {
    return lista?.map((dados) => {
      return {
        id: dados.idEntrevista,
        nome: dados.candidatoDTO.nome,
        email: dados.candidatoDTO.email,
        telefone: dados.candidatoDTO.telefone,
        turno: dados.candidatoDTO.formulario?.turno,
        estado: dados.candidatoDTO.estado,
      };
    });
  };

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
      field: "entrervista",
      headerName: "Agendar entrevista",
      width: 160,
      renderCell: () => {
        return <Button variant="contained">Agendar</Button>;
      },
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     nome: "Daniel Jacon",
  //     email: "danieljacon@dbccompany.com.br",
  //     nota: 10,
  //     telefone: "(19)98765-7829",
  //     turno: "Manhã",
  //     estado: "SP",
  //   },
  //   {
  //     id: 2,
  //     nome: "Daniel Jacon",
  //     email: "danieljacon@dbccompany.com.br",
  //     nota: 6,
  //     telefone: "(19)98765-7829",
  //     turno: "Manhã",
  //     estado: "SP",
  //   },
  // ];

  console.log(data);

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
                    edge="end"
                    // value={email}
                    // onClick={() => {
                    //   getInscricaoByEmail({
                    //     email: email,
                    //   })
                    //     .unwrap()
                    //     .then((data) => setEmailResult(data));
                    // }}
                  >
                    <Search color="primary" />
                  </IconButton>
                </InputAdornment>
              }
              id="interview-search-by-email"
              label="Pesquisar por Email"
              // value={valueEmail}
              // onChange={e => setValueEmail(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filtrar por trilha</InputLabel>
            <Select
              label="Filtrar por trilha"
              id="interview-filter-by-trilha"
              defaultValue=""
              // key={estado}
              // onChange={(e) => {
              //   getInscricaoByTrilha({
              //     trilha: e.target.value,
              //   })
              //     .unwrap()
              //     .then((data) => setTrilhaResult(data));
              // }}
            >
              {/* {getTrilha?.map((trilha) => {
                return (
                  <MenuItem
                    key={trilha.nome}
                    value={trilha.nome}
                    id={`filtro-trilha-${trilha.nome}`}
                  >
                    {trilha.nome}
                  </MenuItem>
                );
              })} */}
              ;
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filtrar por edição</InputLabel>
            <Select
              label="Filtrar por edição"
              id="interview-search-by-edition"
              defaultValue=""
              // key={estado}
              // onChange={(e) => {
              //   getInscricaoByEdicao({
              //     edicao: e.target.value,
              //   })
              //     .unwrap()
              //     .then((data) => setEdicaoResult(data));
              // }}
            >
              {/* {getEdicoes?.map((edicao) => {
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
              ; */}
            </Select>
          </FormControl>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              fullWidth
              sx={{
                height: "3rem",
              }}
              variant="contained"
              // onClick={resetFiltro}
            >
              Limpar
            </Button>
          </Box>
        </Stack>
      </Grid>
      {isLoading ? (
        <Grid
          item
          xs={12}
          sx={{ height: "calc(100vh - 211px)", width: "100%" }}
        >
          <Skeleton variant="rectangular" width="100%" height={"100%"} />
        </Grid>
      ) : (
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
              navigate(`/entrevista/curriculo`, { state: row });
            }}
            sx={{
              boxShadow: 2,
            }}
            hideFooter
          />
        </Grid>
      )}
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
