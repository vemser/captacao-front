import { Home, Groups, WorkHistory, AutoStories } from '@mui/icons-material'
import DateRangeIcon from '@mui/icons-material/DateRange'
import FactCheckIcon from '@mui/icons-material/FactCheck'

interface MenuItem {
  text: string
  path: string
  icon?: JSX.Element
}

export const menuItems: MenuItem[] = [
  {
    text: 'Candidatos',
    path: '/candidatos',
    icon: <Home />
  },
  {
    text: 'Aptos',
    path: '/aptos',
    icon: <Groups />
  },
  {
    text: 'Entrevista',
    path: '/entrevista',
    icon: <WorkHistory />
  },
  {
    text: 'Agenda',
    path: '/agenda',
    icon: <DateRangeIcon />
  },
  {
    text: 'Resultado',
    path: '/resultado',
    icon: <FactCheckIcon />
  }
]
