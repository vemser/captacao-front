import React from 'react'
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

const marks = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 10,
    label: '10'
  },
  {
    value: 20,
    label: '20'
  },
  {
    value: 30,
    label: '30'
  },
  {
    value: 40,
    label: '40'
  },
  {
    value: 50,
    label: '50'
  },
  {
    value: 60,
    label: '60'
  },
  {
    value: 70,
    label: '70'
  },
  {
    value: 80,
    label: '80'
  },
  {
    value: 90,
    label: '90'
  },
  {
    value: 100,
    label: '100'
  }
]

export const AptosCurriculum = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <Button variant="contained" onClick={handleClickOpen}>
          Adicionar Nota
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
              onChange={e => console.log(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button id="botao-cancelar" onClick={handleClose}>
              Cancelar
            </Button>
            <Button id="botao-enviar" onClick={handleClose} autoFocus>
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{ height: 'calc(100vh - 150px)', width: '100%' }}
      >
        <CurriculoContainer resposta={objeto} />
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
