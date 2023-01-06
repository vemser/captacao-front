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
  CircularProgress,
  Typography
} from '@mui/material'
import { Search } from '@mui/icons-material'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  useListReviewsQuery,
  useSearchByEditionMutation,
  useSearchByEmailMutation,
  useSearchByTrilhaMutation
} from 'shared/features/avaliacao/avaliacaoSlice'
import { Elemento, Inscricao } from 'shared/features/avaliacao/type'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'

export const Prova: React.FC = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(0)
  const { data, isLoading } = useListReviewsQuery({ pagina: page })

  const [emailResult, setEmailResult] = useState<Elemento[]>()
  const [getSearchByEmail] = useSearchByEmailMutation()

  const [editionResult, setEditionResult] = useState<Elemento[]>()
  const [getAvaliacaoByEdition] = useSearchByEditionMutation()

  const [trilhaResult, setTrilhaResult] = useState<Elemento[]>()
  console.log(trilhaResult)
  const [getAvaliacaoByTrilhaTeste] = useSearchByTrilhaMutation()

  const [valueEmail, setValueEmail] = useState<string>('')

  const list = data?.elementos

  const columns = [
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params: any) => {
        return (
          <Typography
            sx={{ color: params.row.resultado === 'T' ? 'green' : 'red' }}
          >
            {params.row.resultado === 'T' ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <CheckBoxIcon />
                <Typography
                  sx={{
                    fontSize: '14px'
                  }}
                >
                  Apto
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <IndeterminateCheckBoxIcon />{' '}
                <Typography
                  sx={{
                    fontSize: '14px'
                  }}
                >
                  Inapto
                </Typography>
              </Box>
            )}
          </Typography>
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
        return <Button variant="contained">Adicionar</Button>
      }
    }
  ]
  console.log(data)
  const rows = () => {
    if (trilhaResult) {
      return trilhaResult?.map(d => {
        return {
          id: d.inscricao.idInscricao,
          idCandidato: d.inscricao.candidato.idCandidato,
          nome: d.inscricao.candidato.nome,
          email: d.inscricao.candidato.email,
          status: d.inscricao.avaliacao,
          telefone: d.inscricao.candidato.telefone,
          turno: d.inscricao.candidato.formulario?.turno,
          estado: d.inscricao.candidato.estado,
          notaProva: d.inscricao.candidato.notaProva,
          resultado: d.aprovado
        }
      })
    } else if (editionResult) {
      return editionResult?.map(d => {
        return {
          id: d.inscricao.idInscricao,
          idCandidato: d.inscricao.candidato.idCandidato,
          nome: d.inscricao.candidato.nome,
          email: d.inscricao.candidato.email,
          status: d.inscricao.avaliacao,
          telefone: d.inscricao.candidato.telefone,
          turno: d.inscricao.candidato.formulario?.turno,
          estado: d.inscricao.candidato.estado,
          notaProva: d.inscricao.candidato.notaProva,
          resultado: d.aprovado
        }
      })
    } else if (emailResult) {
      return emailResult?.map(d => {
        return {
          id: d.inscricao.idInscricao,
          idCandidato: d.inscricao.candidato.idCandidato,
          nome: d.inscricao.candidato.nome,
          email: d.inscricao.candidato.email,
          status: d.inscricao.avaliacao,
          telefone: d.inscricao.candidato.telefone,
          turno: d.inscricao.candidato.formulario?.turno,
          estado: d.inscricao.candidato.estado,
          notaProva: d.inscricao.candidato.notaProva,
          resultado: d.aprovado
        }
      })
    } else {
      return list?.map(dados => {
        return {
          id: dados.inscricao.idInscricao,
          idCandidato: dados.inscricao.candidato.idCandidato,
          nome: dados.inscricao.candidato.nome,
          email: dados.inscricao.candidato.email,
          status: dados.inscricao.avaliacao,
          telefone: dados.inscricao.candidato.telefone,
          turno: dados.inscricao.candidato.formulario?.turno,
          estado: dados.inscricao.candidato.estado,
          notaProva: dados.inscricao.candidato.notaProva,
          resultado: dados.aprovado
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
            pageSize={20}
            rowsPerPageOptions={[5]}
            onRowClick={({ row }) => {
              navigate('/prova/curriculo', { state: row })
            }}
            sx={{
              boxShadow: 2
            }}
            hideFooter
          />
        )}
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Pagination
          count={data?.quantidadePaginas}
          color="primary"
          size="small"
          onChange={(event, page) => {
            setPage(page - 1)
          }}
        />
      </Grid>
    </Grid>
  )
}
