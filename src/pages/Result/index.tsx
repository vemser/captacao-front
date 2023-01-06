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
import React from "react";
import { useNavigate } from "react-router-dom";

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

export const Result: React.FC = () => {
  const navigate = useNavigate();
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
              id="result-search-by-email"
              label="Pesquisar por Email"
              // value={valueEmail}
              // onChange={e => setValueEmail(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filtrar por trilha</InputLabel>
            <Select
              label="Filtrar por trilha"
              id="result-filter-by-trilha"
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
              id="result-search-by-edition"
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
