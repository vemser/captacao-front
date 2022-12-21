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
  Pagination
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const columns = [
  {
    field: 'nome',
    headerName: 'Nome',
    minWidth: 180,
    flex: 1
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 230,
    flex: 1
  },
  {
    field: 'nota',
    headerName: 'Nota da Prova',
    minWidth: 130
  },
  {
    field: 'telefone',
    headerName: 'Telefone',
    minWidth: 160
  },
  {
    field: 'estado',
    headerName: 'Estado',
    minWidth: 90
  }
]

const rows = [
  {
    id: 1,
    nome: 'Daniel Jacon',
    email: 'danieljacon@dbccompany.com.br',
    nota: 10,
    telefone: '(19)98765-7829',
    turno: 'Manhã',
    estado: 'SP'
  },
  {
    id: 2,
    nome: 'Daniel Jacon',
    email: 'danieljacon@dbccompany.com.br',
    nota: 6,
    telefone: '(19)98765-7829',
    turno: 'Manhã',
    estado: 'SP'
  }
]

export const Result: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row'
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
            <InputLabel>Filtrar por edição</InputLabel>
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
      <Grid item xs={12} sx={{ height: 'calc(100vh - 211px)', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{
            boxShadow: 2
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
  )
}
