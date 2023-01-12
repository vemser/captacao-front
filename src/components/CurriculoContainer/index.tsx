import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetInscricaoByIdMutation } from 'shared/features/api/inscricao/inscricaoSlice'
import { useGetCurriculoMutation } from 'shared/features/api/formulario/formularioSlice'
import { IElementos } from 'shared/features/api/inscricao/types'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid
} from '@mui/material'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import {
  useGetInputsQuery,
  useGetSubscribeFormQuery
} from 'shared/features/api/subscription/formSlice'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useGetCandidatosByEmailMutation } from 'shared/features/api/candidato/candidatoSlice'
import { Elemento } from 'shared/features/api/candidato/types'

const columns = [
  {
    field: 'pergunta',
    headerName: 'Pergunta',
    minWidth: 180,
    maxWidth: 550,
    flex: 1
  },
  {
    field: 'resposta',
    headerName: 'Resposta',
    minWidth: 230,
    flex: 1
  }
]

export const CurriculoContainer: React.FC = () => {
  const { state } = useLocation()
  const [getCandidatosByEmail] = useGetCandidatosByEmailMutation()
  const [inscricaoResponse, setInscricaoResponse] = useState<Elemento | null>(
    null
  )
  console.log('este:', inscricaoResponse)
  const [curriculo, setCurriculo] = useState<string | null>(null)
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const { data } = useGetInputsQuery()
  const { data: dataCurriculo } = useGetSubscribeFormQuery()
  console.log(dataCurriculo)
  const formulario = data?.data.formulario
  const formularioCurriculo = dataCurriculo?.data.formulario

  const [formattedCandidatePdf, setFormattedCandidatePdf] =
    useState<string>('null')

  useEffect(() => {
    getCandidatosByEmail(state?.email)
      .unwrap()
      .then(res => {
        setInscricaoResponse(res)
        console.log(res)
      })
      .catch(e => console.log(e))
  }, [])

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [value, setValue] = React.useState('1')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const [getCurriculo] = useGetCurriculoMutation()
  useEffect(() => {
    if (inscricaoResponse?.formulario?.idFormulario) {
      getCurriculo(inscricaoResponse.formulario.idFormulario)
        .unwrap()
        .then(e => {
          setCurriculo(e)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [inscricaoResponse])

  const base64toBlob: any = (data: string) => {
    const byteString = atob(data)
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: 'application/pdf' })
  }
  useEffect(() => {
    const blob = base64toBlob(curriculo)
    const url = URL.createObjectURL(blob)

    setFormattedCandidatePdf(url)
  }, [curriculo])

  //

  const rows = [
    {
      id: 1,
      tipo: 'Pessoal',
      pergunta: formulario?.nome,
      resposta: inscricaoResponse?.nome
    },
    {
      id: 2,
      tipo: 'Pessoal',
      pergunta: formulario?.email,
      resposta: inscricaoResponse?.email
    },
    {
      id: 3,
      tipo: 'Pessoal',
      pergunta: formulario?.telefone,
      resposta: inscricaoResponse?.telefone
    },
    {
      id: 4,
      tipo: 'Pessoal',
      pergunta: formulario?.cpf,
      resposta: inscricaoResponse?.cpf
    },
    {
      id: 5,
      tipo: 'Pessoal',
      pergunta: formulario?.rg,
      resposta: inscricaoResponse?.rg
    },
    {
      id: 6,
      tipo: 'Pessoal',
      pergunta: formulario?.dataNascimento,
      resposta: inscricaoResponse?.dataNascimento
    },
    {
      id: 7,
      tipo: 'Pessoal',
      pergunta: formulario?.estado,
      resposta: inscricaoResponse?.estado
    },
    {
      id: 8,
      tipo: 'Pessoal',
      pergunta: formulario?.cidade,
      resposta: inscricaoResponse?.cidade
    },
    {
      id: 10,
      tipo: 'Pessoal',
      pergunta: formulario?.neurodiversidade,
      resposta: inscricaoResponse?.formulario?.neurodiversidade
    },
    {
      id: 11,
      tipo: 'Pessoal',
      pergunta: formularioCurriculo?.s2OriSexual,
      resposta: inscricaoResponse?.formulario?.orientacao
    },
    {
      id: 12,
      tipo: 'Pessoal',
      pergunta: formularioCurriculo?.s2GNero,
      resposta: inscricaoResponse?.formulario?.genero
    },
    {
      id: 13,
      tipo: 'Pessoal',
      pergunta: formularioCurriculo?.s2DeficiNcia,
      resposta: inscricaoResponse?.pcdboolean
    },
    {
      id: 14,
      tipo: 'Acadêmico',
      pergunta: formularioCurriculo?.s2Curso,
      resposta: inscricaoResponse?.formulario?.curso
    },
    {
      id: 15,
      tipo: 'Acadêmico',
      pergunta: formularioCurriculo?.s2Turno,
      resposta: inscricaoResponse?.formulario?.turno
    },
    {
      id: 16,
      tipo: 'Acadêmico',
      pergunta: formularioCurriculo?.s2Instituicao,
      resposta: inscricaoResponse?.formulario?.instituicao
    },
    {
      id: 17,
      tipo: 'Acadêmico',
      pergunta: formularioCurriculo?.s2InglS,
      resposta: inscricaoResponse?.formulario?.ingles
    },
    {
      id: 18,
      tipo: 'Acadêmico',
      pergunta: formularioCurriculo?.s2Espanhol,
      resposta: inscricaoResponse?.formulario?.espanhol
    },
    {
      id: 23,
      tipo: 'Outros',
      pergunta: formularioCurriculo?.s2TextoLingProva,
      resposta: inscricaoResponse?.formulario?.prova
    },
    {
      id: 24,
      tipo: 'Outros',
      pergunta: formularioCurriculo?.s2TextoDisp,
      resposta: inscricaoResponse?.formulario?.efetivacao
    },
    {
      id: 25,
      tipo: 'Outros',
      pergunta: formularioCurriculo?.s2DispHaula,
      resposta: inscricaoResponse?.formulario?.disponibilidade
    },
    {
      id: 26,
      tipo: 'Outros',
      pergunta: formularioCurriculo?.s2Trilha,
      // resposta: inscricaoResponse?.formulario?.trilhas || "Nenhuma",
      resposta: inscricaoResponse?.formulario?.trilhas
        .map(trilha => {
          return trilha.nome
        })
        .join(', ')
    },
    {
      id: 28,
      tipo: 'Outros',
      pergunta: formularioCurriculo?.s2Linkedin,
      resposta: inscricaoResponse?.formulario?.linkedin
    },
    {
      id: 29,
      tipo: 'Outros',
      pergunta: formularioCurriculo?.s2Github,
      resposta: inscricaoResponse?.formulario?.github
    },
    {
      id: 31,
      tipo: 'Outros',
      pergunta: 'LGPD',
      resposta: inscricaoResponse?.formulario?.lgpd
    },
    {
      id: 32,
      tipo: 'Outros',
      pergunta: formularioCurriculo?.s2OutroMotivo,
      resposta: inscricaoResponse?.formulario?.resposta
    },
    {
      id: 33,
      tipo: 'Outros',
      pergunta: formularioCurriculo?.s2AlgoImp,
      resposta: inscricaoResponse?.formulario?.importancia
    }
  ]

  const rowsDois = [
    {
      id: 1,
      tipo: 'Pessoal',
      pergunta: 'Nome',
      resposta: inscricaoResponse?.nome
    },
    {
      id: 2,
      tipo: 'Pessoal',
      pergunta: 'Email',
      resposta: inscricaoResponse?.email
    },
    {
      id: 3,
      tipo: 'Pessoal',
      pergunta: 'Telefone',
      resposta: inscricaoResponse?.telefone
    },
    {
      id: 4,
      tipo: 'Pessoal',
      pergunta: 'CPF',
      resposta: inscricaoResponse?.cpf
    },
    {
      id: 5,
      tipo: 'Pessoal',
      pergunta: 'RG',
      resposta: inscricaoResponse?.rg
    },
    {
      id: 6,
      tipo: 'Pessoal',
      pergunta: 'Data de Nascimento',
      resposta: inscricaoResponse?.dataNascimento
    },
    {
      id: 7,
      tipo: 'Pessoal',
      pergunta: 'Estado',
      resposta: inscricaoResponse?.estado
    },
    {
      id: 8,
      tipo: 'Pessoal',
      pergunta: 'Cidade',
      resposta: inscricaoResponse?.cidade
    },
    {
      id: 9,
      tipo: 'Pessoal',
      pergunta: 'Neurodiversidade',
      resposta: inscricaoResponse?.formulario?.neurodiversidade
    },
    {
      id: 10,
      tipo: 'Pessoal',
      pergunta: 'PCD',
      resposta: inscricaoResponse?.pcdboolean
    },
    {
      id: 11,
      tipo: 'Outros',
      pergunta: 'Trilhas',
      resposta: inscricaoResponse?.formulario?.trilhas
        .map(trilha => {
          return trilha.nome
        })
        .join(', ')
    }
  ]

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen
      >
        <DialogTitle id="alert-dialog-title">
          <Button onClick={handleClose} autoFocus sx={{ mr: 2 }}>
            Fechar
          </Button>
          Informações do candidato
        </DialogTitle>
        <DialogContent>
          <Grid item sx={{ height: 'calc(100vh - 90px)', width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={rows.length}
              getRowHeight={() => 'auto'}
              sx={{
                boxShadow: 2,
                '.MuiDataGrid-cell': {
                  padding: '20px 10px'
                }
              }}
              hideFooter
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid
        container
        sx={{
          maxHeight: 'calc(100vh - 180px)'
        }}
        spacing={1}
      >
        <Grid
          item
          xs={12}
          lg={6}
          sx={{ height: 'calc(100vh - 160px)', width: '100%' }}
        >
          <DataGrid
            rows={rowsDois}
            columns={columns}
            onRowClick={row => {
              setOpen(prev => !prev)
            }}
            pageSize={rows.length}
            sx={{
              boxShadow: 2
            }}
            hideFooter
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{ typography: 'body1', boxShadow: 2 }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="Abas de currículo e configurações"
                  sx={{ p: 0.45 }}
                >
                  <Tab label="Currículo" value="1" />
                  <Tab label="Configurações" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ height: 'calc(100vh - 224px)', p: 0 }}>
                {formattedCandidatePdf !== '' && (
                  <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.1.81/pdf.worker.min.js">
                    <Viewer
                      fileUrl={formattedCandidatePdf}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                )}
              </TabPanel>
              <TabPanel value="2" sx={{ height: 'calc(100vh - 224px)', p: 0 }}>
                <Zoom>
                  <Box
                    component="img"
                    alt=""
                    sx={{
                      width: '100%',
                      height: 'calc(100vh - 224px)',
                      objectFit: 'cover'
                    }}
                    src="https://rpearce.github.io/react-medium-image-zoom/static/media/laura-smetsers-H-TW2CoNtTk-unsplash-smaller.4d1fd239.jpg"
                  />
                </Zoom>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
