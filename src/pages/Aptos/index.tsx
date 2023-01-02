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
  CircularProgress
} from '@mui/material'
import { Search } from '@mui/icons-material'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import {
  useListReviewsQuery,
  useSearchByEditionMutation,
  useSearchByEmailMutation,
  useSearchByTrilhaMutation
} from 'shared/features/avaliacao/avaliacaoSlice'
import { Elemento, Inscricao } from 'shared/features/avaliacao/type'
import { useEffect } from 'preact/hooks'

const columns = [
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params: any) => {
      return (
        <Chip
          label={params.value === 'T' ? 'Avaliado' : 'Não avaliado'}
          sx={{ borderRadius: 1, boxShadow: 1, width: '100%' }}
          color={params.value === 'T' ? 'success' : 'primary'}
        />
      )
    }
  },
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
    field: 'telefone',
    headerName: 'Telefone',
    minWidth: 160
  },
  {
    field: 'turno',
    headerName: 'Turno',
    minWidth: 90
  },
  {
    field: 'estado',
    headerName: 'Estado',
    minWidth: 90
  },
  {
    field: 'nota',
    headerName: 'Adicionar nota',
    width: 140,
    renderCell: (params: any) => {
      return (
        <Link to="/aptos/curriculo">
          <Button variant="contained" id="" onClick={() => console.log(params)}>
            Adicionar
          </Button>
        </Link>
      )
    }
  }
]

export const Aptos: React.FC = () => {
  const { data, isLoading } = useListReviewsQuery({ pagina: 0 })

  const [emailResult, setEmailResult] = useState<Elemento[]>()
  const [getSearchByEmail] = useSearchByEmailMutation()

  const [editionResult, setEditionResult] = useState<Elemento[]>()
  const [getAvaliacaoByEdition] = useSearchByEditionMutation()

  const [trilhaResult, setTrilhaResult] = useState<Elemento[]>()
  const [getAvaliacaoByTrilhaTeste] = useSearchByTrilhaMutation()

  const [valueEmail, setValueEmail] = useState<string>('')

  const list = data?.elementos
  const rows = () => {
    if (trilhaResult) {
      return trilhaResult?.map(d => {
        return {
          id: 1,
          nome: d.inscricao.candidato.nome,
          email: d.inscricao.candidato.email,
          status: d.inscricao.avaliacao,
          telefone: d.inscricao.candidato.telefone,
          turno: d.inscricao.candidato.formulario?.turno,
          estado: d.inscricao.candidato.estado
        }
      })
    } else if (editionResult) {
      return editionResult?.map(d => {
        return {
          id: 1,
          nome: d.inscricao.candidato.nome,
          email: d.inscricao.candidato.email,
          status: d.inscricao.avaliacao,
          telefone: d.inscricao.candidato.telefone,
          turno: d.inscricao.candidato.formulario?.turno,
          estado: d.inscricao.candidato.estado
        }
      })
    } else if (emailResult) {
      return emailResult?.map(d => {
        return {
          id: 1,
          nome: d.inscricao.candidato.nome,
          email: d.inscricao.candidato.email,
          status: d.inscricao.avaliacao,
          telefone: d.inscricao.candidato.telefone,
          turno: d.inscricao.candidato.formulario?.turno,
          estado: d.inscricao.candidato.estado
        }
      })
    } else {
      return list?.map(dados => {
        return {
          id: 1,
          nome: dados.inscricao.candidato.nome,
          email: dados.inscricao.candidato.email,
          status: dados.inscricao.avaliacao,
          telefone: dados.inscricao.candidato.telefone,
          turno: dados.inscricao.candidato.formulario?.turno,
          estado: dados.inscricao.candidato.estado
        }
      })
    }
  }

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
                    <Search
                      color="primary"
                      onClick={e => {
                        getSearchByEmail({
                          email: valueEmail
                        })
                          .unwrap()
                          .then(data => setEmailResult(data))
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              }
              //   error={!!errors.nome}
              //   helperText={errors.nome?.message}
              //   {...register("nome")}
              id="registros-search-by-email"
              label="Pesquisar por Email"
              value={valueEmail}
              onChange={e => setValueEmail(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filtrar por trilha</InputLabel>
            <Select
              label="Filtrar por trilha"
              id="registros-filter-by-trilha"
              // error={!!errors.estado}
              defaultValue=""
              onChange={e => {
                getAvaliacaoByTrilhaTeste({
                  trilha: e.target.value
                })
                  .unwrap()
                  .then(data => setTrilhaResult(data))
              }}
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
              onChange={e => {
                getAvaliacaoByEdition({
                  edicao: e.target.value
                })
                  .unwrap()
                  .then(data => setEditionResult(data))
              }}
            >
              <MenuItem value="" disabled></MenuItem>
              <MenuItem value="1ª Edição">1°</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="8">8°</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ height: 'calc(100vh - 211px)', width: '100%' }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={rows() || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{
              boxShadow: 2
            }}
            hideFooter
          />
        )}
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
