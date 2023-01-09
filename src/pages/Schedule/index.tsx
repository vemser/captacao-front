import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, useTheme, Grid, Divider, FormControl } from '@mui/material'
import { Box } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'
// import { useAuth, useInterview } from '../../shared/contexts'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { useGetEntrevistasMutation, useUpdateObservacaoMutation } from 'shared/features/api/entrevista/entrevistaSlice'
import { IAtualizarInformacoesEntrevista, ILinguagens } from 'shared/interfaces'
import { DataGrid } from '@mui/x-data-grid'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useUpdateNotaParecerComportamentalMutation, useUpdateNotaParecerTecnicoMutation } from 'shared/features/api/candidato/candidatoSlice'
import { EntrervistaResponse } from 'shared/features/api/entrevista/types'

export const Schedule = () => {
  // const { getByMonthYear, schedulesFormated } = useInterview()
  // const { isAdmin, isGestor, isInstructor } = useAuth()
  const [dataAtual, setDataAtual] = useState<Date | null>(null)
  const navigate = useNavigate()
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const [modalInfos, setModalInfos] = useState<any>()
  const [open, setOpen] = React.useState(false);
  const [getEntrevistas] = useGetEntrevistasMutation()
  const [updateObservacao] = useUpdateObservacaoMutation();
  const [UpdateNotaParecerTecnico] = useUpdateNotaParecerTecnicoMutation();
  const [UpdateNotaParecerComportamental] = useUpdateNotaParecerComportamentalMutation();
  const [ entrevistasList, setEntrevistasList ] = useState<EntrervistaResponse | undefined>(undefined)
 
  const {register, handleSubmit} = useForm<IAtualizarInformacoesEntrevista>()


  useEffect(() => {
    getEntrevistas({
      pagina: 0,
      tamanho: 20
    }).unwrap().then((data) => {
      setEntrevistasList(data)
    })
  }, [])



  console.log(entrevistasList?.elementos);
  

  const entrevistasFilter = entrevistasList?.elementos.map((entrevista) => {

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
        idCandidato: entrevista.candidatoDTO.idCandidato,
        idEntrevista: entrevista.idEntrevista

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


  const handleFormSubmit = async (data: IAtualizarInformacoesEntrevista) => {

    try{

      {data.observacao && await toast.promise(
        updateObservacao({
          observacao: data.observacao,
          idEntrevista: data.idEntrevista,
        }).unwrap(),
        {
          pending: "Carregando...",
          success:"Observações da Entrevista atualizada com sucesso",
          error:{
            render() {
              return "Houve um erro ao atualizar as Observações da entrevista"
            },
          },
        },
      );}
  
      {data.notaComportamental && data.parecerComportamental && await toast.promise(
        UpdateNotaParecerComportamental({
          notaComportamental: data.notaComportamental,
          parecerComportamental: data.parecerComportamental,
          idCandidato: data.idCandidato
        }).unwrap(),
        {
          pending: "Carregando...",
          success:"Nota e Parecer Comportamental do candidato atualizado com sucesso",
          error:{
            render() {
              return "Houve um erro ao atualizar a nota e o parecer comportamental do candidato"
            },
          },
        }
      );}
  
      {data.notaTecnica && data.notaTecnica && await toast.promise(
        UpdateNotaParecerTecnico({
          notaTecnica: data.notaTecnica,
          parecerTecnico: data.parecerTecnico,
          idCandidato: data.idCandidato
        }).unwrap(),
        {
          pending: "Carregando...",
          success:"Nota e Parecer Técnico do candidato atualizado com sucesso",
          error:{
            render() {
              return "Houve um erro ao atualizar a nota e o parecer técnico do candidato"
            },
          },
        }
      );}

    } catch (error){
      console.error(error)

    } finally {
      getEntrevistas({
        pagina: 0,
        tamanho: 20
      }).unwrap().then((data) => {
        setEntrevistasList(data)
      })
      handleClose()

    } 
  }

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

            <Button onClick={handleClose} autoFocus sx={{ mr: 2, textAlig: 'justify' }}>
                  Fechar
            </Button> 

          <DialogTitle sx={{marginTop: '40px', textAlign:'center', fontWeight: 600 }}>
            <Box sx={{color: '#1e62fe'}} component='span'>{modalInfos?.title}</Box> 
          </DialogTitle>
          <DialogContent sx={{display:'flex', flexDirection:'column', gap: '30px', alignItems: 'space-between'}}>

          
              <Grid item sx={{ height: "calc(100vh - 90px)", display: 'flex', maxHeight: '50%', width: '70%', margin: '0 auto', justifyContent:'space-between'}}>
                <Box sx={{display: 'flex', gap: '30px', flexDirection: 'column'}}>
                  <Typography
                    component="h5"
                    variant="h5"
                    sx={{ fontWeight: 600, margin: '10px 0', fontSize:'24px'}}
                  >
                    Dados Pessoais do Candidato:
                  </Typography>

                  <Box sx={{display: 'flex', flexDirection:'column', gap:'30px'}}>
                    <Typography
                      component="p"
                      sx={{fontSize:'20px'}}
                    >
                      Data de nascimento:  <Box sx={{fontWeight: 600}} component={'span'}>{modalInfos?.extendedProps.nascimento}</Box> 
                    </Typography>

                    <Typography
                      component="p"
                      sx={{fontSize:'20px',}}
                    >
                      Cidade: <Box sx={{fontWeight: 600}} component={'span'}>{modalInfos?.extendedProps.cidade}/{modalInfos?.extendedProps.estado}</Box>
                    </Typography>

                    <Typography
                    component="p"
                    sx={{fontSize:'20px'}}
                    >
                      telefone: <Box sx={{fontWeight: 600}} component={'span'}>{modalInfos?.extendedProps.telefone}</Box>
                    </Typography>
                  </Box>
                </Box>

                <Box>
                    <Typography
                      component="h5"
                      variant='h5'
                      sx={{fontWeight: 600, margin: '10px 0', fontSize:'24px'}}
                    >
                      Dados Técnicos do Candidato:
                    </Typography>

                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                      <Typography
                      component="p"
                      sx={{fontSize:'20px'}}
                    >
                      Linguagens: <Box sx={{fontWeight: 600}} component={'span'}> {modalInfos?.extendedProps.linguagens.map((linguagem:ILinguagens) => {
                        return linguagem.nome + ' '
                      })}</Box>
                    </Typography>

                    <Typography
                      component="p"
                      sx={{fontSize:'20px'}}
                    >
                      Nota da Prova: <Box sx={{fontWeight: 600}} component={'span'}>{modalInfos?.extendedProps.notaProva}</Box> 
                    </Typography>

                    <Typography
                      component="p"
                      sx={{fontSize:'20px'}}
                    >
                      Observações Técnicas: <Box sx={{fontWeight: 600}} component={'span'}>{modalInfos?.extendedProps.observacoesTecnicas}</Box> 
                    </Typography>

                    <Typography
                      component="p"
                      sx={{fontSize:'20px'}}
                    >
                      Parecer Comportamental: <Box sx={{fontWeight: 600}} component={'span'}>{modalInfos?.extendedProps.parecerComportamental}</Box> 
                    </Typography>

                    <Typography
                      component="p"
                      sx={{fontSize:'20px'}}
                    >
                      Parecer Técnico: <Box sx={{fontWeight: 600}} component={'span'}>{modalInfos?.extendedProps.parecerTecnico}</Box> 
                    </Typography>

                    <Typography
                      component="p"
                      sx={{fontSize:'20px'}}
                    >
                      Observações da Entrevista: <Box sx={{fontWeight: 600}} component={'span'}>{modalInfos?.extendedProps.observacoes}</Box> 
                    </Typography>
                  </Box>
                </Box>
            </Grid>
     
            
            <Divider/>
            <Typography
              component="h5"
              variant="h5"
              sx={{ fontWeight: 600, width: '70%', margin: '0 auto'}}
            >
             Atualizar Informações da Entrevista:
            </Typography>
            
            <FormControl sx={{display: 'flex', flexDirection: 'column', gap:'30px'}}>       
              <Box sx={{display: 'flex', width: '70%', margin: '0 auto', justifyContent:'space-between'}}>
                <Box sx={{ display:'flex', flexDirection: 'column', gap:'20px'}}>
                  <Box sx={{ display:'flex', gap:'10%'}}>
                    <TextField
                      margin="dense"
                      id="parecerComportamental"
                      label="Parecer Comportamental"
                      {...register('parecerComportamental')}
                    />  

                    <TextField
                      margin="dense"
                      id="notaComportamental"
                      label="Nota Comportamental"
                      type={'number'}
                      {...register('notaComportamental')}
                    />  
                  </Box>
                </Box>  

                <Box sx={{ display:'flex', flexDirection: 'column', gap:'20px'}}>
                  <Box sx={{ display:'flex', gap:'10%'}}>
                    <TextField
                      margin="dense"
                      id="parecerTecnico"
                      label="Parecer Técnico"
                      {...register('parecerTecnico')}
                    />  

                    <TextField
                      margin="dense"
                      id="notaTecnico"
                      label="Nota Técnica"
                      type={'number'}
                      {...register('notaTecnica')}
                    /> 
                  </Box>
                </Box>  
              </Box>

              <TextField 
                margin="dense"
                sx={{
                  mt: 1,
                  width: '70%',
                  margin: '0 auto'
                }}
                id="observacao"
                label="Observações Técnicas"
                {...register('observacao')}
              />

              <TextField 
                sx={{
                 display: 'none'
                }}
                id="idEntrevista"
                value={modalInfos?.extendedProps.idEntrevista}
                {...register('idEntrevista')}
              />

              <TextField 
                sx={{
                 display: 'none'
                }}
                id="idCandidato"
                value={modalInfos?.extendedProps.idCandidato}
                {...register('idCandidato')}
              />
              

              <Button
              onClick={handleSubmit((data) => handleFormSubmit(data))}>
                Atualizar informações
              </Button>
            </FormControl>   
            
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Voltar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}
