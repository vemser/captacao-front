import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material'
import { CurriculoContainer } from '../../components/CurriculoContainer'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetEntrevistaByEmailQuery, usePostNewEntrevistaMutation } from 'shared/features/api/entrevista/entrevistaSlice'
import { useForm } from 'react-hook-form'
import { NovaEntrevistaBody } from '../../shared/features/api/entrevista/types'
import { useGetLoggedUserQuery } from 'shared/features/api/usuario/authSlice'
import { toast } from 'react-toastify'
import { useGetCandidatosByEmailMutation } from 'shared/features/api/candidato/candidatoSlice'
import { Elemento, ITrilha } from 'shared/features/api/candidato/types'
import { ElementoEntrevista } from 'shared/features/api/entrevista/types'
import { useUpdateFormMutation } from 'shared/features/api/formulario/formularioSlice'
import { StringifyOptions } from 'querystring'
import axios from 'axios'

export const InterviewCurriculum = () => {
  const [getCandidatosByEmail] = useGetCandidatosByEmailMutation()
  const [getEntrevistaByEmail] = useGetEntrevistaByEmailQuery()
  const [inscricaoResponse, setInscricaoResponse] = useState<Elemento | null>(null)
  const [candidatoEntrevista, setCandidatoEntrevista] = useState<ElementoEntrevista | null>(null)

  const [open, setOpen] = React.useState(false)

  const { data, isLoading } = useGetLoggedUserQuery()
  const { state } = useLocation()

  const [updateTrilha] = useUpdateFormMutation()

  const navigate = useNavigate()

  useEffect(() => {
    getCandidatosByEmail(state?.email)
      .unwrap()
      .then(res => {
        setInscricaoResponse(res)
        console.log(res)
      })
      .catch(e => console.log(e))

    getEntrevistaByEmail(state?.email)
      .unwrap()
      .then(res => {
        setCandidatoEntrevista(res)
        console.log(res)
      })
      .catch(e => console.log(e))
  }, [])

  const formValues = (data: string) => {
    return data === 'T' ? true : data === 'F' ? false : data
  }

  const [postNewEntrevista] = usePostNewEntrevistaMutation()
  const { register, handleSubmit } = useForm<NovaEntrevistaBody>()

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [trilha, setTrilha] = useState<string>('')

  const handleSubmitEntrevista = async (form: NovaEntrevistaBody) => {
    isLoading === false &&
      postNewEntrevista({
        candidatoEmail: state.email,
        dataEntrevista: form.dataEntrevista,
        avaliado: 'T',
        observacoes: form.observacoes
      })
        .unwrap()
        .then(() => {
          toast.success('Entrevista agendada com sucesso!')
          navigate('/entrevista')

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
              .then(() => console.log(''))
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
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <Button
          variant="contained"
          id="interview-curriculum-agendar"
          onClick={handleClickOpen}
        >
          Agendar entrevista
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle color="primary">Agendar entrevista</DialogTitle>
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
                InputLabelProps={{
                  shrink: true
                }}
                id="name"
                label="Data e hora da entrevista"
                {...register('dataEntrevista')}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Trilha</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Trilha"
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
                label="Observações"
                {...register('observacoes')}
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
      <Grid item xs={12}>
        <CurriculoContainer />
      </Grid>
    </Grid>
  )
}
