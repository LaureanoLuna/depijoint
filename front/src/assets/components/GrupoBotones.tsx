import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FaCheck, FaPencilAlt, FaRegTimesCircle } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import Boton from "./Boton";
import { BotonProps } from "../interfaces/props/BotonProps";

const botonesAccion: BotonProps[] = [
  {
    variante: "confirm",
    icono: <FaCheck color="success" />,
    tamaño: "icon",
    is_tooltip: true,
    text_tooltip: "confirmar",
  },
  {
    variante: "alert",
    icono: <FaPencilAlt color="alert" />,
    tamaño: "icon",
    is_tooltip: true,
    text_tooltip: "editar",
  },
  {
    variante: "delete",
    icono: <FaRegTimesCircle color="delete" />,
    tamaño: "icon",
    is_tooltip: true,
    text_tooltip: "cancelar",
  },
];

const botonesDropdown: BotonProps[] = [
  {
    variante: "confirm",
    tamaño: "sm",
    estilo: "w-full",
    texto: "confirmar",
    is_tooltip: false,
  },
  {
    variante: "alert",
    estilo: "w-full",
    tamaño: "sm",
    texto: "editar",
    is_tooltip: false,
  },
  {
    variante: "delete",
    estilo: "w-full",
    tamaño: "sm",
    texto: "cancelar",
    is_tooltip: false,
  },
];

export default function GrupoBotones() {
  return (
    <div className="w-fit ml-auto">
      <div className="md:block hidden">
        {botonesAccion.map((boton, index) => (
          <Boton key={index} prop={boton} />
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden">
          <Boton
            prop={{
              variante: "outline",
              icono: <CiMenuKebab />,
              tamaño: "icon",
              is_tooltip: false,
            }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" >
          {botonesDropdown.map((boton, index) => (
            <DropdownMenuItem key={index}>
              <Boton prop={boton} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
