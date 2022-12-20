import { Home } from "@mui/icons-material";

interface MenuItem {
  text: string;
  path: string;
  icon?: JSX.Element;
}

export const menuItems: MenuItem[] = [
  {
    text: "Registros",
    path: "/registros",
    icon: <Home />,
  },
  {
    text: "Teste",
    path: "/teste",
    icon: <Home />,
  },
];
