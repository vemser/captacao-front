import { Aptos } from 'pages/Aptos'
import { Home } from '@mui/icons-material'
import DateRangeIcon from '@mui/icons-material/DateRange'

interface MenuItem {
  text: string
  path: string
  icon?: JSX.Element
}

export const menuItems: MenuItem[] = [
  {
    text: 'Registros',
    path: '/registros',
    icon: <Home />
  },
  {
    text: 'Aptos',
    path: '/aptos'
    // icon: <Aptos />,
  },
  {
    text: 'Agenda',
    path: '/agenda',
    icon: <DateRangeIcon />
  }
]
