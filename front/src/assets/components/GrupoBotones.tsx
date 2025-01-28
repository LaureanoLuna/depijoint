import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { FaCheck, FaPencilAlt, FaRegTimesCircle } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import Boton from "./Boton";

export default function GrupoBotones() {
  return (
    <div>
      <div className="md:block hidden">
        <Boton
          prop={{
            variante: "confirm",
            icono: <FaCheck color="succeess" />,
            tamaño: "icon",
            is_tooltip: true,
            text_tooltip: "confirmar",
          }}
        />
        <Boton
          prop={{
            variante: "alert",
            icono: <FaPencilAlt color="alert" />,
            tamaño: "icon",
            is_tooltip: true,
            text_tooltip: "editar",
          }}
        />
        <Boton
          prop={{
            variante: "delete",
            icono: <FaRegTimesCircle color="delete" />,
            tamaño: "icon",
            is_tooltip: true,
            text_tooltip: "cancelar",
          }}
        />
      </div>
      <DropdownMenu >
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
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Boton
              prop={{
                variante: "confirm",
                tamaño: "sm",
                is_tooltip: false,
                texto: "confirmar",
              }}
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Boton
              prop={{
                variante: "alert",
                estilo:"w-full",
                tamaño: "sm",
                is_tooltip: false,
                texto: "editar",
              }}
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Boton
              prop={{
                estilo:"w-full",
                variante: "delete",
                tamaño: "sm",
                is_tooltip: false,
                texto: "cancelar",
              }}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
