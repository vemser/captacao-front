import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { CurriculoContainer } from '../../components/CurriculoContainer'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetEntrevistaByEmailQuery, usePostNewEntrevistaMutation, useDeleteEntrevistaMutation, useUpdateEntrevistaMutation } from 'shared/features/api/entrevista/entrevistaSlice'
import { useForm } from 'react-hook-form'
import { EntrevistaUpdateParams, NovaEntrevistaBody } from '../../shared/features/api/entrevista/types'
import { useGetLoggedUserQuery } from 'shared/features/api/usuario/authSlice'
import { toast } from 'react-toastify'
import { useGetCandidatosByEmailMutation } from 'shared/features/api/candidato/candidatoSlice'
import { Elemento } from 'shared/features/api/candidato/types'
import { useUpdateFormMutation } from 'shared/features/api/formulario/formularioSlice'

export const InterviewCurriculum = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [getCandidatosByEmail] = useGetCandidatosByEmailMutation()
  const [postNewEntrevista] = usePostNewEntrevistaMutation()
  const [deleteEntrevista] = useDeleteEntrevistaMutation()
  const [updateEntrevista] = useUpdateEntrevistaMutation()
  const [updateTrilha] = useUpdateFormMutation()
  const { isLoading } = useGetLoggedUserQuery()
  const { data, refetch } = useGetEntrevistaByEmailQuery(state?.email)

  const { register, handleSubmit } = useForm<EntrevistaUpdateParams>()
  const [inscricaoResponse, setInscricaoResponse] = useState<Elemento | null>(null)
  const [trilha, setTrilha] = useState<string>('')
  const [open, setOpen] = React.useState(false)
  const [openEditar, setOpenEditar] = React.useState(false)
  const [openCancelar, setOpenCancelar] = React.useState(false)

  const formValues = (data: string) => {
    return data === 'T' ? true : data === 'F' ? false : data
  }

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleClickOpenEditar = () => setOpenEditar(true)
  const handleCloseEditar = () => setOpenEditar(false)
  const handleClickOpenCancelar = () => setOpenCancelar(true)
  const handleCloseCancelar = () => setOpenCancelar(false)

  function deletarEntrevista() {
    deleteEntrevista(state?.email)
      .unwrap()
      .then(() => {
        toast.success("Entrevista cancelada com sucesso!")
        refetch()
      })
      .catch((error: any) => {
        console.log(error)
        let message = error;
        message.data.message ? message = message.data.message : message = message.data.errors[0];
        toast.error(message);
      })
      .finally(() => {
        handleCloseCancelar()
      })
  }

  const handleSubmitEntrevista = async (form: EntrevistaUpdateParams) => {
    isLoading === false &&
      postNewEntrevista({
        body: {
          candidatoEmail: state.email,
          dataEntrevista: form.body.dataEntrevista,
          avaliado: 'T',
          observacoes: form.body.observacoes
        }
      })
        .unwrap()
        .then(() => {
          toast.success('Entrevista agendada com sucesso!')
          refetch()

          inscricaoResponse &&
            updateTrilha({
              idFormulario: inscricaoResponse?.formulario.idFormulario,
              formulario: {
                matriculadoBoolean: formValues(
                  inscricaoResponse.formulario.matriculado
                ),
                curso: inscricaoResponse.formulario.curso,
                turno: inscricaoResponse?.formulario.turno,
                instituicao: inscricaoResponse?.formulario.instituicao,
                github: inscricaoResponse?.formulario.github,
                linkedin: inscricaoResponse?.formulario.linkedin,
                desafiosBoolean: formValues(
                  inscricaoResponse?.formulario.desafios
                ),
                problemaBoolean: formValues(
                  inscricaoResponse?.formulario.problema
                ),
                reconhecimentoBoolean: formValues(
                  inscricaoResponse?.formulario.reconhecimento
                ),
                altruismoBoolean: formValues(
                  inscricaoResponse?.formulario.altruismo
                ),
                resposta: inscricaoResponse?.formulario.resposta,
                lgpdBoolean: formValues(inscricaoResponse?.formulario.lgpd),
                provaBoolean: formValues(inscricaoResponse?.formulario.prova),
                ingles: inscricaoResponse?.formulario.ingles,
                espanhol: inscricaoResponse?.formulario.espanhol,
                neurodiversidade:
                  inscricaoResponse?.formulario.neurodiversidade,
                efetivacaoBoolean: formValues(
                  inscricaoResponse?.formulario.efetivacao
                ),
                disponibilidadeBoolean: formValues(
                  inscricaoResponse?.formulario.disponibilidade
                ),
                genero: inscricaoResponse?.formulario.genero,
                orientacao: inscricaoResponse?.formulario.orientacao,
                trilhas: [trilha],
                importancia: inscricaoResponse?.formulario.importancia
              }
            })
              .unwrap()
              .catch((err: any) => {
                console.log(err)
              })
        })
        .catch((error: any) => {
          console.log(error)
          let message = error;
          message.data.message ? message = message.data.message : message = message.data.errors[0];
          toast.error(message);
        })
        .finally(() => {
          handleClose()
        })
  }

  const handleSubmitUpdateEntrevista = async (form: EntrevistaUpdateParams) => {
    isLoading === false &&
      updateEntrevista({
        idEntrevista: form.idEntrevista,
        legenda: "PENDENTE",
        body: {
          candidatoEmail: state.email,
          dataEntrevista: form.body.dataEntrevista,
          avaliado: 'T',
          observacoes: form.body.observacoes
        }
      })
        .unwrap()
        .then(() => {
          toast.success('Entrevista atualizada com sucesso!')
          refetch()
        })
        .catch((error: any) => {
          console.log(error)
          let message = error;
          message.data.message ? message = message.data.message : message = message.data.errors[0];
          toast.error(message);
        })
        .finally(() => {
          handleCloseEditar()
        })
  }

  useEffect(() => {
    getCandidatosByEmail(state?.email)
      .unwrap()
      .then(res => {
        setInscricaoResponse(res)
      })
      .catch(e => console.log(e))
  }, [data])

  return (
    <Grid container spacing={2}>
      <>
        {data && (
          data?.candidatoDTO.notaEntrevistaComportamental > 0 ?
            (
              <Grid xs={12} item sx={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  id="interview-curriculum-agendar"
                  disabled
                >
                  J?? entrevistado
                </Button>
              </Grid>
            ) :
            (
              <Grid xs={12} item sx={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  id="interview-curriculum-agendar"
                  onClick={handleClickOpenEditar}
                >
                  Editar agendamento
                </Button>
                <Button
                  variant="contained"
                  id="interview-curriculum-agendar"
                  onClick={handleClickOpenCancelar}
                >
                  Cancelar entrevista
                </Button>
                <Dialog open={openEditar} onClose={handleCloseEditar}>
                  <DialogTitle color="primary" sx={{ textAlign: "center" }}>Editar agendamento</DialogTitle>
                  <DialogContent>
                    <Stack
                      direction="column"
                      component="form"
                      onSubmit={handleSubmit(handleSubmitUpdateEntrevista)}
                      spacing={1}
                    >
                      <TextField
                        margin="dense"
                        autoFocus
                        type="datetime-local"
                        required={true}
                        InputLabelProps={{
                          shrink: true
                        }}
                        id="name"
                        label="Data e hora da entrevista"
                        defaultValue={data?.dataEntrevista}
                        {...register('body.dataEntrevista')}
                        fullWidth
                      />
                      <TextField
                        margin="dense"
                        id="name"
                        label="Observa????es"
                        defaultValue={data?.observacoes}
                        {...register('body.observacoes')}
                        multiline
                        rows={4}
                        fullWidth
                      />
                      <TextField
                        value={data?.idEntrevista}
                        {...register('idEntrevista')}
                        sx={{
                          display: "none"
                        }}
                      />
                      <Stack spacing={2} direction="row">
                        <Button
                          color="error"
                          sx={{ width: '100%' }}
                          onClick={handleCloseEditar}
                        >
                          Cancelar
                        </Button>
                        <Button sx={{ width: '100%' }} type="submit">
                          Salvar
                        </Button>
                      </Stack>
                    </Stack>
                  </DialogContent>
                </Dialog>
                <Dialog open={openCancelar} onClose={handleCloseCancelar}>
                  <DialogTitle color="secondary" sx={{ userSelect: "none", textAlign: "center", marginBottom: "12px" }}>Tem certeza?</DialogTitle>
                  <DialogContent>
                    <Stack
                      direction="column"
                      component="form"
                      spacing={1}
                    >
                      <Stack spacing={3} direction="column">
                        <Button variant='outlined' sx={{ width: '100%', fontWeight: 700 }} onClick={(() => deletarEntrevista())}>
                          Sim
                        </Button>
                        <Button
                          variant='outlined'
                          color="error"
                          sx={{ width: '100%', fontWeight: 700 }}
                          onClick={handleCloseCancelar}
                        >
                          N??o
                        </Button>
                      </Stack>
                    </Stack>
                  </DialogContent>
                </Dialog>
              </Grid>
            )) || (
            <Grid xs={12} item>
              <Button
                variant="contained"
                id="interview-curriculum-agendar"
                onClick={handleClickOpen}
              >
                Agendar entrevista
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle color="primary" sx={{ textAlign: "center" }}>Agendar entrevista</DialogTitle>
                <DialogContent>
                  <Stack
                    direction="column"
                    component="form"
                    onSubmit={handleSubmit(handleSubmitEntrevista)}
                    spacing={1}
                  >
                    <TextField
                      margin="dense"
                      autoFocus
                      type="datetime-local"
                      required={true}
                      InputLabelProps={{
                        shrink: true
                      }}
                      id="name"
                      label="Data e hora da entrevista"
                      {...register('body.dataEntrevista')}
                      fullWidth
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Trilha</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Trilha"
                        required={true}
                        value={trilha}
                        onChange={e => {
                          setTrilha(e.target.value)
                        }}
                      >
                        {inscricaoResponse?.formulario.trilhas.map(trilha => {
                          return (
                            <MenuItem
                              key={trilha.nome}
                              value={trilha.nome}
                              id={`filtro-trilha-${trilha.nome}`}
                            >
                              {trilha.nome}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                    <TextField
                      margin="dense"
                      id="name"
                      label="Observa????es"
                      {...register('body.observacoes')}
                      multiline
                      rows={4}
                      fullWidth
                    />
                    <Stack spacing={2} direction="row">
                      <Button
                        color="error"
                        sx={{ width: '100%' }}
                        onClick={handleClose}
                      >
                        Cancelar
                      </Button>
                      <Button sx={{ width: '100%' }} type="submit">
                        Agendar
                      </Button>
                    </Stack>
                  </Stack>
                </DialogContent>
              </Dialog>
            </Grid>
          )}
        <Grid item xs={12}>
          <CurriculoContainer />
        </Grid>
      </>
    </Grid >
  )
}
