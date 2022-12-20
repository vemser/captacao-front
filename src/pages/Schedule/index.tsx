import React, { useEffect, useState } from 'react'
import { Button, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'
// import { useAuth, useInterview } from '../../shared/contexts'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from 'react-router-dom'
import './index.css'

export const Schedule = () => {
  // const { getByMonthYear, schedulesFormated } = useInterview()
  // const { isAdmin, isGestor, isInstructor } = useAuth()
  const [dataAtual, setDataAtual] = useState<Date | null>(null)
  const navigate = useNavigate()
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  // useEffect(() => {
  //   let date = new Date()
  //   getByMonthYear(date.getMonth() + 1, date.getFullYear())
  // }, [])

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
              initialView="dayGridMonth"
              // events={schedulesFormated}
              datesSet={arg => {
                let date = new Date(arg.startStr)
                setDataAtual(date)
                // getByMonthYear(date.getMonth() + 2, date.getFullYear())
              }}
              locale="pt-br"
              eventClick={info => {
                navigate('/detail-interview', {
                  state: info.event.extendedProps.state
                })
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
              Editar Calenário
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
      </Box>
    </>
  )
}
