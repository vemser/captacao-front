import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'
// import { useAuth, useInterview } from '../../shared/contexts'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { useGetEntrevistasQuery } from 'shared/features/api/entrevista/entrevistaSlice'
import { ILinguagens } from 'shared/interfaces'

export const Schedule = () => {
  // const { getByMonthYear, schedulesFormated } = useInterview()
  // const { isAdmin, isGestor, isInstructor } = useAuth()
  const [dataAtual, setDataAtual] = useState<Date | null>(null)
  const navigate = useNavigate()
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const [modalInfos, setModalInfos] = useState<any>()
  const [open, setOpen] = React.useState(false);


  // useEffect(() => {
  //   let date = new Date()
  //   getByMonthYear(date.getMonth() + 1, date.getFullYear())
  // }, [])

  const {data: entrevistasArray} = useGetEntrevistasQuery({pagina: 0, tamanho: 20})

  console.log(entrevistasArray?.elementos);
  

  const entrevistasFilter = entrevistasArray?.elementos.map((entrevista) => {

    let legendaColor = ''

    entrevista.legenda == 'CONFIRMADA' ? legendaColor = '#4caf50' :
    entrevista.legenda == 'PENDENTE' ? legendaColor = '#ffeb3b' :
    entrevista.legenda == 'CANCELADA' ? legendaColor = '#f6685e' :
    legendaColor = '#999' 


    return {
      date: entrevista.dataEntrevista,
      title: entrevista.candidatoDTO.nome,
      extendedProps: {
        legenda: entrevista.legenda,
        data: entrevista.dataEntrevista,
        observacoes: entrevista.observacoes,
        nascimento: String(entrevista.candidatoDTO.dataNascimento).split('-').reverse().join('/'),
        cidade: entrevista.candidatoDTO.cidade,
        estado: entrevista.candidatoDTO.estado,
        telefone: entrevista.candidatoDTO.telefone,
        email: entrevista.candidatoDTO.email,
        linguagens: entrevista.candidatoDTO.linguagens,
        notaProva: entrevista.candidatoDTO.notaProva,
        observacoesTecnicas: entrevista.candidatoDTO.observacoes,
        parecerComportamental: entrevista.candidatoDTO.parecerComportamental,
        parecerTecnico: entrevista.candidatoDTO.parecerTecnico,

      },
      color: legendaColor

    }
  })

  const handleModal = (info: any) => {
    setOpen(!open)
    setModalInfos(info.event)
    console.log(info.event);
    document.getElementById('modal-id')?.classList.toggle('hide')
    document.getElementById('container-calendar-schedules')?.classList.toggle('blur')
    document.getElementById('subtitle-legenda-schedules')?.classList.toggle('blur')
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        width="100%"
        minHeight="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
      >
        {/* calendário */}
        <Box width="100%" id="container-calendar-schedules">
          <Box width="100%" sx={{ paddingBottom: '5%' }}>
            <FullCalendar
              plugins={[dayGridPlugin]}
              events={entrevistasFilter}
              selectable={true} 
              navLinks={true}
              editable={true}
              initialView="dayGridMonth"
              // events={schedulesFormated}
              datesSet={arg => {
                let date = new Date(arg.startStr)
                setDataAtual(date)
                // getByMonthYear(date.getMonth() + 2, date.getFullYear())
              }}
              locale="pt-br"
              eventClick={
                function(info) {
                  handleModal(info)
                }
              }
              headerToolbar={{
                left: 'dayGridMonth,dayGridWeek,dayGridDay',
                center: 'title',
                right: 'prev,next,today',
              }}
              buttonText={{
                today: 'Hoje',
                month: "Mês",
                week: "Semana",
                day: 'Dia'
              }}
            />
          </Box>
        </Box>

        <Box width="100%" display="flex" justifyContent="space-evenly" mb="5%">
          <Box width="45%" display="flex" flexDirection="column">
            <Typography id="subtitle-legenda-schedules">Legenda</Typography>
            <Box width="100%" display="flex" mt="1rem">
              <Box
                width="50px"
                height="100%"
                bgcolor="#4caf50"
                borderRadius={'3px'}
              ></Box>
              <Typography pl="1rem" id="text-confirmada-schedules">
                Confirmada
              </Typography>
            </Box>
            <Box width="100%" display="flex" mt="1rem">
              <Box
                width="50px"
                height="100%"
                bgcolor="#ffeb3b"
                borderRadius={'3px'}
              ></Box>
              <Typography pl="1rem" id="text-pendente-schedules">
                Pendente
              </Typography>
            </Box>
            <Box width="100%" display="flex" mt="1rem">
              <Box
                width="50px"
                height="100%"
                bgcolor="#f6685e"
                borderRadius={'3px'}
              ></Box>
              <Typography pl="1rem" id="text-cancelada-schedules">
                Cancelada
              </Typography>
            </Box>
            <Box width="100%" display="flex" mt="1rem">
              <Box
                width="50px"
                height="100%"
                bgcolor="#999"
                borderRadius={'3px'}
              ></Box>
              <Typography pl="1rem" id="text-outro-schedules">
                Outro
              </Typography>
            </Box>
          </Box>
          <Box width="45%" display="flex" flexDirection="column" gap="1rem">
            <Typography id="subtitle-editar-calendario-schedules">
              Editar Calendário
            </Typography>
            {/* {!isAdmin || isGestor || isInstructor ? ( */}
            <Button
              id="button-register-interview-schedules"
              sx={{ width: '100%' }}
              variant="outlined"
              onClick={() => navigate('/register-interview')}
            >
              Cadastrar Nova Entrevista
            </Button>
            {/* ) : (
              ''
            )} */}

            <Button
              id="update-calendar-schedules"
              sx={{ width: '100%' }}
              variant="outlined"
              // onClick={() => {
              //   if (dataAtual)
              //     getByMonthYear(
              //       dataAtual.getMonth() + 2,
              //       dataAtual.getFullYear()
              //     )
              // }}
            >
              Atualizar Agenda
            </Button>
          </Box>
        </Box>
        <Dialog open={open} onClose={handleClose} fullScreen>
          <DialogTitle sx={{textAlign: 'center', marginTop: '40px', fontWeight: 600}} color="primary">Candidato {modalInfos?.title}</DialogTitle>
          <DialogContent>

            <Box sx={{display: 'flex', flexDirection: 'column', gap:'30px'}}>
              <Typography
                component="h5"
                variant="h5"
                sx={{ fontWeight: 600, margin: '10px 0'}}
              >
                Dados Pessoais do Candidato:
              </Typography>

              <Typography
                component="h5"
                variant="h5"
              >
                Data de nascimento: {modalInfos?.extendedProps.nascimento}
              </Typography>

              <Typography
                component="h5"
                variant="h5"
              >
                Cidade: {modalInfos?.extendedProps.cidade}/{modalInfos?.extendedProps.estado}
              </Typography>

              <Typography
                component="h5"
                variant="h5"
              >
                telefone: {modalInfos?.extendedProps.telefone}
              </Typography>


            </Box>

            


           

            <Typography
              component="h5"
              variant="h5"
              sx={{ fontWeight: 600, margin: '10px 0'}}
            >
              Dados Técnicos do Candidato:
            </Typography>

            <Typography
              component="h5"
              variant="h5"
            >
              Linguagens: {modalInfos?.extendedProps.linguagens.map((linguagem:ILinguagens) => {
                return <Typography
                  component="h5"
                  variant="h5"
                >
                {linguagem.nome}
                </Typography>
              })}
            </Typography>

            <Typography
              component="h5"
              variant="h5"
            >
              Nota da Prova: {modalInfos?.extendedProps.notaProva}
            </Typography>

            <Typography
              component="h5"
              variant="h5"
            >
              Observações Técnicas: {modalInfos?.extendedProps.observacoesTecnicas}
            </Typography>

            <Typography
              component="h5"
              variant="h5"
            >
              Parecer Comportamental: {modalInfos?.extendedProps.parecerComportamental}
            </Typography>

            <Typography
              component="h5"
              variant="h5"
            >
              Parecer Técnico: {modalInfos?.extendedProps.parecerTecnico}
            </Typography>
            

            <Typography
              component="h5"
              variant="h5"
              sx={{ fontWeight: 600, margin: '10px 0'}}
            >
              Informações da Entrevista:
            </Typography>


            <Typography
              component="h5"
              variant="h5"
            >
              Status: {modalInfos?.extendedProps.legenda}
            </Typography>

            <Typography
              component="h5"
              variant="h5"
            >
              Observações: {modalInfos?.extendedProps.observacoes}
            </Typography>
        
        
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Voltar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}
