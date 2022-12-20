import { Home } from "@mui/icons-material";
import { Aptos } from "pages/Aptos";

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
    text: "Aptos",
    path: "/aptos",
    // icon: <Aptos />,
  },
];
