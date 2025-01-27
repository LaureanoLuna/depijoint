import {
  Home,
  Inbox,
  Settings,
  UsersRound,
  ContactRound,
  ShoppingCart,
} from "lucide-react";

// Menu items.
export const LIST_RUTAS = [
  {
    title: "Turnos",
    url: "turnos",
    icon: Home,
  },
  {
    title: "Pacientes",
    url: "pacientes",
    icon: Inbox,
  },
  {
    title: "Asignados",
    url: "asignados",
    icon: ContactRound,
  },
  {
    title: "Colaboradores",
    url: "colaboradores",
    icon: UsersRound,
  },

  {
    title: "Zonas",
    url: "zonas",
    icon: ShoppingCart,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
