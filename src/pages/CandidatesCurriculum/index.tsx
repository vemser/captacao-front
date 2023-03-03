import {Button, Grid, Menu, MenuItem} from '@mui/material'
import {CurriculoContainer} from '../../components/CurriculoContainer'
import React from 'react'
import {useAvaliarCandidatoMutation} from 'shared/features/avaliacao/avaliacaoSlice'
import {useLocation, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDeleteInscricaoMutation} from "../../shared/features/api/inscricao/inscricaoSlice";


export const CandidatesCurriculum = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [avaliarCandidato] = useAvaliarCandidatoMutation();
  const [deletarInscricao] = useDeleteInscricaoMutation();
  const [openModalExcluir, setOpenModalExcluir] = React.useState(false);

  const handleClickOpenModalExcluir = () => {
    setOpenModalExcluir(true);
  };

  const handleCloseModalExcluir = () => {
    setOpenModalExcluir(false);
  };

  const {state} = useLocation()

  const navigate = useNavigate()

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClickExcluir = async () => {
    await toast.promise(
      deletarInscricao(state.id)
        .unwrap()
        .then(() => {
          navigate('/candidatos')
        }),
      {
        pending: 'Carregando...',
        success: 'Candidato excluido com sucesso!',
        error: {
          render() {
            return 'Houve um erro ao excluido esse candidato.'
          }
        }
      }
    )
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>

      <Grid container spacing={2}>
        <Grid
          xs={12}
          item
          sx={{
            mb: 2
          }}
        >
          <Button
            id="candidatos-avaliar"
            variant="contained"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Avaliar
          </Button>
          <Menu
            id="candidatos-avaliar-options"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem
              onClick={async () => {
                await toast.promise(
                  avaliarCandidato({
                    aprovadoBoolean: true,
                    idInscricao: state.id,
                  })
                    .unwrap()
                    .then(() => {
                      navigate('/candidatos')
                    }),
                  {
                    pending: 'Carregando...',
                    success: 'Candidato avaliado com sucesso!',
                    error: {
                      render() {
                        return 'Houve um erro ao avaliar esse candidato.'
                      }
                    }
                  }
                )
                handleClose()
              }}
            >
              Apto
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await toast.promise(
                  avaliarCandidato({
                    aprovadoBoolean: false,
                    idInscricao: state.id,
                  })
                    .unwrap()
                    .then(() => {
                      navigate('/candidatos')
                    }),
                  {
                    pending: 'Carregando...',
                    success: 'Candidato avaliado com sucesso!',
                    error: {
                      render() {
                        return 'Houve um erro ao avaliar esse candidato.'
                      }
                    }
                  }
                )
                handleClose()
              }}
            >
              Não apto
            </MenuItem>
          </Menu>
          <Button
            id="candidatos-avaliar"
            variant="outlined"
            color="error"
            style={{marginLeft: "10px"}}
            onClick={handleClickOpenModalExcluir}
          >
            Excluir
          </Button>
        </Grid>
        <CurriculoContainer/>
      </Grid>

      <Dialog
        open={openModalExcluir}
        onClose={handleCloseModalExcluir}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Excluir inscrição?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja realmente excluir essa inscrição?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickExcluir}
                  variant="outlined"
                  color="error"
          >Sim</Button>
          <Button onClick={handleCloseModalExcluir} autoFocus
                  variant="outlined">
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
