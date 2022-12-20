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
} from "@mui/material";
import { Search } from "@mui/icons-material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params: any) => {
      return (
        <Chip
          label={params.value}
          color={params.value === "Avaliado" ? "success" : "primary"}
        />
      );
    },
  },
];

const rows = [
  {
    id: 1,
    status: "asdasd",
  },
];

export const Registers: React.FC = () => {
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
              // defaultValue="AC"
              // {...register("estado")}
            >
              <MenuItem value="QA">QA</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filtrar por trilha</InputLabel>
            <Select
              label="Filtrar por edição"
              id="registros-filter-by-edition"
              // error={!!errors.estado}
              // defaultValue="AC"
              // {...register("estado")}
            >
              <MenuItem value="10">10°</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          hideFooter
        />
      </Grid>
    </Grid>
  );
};
