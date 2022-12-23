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
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Interview: React.FC = () => {
  const navigate = useNavigate();

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
              // {...register("estado")}
            >
              <MenuItem value="" disabled></MenuItem>
              <MenuItem value="qa">QA</MenuItem>
              <MenuItem value="front">Front End</MenuItem>
              <MenuItem value="back">Back End</MenuItem>
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
      <Grid item xs={12} sx={{ height: "calc(100vh - 211px)", width: "100%" }}>
        <DataGrid
          rows={rows}
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
