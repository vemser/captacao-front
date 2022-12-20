import { Home, Groups, WorkHistory, AutoStories } from "@mui/icons-material";
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
    path: '/aptos',
    icon: <Groups />,
  },
  {
    text: "Entrevista",
    path: "/interview",
    icon: <WorkHistory />,
  },
  {
    text: "Avaliar",
    path: "/avaliation",
    icon: <AutoStories />,
  },
  {
    text: 'Agenda',
    path: '/agenda',
    icon: <DateRangeIcon />
  }
]
