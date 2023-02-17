import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material'
import { objeto } from 'shared/utils/states'
import { CurriculoContainer } from '../../components/CurriculoContainer'
import { useUpdateNotaMutation } from 'shared/features/api/candidato/candidatoSlice'
import { UpdateNota } from 'shared/features/api/candidato/types'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

export const AptosCurriculum = () => {
  const { state } = useLocation()

  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [appendNota, setAppendNota] = useState<UpdateNota>()
  const [updateNota] = useUpdateNotaMutation()

  const [valueNota, setValueNota] = useState<number>(0)
  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <Button variant="contained" onClick={handleClickOpen}>
          {state.notaProva ? 'Editar Nota' : 'Adicionar Nota'}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Digite a nota abaixo:'}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="campo-nota"
              label="Nota"
              type="number"
              maxRows={4}
              sx={{ mt: 1 }}
              defaultValue={state.notaProva}
              onChange={e => setValueNota(parseInt(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            <Button id="botao-cancelar" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              id="botao-enviar"
              onClick={() => {
                if (valueNota > 100 || valueNota <= 0) {
                  return toast.error("Nota deve ser de 1 a 100!")
                }
                updateNota({
                  nota: {
                    notaProva: valueNota
                  },
                  idCandidato: state.idCandidato
                })
                toast.success("Nota atualizada com sucesso!")
                navigate('/prova')
              }}
              autoFocus
            >
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        sx={{ height: 'calc(100vh - 150px)', width: '100%' }}
      >
        <CurriculoContainer />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ height: 'calc(100vh - 150px)', width: '100%' }}
      ></Grid>
    </Grid>
  )
}
