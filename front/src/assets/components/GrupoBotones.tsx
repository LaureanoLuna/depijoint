import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import Boton from "./Boton";
import { BotonProps } from "../interfaces/props/BotonProps";

export default function GrupoBotones({
  botonesAccion,
  botonesDropdown,

}: {
  botonesAccion: BotonProps[];
  botonesDropdown: BotonProps[];
 
}) {
  return (
    <div className="w-fit ml-auto">
      <div className="md:flex hidden ">
        {botonesAccion?.map((boton, index) => (
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
              onClick:()=>{}
            }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {botonesDropdown?.map((boton, index) => (
            <DropdownMenuItem key={index}>
              <Boton prop={boton} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
