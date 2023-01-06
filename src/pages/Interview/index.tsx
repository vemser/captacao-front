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
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCandidatosByNotaQuery } from "shared/features/api/candidato/candidatoSlice";

export const Interview: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const { data, isLoading } = useGetCandidatosByNotaQuery({
    pagina: page,
    tamanho: 20,
  });
  const lista = data?.elementos;
  console.log(lista);

  const rows = () => {
    return lista?.map((dados) => {
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
              color: params.value >= 60 ? "success.main" : "error.main",
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
              id="registros-search-by-email"
              label="Pesquisar por Email"
              // value={valueEmail}
              // onChange={e => setValueEmail(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filtrar por trilha</InputLabel>
            <Select
              label="Filtrar por trilha"
              id="registros-filter-by-trilha"
              defaultValue=""
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
              id="registros-filter-by-edition"
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
            pageSize={20}
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
          count={data?.quantidadePaginas}
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
